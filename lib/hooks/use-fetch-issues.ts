import { useState, useCallback } from 'react'
import { IssueResponseDto } from './use-fetch-issue'

export interface SearchParams {
  query: string
  page: number
  size: number
  sortBy?: string
  sortDir?: 'asc' | 'desc'
}

export interface PaginatedIssuesResponse {
  content: IssueResponseDto[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  first: boolean
  last: boolean
}

interface UseFetchIssuesReturn {
  issues: IssueResponseDto[]
  isLoading: boolean
  error: string | null
  hasMore: boolean
  currentPage: number
  totalPages: number
  totalElements: number
  searchIssues: (params: SearchParams) => Promise<void>
  loadMore: () => Promise<void>
  resetSearch: () => void
  resetError: () => void
}

export function useFetchIssues(): UseFetchIssuesReturn {
  const [issues, setIssues] = useState<IssueResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [currentSearchParams, setCurrentSearchParams] = useState<SearchParams | null>(null)

  const resetError = useCallback(() => {
    setError(null)
  }, [])

  const resetSearch = useCallback(() => {
    setIssues([])
    setCurrentPage(0)
    setTotalPages(0)
    setTotalElements(0)
    setCurrentSearchParams(null)
    setError(null)
  }, [])

  const searchIssues = useCallback(async (params: SearchParams) => {
    try {
      setIsLoading(true)
      setError(null)

      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'
      const queryParams = new URLSearchParams({
        query: params.query,
        page: params.page.toString(),
        size: params.size.toString(),
        sortBy: params.sortBy || 'id',
        sortDir: params.sortDir || 'desc'
      })

      const response = await fetch(`${baseUrl}/issues/search?${queryParams}`)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data: PaginatedIssuesResponse = await response.json()
      
      if (params.page === 0) {
        // New search - replace all issues
        setIssues(data.content)
      } else {
        // Load more - append to existing issues
        setIssues(prev => [...prev, ...data.content])
      }
      
      setCurrentPage(data.number)
      setTotalPages(data.totalPages)
      setTotalElements(data.totalElements)
      setCurrentSearchParams(params)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch issues'
      setError(errorMessage)
      console.error('Search issues error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const loadMore = useCallback(async () => {
    if (!currentSearchParams || isLoading || currentPage >= totalPages - 1) {
      return
    }

    const nextPage = currentPage + 1
    await searchIssues({
      ...currentSearchParams,
      page: nextPage
    })
  }, [currentSearchParams, isLoading, currentPage, totalPages, searchIssues])

  return {
    issues,
    isLoading,
    error,
    hasMore: currentPage < totalPages - 1,
    currentPage,
    totalPages,
    totalElements,
    searchIssues,
    loadMore,
    resetSearch,
    resetError
  }
}

