import { useState, useCallback } from 'react'
import { UserProfileCompletionRequestDto } from '@/lib/types/auth'
import { authenticatedFetch } from '@/lib/utils/http-interceptor'

interface UseProfileCompletionReturn {
  completeProfile: (userId: number, data: UserProfileCompletionRequestDto) => Promise<boolean>
  isLoading: boolean
  error: string | null
  resetError: () => void
}

export function useProfileCompletion(): UseProfileCompletionReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const resetError = useCallback(() => {
    setError(null)
  }, [])

  const completeProfile = useCallback(async (userId: number, data: UserProfileCompletionRequestDto): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      const accessToken = localStorage.getItem('access-token')
      if (!accessToken) {
        throw new Error('No access token found')
      }

      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'
      await authenticatedFetch(`${baseUrl}/users/${userId}/complete-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(data)
      })

      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to complete profile'
      setError(errorMessage)
      console.error('Profile completion error:', err)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    completeProfile,
    isLoading,
    error,
    resetError
  }
}
