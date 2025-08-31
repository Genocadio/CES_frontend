import { useState, useEffect, useCallback } from 'react'
import { authenticatedFetch } from '@/lib/utils/http-interceptor'
import { CommentResponseDto } from './use-fetch-issue'

export interface UserIssueDto {
  id: number
  title: string
  description: string
  status: string
  ticketId: string
  category: string
  createdAt: string
  comments: CommentResponseDto[]
  // Add other fields as needed based on your backend response
}

interface UseUserIssuesReturn {
  issues: UserIssueDto[]
  isLoading: boolean
  error: string | null
  fetchUserIssues: () => Promise<void>
  resetError: () => void
}

export function useUserIssues(): UseUserIssuesReturn {
  const [issues, setIssues] = useState<UserIssueDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const resetError = useCallback(() => {
    setError(null)
  }, [])

  const fetchUserIssues = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const accessToken = localStorage.getItem('access-token')
      if (!accessToken) {
        throw new Error('No access token found')
      }

      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'
      const response = await authenticatedFetch(`${baseUrl}/issues/my-issues`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      setIssues(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user issues'
      setError(errorMessage)
      console.error('Fetch user issues error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUserIssues()
  }, [fetchUserIssues])

  return {
    issues,
    isLoading,
    error,
    fetchUserIssues,
    resetError
  }
}
