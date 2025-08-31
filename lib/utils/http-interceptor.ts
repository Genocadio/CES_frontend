// Global variable to store the logout function
let globalLogout: (() => void) | null = null

// Function to set the global logout function
export function setGlobalLogout(logoutFn: () => void) {
  globalLogout = logoutFn
}

// Function to check if a response is a 401 and handle logout
export function handleUnauthorizedResponse(response: Response): boolean {
  if (response.status === 401) {
    console.log('Unauthorized response detected, logging out user')
    if (globalLogout) {
      globalLogout()
    }
    return true
  }
  return false
}

// Enhanced fetch wrapper that automatically handles 401 responses
export async function authenticatedFetch(
  url: string, 
  options: RequestInit = {}
): Promise<Response> {
  const response = await fetch(url, options)
  
  // Check for 401 and handle logout
  if (handleUnauthorizedResponse(response)) {
    // Return a rejected promise to prevent further processing
    throw new Error('Unauthorized - user logged out')
  }
  
  return response
}
