// Global variable to store the logout function
let globalLogout: (() => void) | null = null

// Function to set the global logout function
export function setGlobalLogout(logoutFn: () => void) {
  globalLogout = logoutFn
}

// Function to get current access token
function getAccessToken(): string | null {
  return localStorage.getItem('access-token')
}

// Function to get current refresh token
function getRefreshToken(): string | null {
  return localStorage.getItem('refresh-token')
}

// Function to check if user is authenticated
function isAuthenticated(): boolean {
  return !!(getAccessToken() && getRefreshToken())
}

// Function to refresh the access token
async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = getRefreshToken()
  if (!refreshToken) {
    return false
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'
    const response = await fetch(`${baseUrl}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken
      }),
    })

    if (!response.ok) {
      if (response.status === 401) {
        // Refresh token expired, logout user
        console.log('Refresh token expired, logging out user')
        if (globalLogout) {
          globalLogout()
        }
        return false
      }
      throw new Error(`Token refresh failed with status: ${response.status}`)
    }

    const data = await response.json()
    
    // Update stored tokens
    localStorage.setItem('access-token', data.accessToken)
    localStorage.setItem('refresh-token', data.refreshToken)
    
    return true
  } catch (error) {
    console.error('Token refresh error:', error)
    // If refresh fails, logout user
    if (globalLogout) {
      globalLogout()
    }
    return false
  }
}

// Function to logout user
function logoutUser() {
  console.log('Logging out user due to authentication failure')
  if (globalLogout) {
    globalLogout()
  }
}

// Enhanced fetch wrapper that automatically handles authentication, token refresh, and retry
export async function authenticatedFetch(
  url: string, 
  options: RequestInit = {}
): Promise<Response> {
  const isAuth = isAuthenticated()
  
  // If no authentication is available, make the request without auth headers
  if (!isAuth) {
    const response = await fetch(url, options)
    
    // If we get a 401 and we're not authenticated, that's expected
    if (response.status === 401) {
      console.log('Unauthorized request - user not authenticated')
      return response
    }
    
    return response
  }

  // Get current access token
  const accessToken = getAccessToken()
  if (!accessToken) {
    throw new Error('No access token available')
  }

  // Add authorization header
  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${accessToken}`,
  }

  // Make the request with auth headers
  let response = await fetch(url, {
    ...options,
    headers,
  })

  // If we get a 401, try to refresh the token and retry once
  if (response.status === 401) {
    console.log('Access token expired, attempting to refresh...')
    
    const refreshSuccess = await refreshAccessToken()
    
    if (refreshSuccess) {
      // Get the new access token
      const newAccessToken = getAccessToken()
      if (newAccessToken) {
        // Retry the request with the new token
        const newHeaders = {
          ...options.headers,
          'Authorization': `Bearer ${newAccessToken}`,
        }
        
        response = await fetch(url, {
          ...options,
          headers: newHeaders,
        })
        
        // If we still get 401 after refresh, logout user
        if (response.status === 401) {
          console.log('Still unauthorized after token refresh, logging out user')
          logoutUser()
          throw new Error('Authentication failed - please login again')
        }
      } else {
        console.log('Failed to get new access token after refresh')
        logoutUser()
        throw new Error('Authentication failed - please login again')
      }
    } else {
      // Refresh failed, user will be logged out by refreshAccessToken
      throw new Error('Authentication failed - please login again')
    }
  }

  return response
}

// Function to make authenticated API calls with automatic retry
export async function makeAuthenticatedRequest(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  try {
    return await authenticatedFetch(url, options)
  } catch (error) {
    // If it's an authentication error, don't show it to the user
    if (error instanceof Error && error.message.includes('Authentication failed')) {
      // The user will be logged out automatically
      throw new Error('Please login to continue')
    }
    throw error
  }
}

// Function to check if a response indicates authentication failure
export function isAuthenticationError(response: Response): boolean {
  return response.status === 401
}

// Function to handle authentication errors gracefully
export function handleAuthenticationError(error: Error): void {
  if (error.message.includes('Authentication failed') || 
      error.message.includes('JWT token has expired') ||
      error.message.includes('Jwt not found')) {
    console.log('Authentication error detected, user will be logged out')
    // Don't show the technical error to the user
    // The logout will be handled by the refresh mechanism
  }
}
