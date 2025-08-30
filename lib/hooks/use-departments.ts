'use client'

import { useState, useCallback, useEffect } from 'react'
import { useLanguage } from '@/hooks/use-language'

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

export interface DepartmentSearchResponse {
  content: DepartmentResponseDto[]
  pageable: {
    pageNumber: number
    pageSize: number
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    offset: number
    paged: boolean
    unpaged: boolean
  }
  last: boolean
  totalPages: number
  totalElements: number
  size: number
  number: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  first: boolean
  numberOfElements: number
  empty: boolean
}

export interface UseDepartmentsReturn {
  departments: DepartmentResponseDto[]
  searchDepartments: (query: string) => Promise<void>
  isLoading: boolean
  error: string | null
  resetError: () => void
}

export const useDepartments = (): UseDepartmentsReturn => {
  const [departments, setDepartments] = useState<DepartmentResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { language } = useLanguage()

  const resetError = useCallback(() => {
    setError(null)
  }, [])

  const searchDepartments = useCallback(async (query: string) => {
    if (!query.trim()) {
      setDepartments([])
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'
      const langParam = language === 'rw' ? 'rw' : language === 'fr' ? 'fr' : 'en'
      
      const response = await fetch(
        `${baseUrl}/departments/search?q=${encodeURIComponent(query)}&language=${langParam}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: DepartmentSearchResponse = await response.json()
      setDepartments(data.content || [])
    } catch (err) {
      console.error('Error searching departments:', err)
      setError(err instanceof Error ? err.message : 'Failed to search departments')
      setDepartments([])
    } finally {
      setIsLoading(false)
    }
  }, [language])

  return {
    departments,
    searchDepartments,
    isLoading,
    error,
    resetError,
  }
}
