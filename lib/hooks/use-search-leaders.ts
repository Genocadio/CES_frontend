import { useState, useCallback } from 'react'

export interface DepartmentResponseDto {
  id: number
  nameEn: string
  nameRw: string
  nameFr: string
  description: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
}

export interface LeaderSearchResponseDto {
  userId: number
  firstName: string
  lastName: string
  middleName: string
  phoneNumber: string
  email: string
  role: string
  accountStatus: string
  leadershipLevel: string
  leadershipPlaceName: string
  department: DepartmentResponseDto | null
  fullName: string
}

interface UseSearchLeadersReturn {
  leaders: LeaderSearchResponseDto[]
  isLoading: boolean
  error: string | null
  searchLeaders: (name: string) => Promise<void>
  resetError: () => void
  clearLeaders: () => void
}

export function useSearchLeaders(): UseSearchLeadersReturn {
  const [leaders, setLeaders] = useState<LeaderSearchResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const resetError = useCallback(() => {
    setError(null)
  }, [])

  const clearLeaders = useCallback(() => {
    setLeaders([])
  }, [])

  const searchLeaders = useCallback(async (name: string) => {
    if (!name.trim()) {
      setLeaders([])
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'
      const queryParams = new URLSearchParams({
        name: name.trim()
      })

      const response = await fetch(`${baseUrl}/leaders/search?${queryParams}`)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data: LeaderSearchResponseDto[] = await response.json()
      setLeaders(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search leaders'
      setError(errorMessage)
      console.error('Search leaders error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    leaders,
    isLoading,
    error,
    searchLeaders,
    resetError,
    clearLeaders
  }
}
