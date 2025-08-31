import { useState, useCallback } from 'react'
import { TokenRefreshRequestDto, TokenRefreshResponseDto } from '@/lib/types/auth'

interface UseTokenRefreshReturn {
  refreshToken: () => Promise<TokenRefreshResponseDto | null>
  isLoading: boolean
  error: string | null
  resetError: () => void
}

export function useTokenRefresh(): UseTokenRefreshReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const resetError = useCallback(() => {
    setError(null)
  }, [])

  const refreshToken = useCallback(async (): Promise<TokenRefreshResponseDto | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const refreshToken = localStorage.getItem('refresh-token')
      if (!refreshToken) {
        throw new Error('No refresh token found')
      }

      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'
      const response = await fetch(`${baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken
        } as TokenRefreshRequestDto),
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Refresh token expired - please login again')
        }
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data: TokenRefreshResponseDto = await response.json()
      
      // Update stored tokens
      localStorage.setItem('access-token', data.accessToken)
      localStorage.setItem('refresh-token', data.refreshToken)
      
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh token'
      setError(errorMessage)
      console.error('Token refresh error:', err)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    refreshToken,
    isLoading,
    error,
    resetError
  }
}
