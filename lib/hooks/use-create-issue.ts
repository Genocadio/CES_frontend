'use client'

import { useState, useCallback } from 'react'
import { useLanguage } from '@/hooks/use-language'
import { AttachmentRequestDto } from './use-cloudinary-upload'

export enum Language {
  ENGLISH = 'ENGLISH',
  KINYARWANDA = 'KINYARWANDA',
  FRENCH = 'FRENCH'
}

export enum IssueType {
  POSITIVE_FEEDBACK = 'POSITIVE_FEEDBACK',
  NEGATIVE_FEEDBACK = 'NEGATIVE_FEEDBACK',
  SUGGESTION = 'SUGGESTION'
}

export interface IssueUserDto {
  firstName: string
  lastName: string
  phoneNumber: string
  email?: string
}

export interface LocationRequestDto {
  // Add location fields as needed
  latitude?: number
  longitude?: number
  address?: string
}

export interface IssueRequestDto {
  title: string
  description: string
  language: Language
  issueType: IssueType
  user: IssueUserDto | null
  departmentId?: number
  isPrivate: boolean
  isanonymous: boolean
  assignedToId?: number
  location?: LocationRequestDto
  attachments: AttachmentRequestDto[]
}

export interface TicketResponseDto {
  ticketId: string
  message: string
}

export interface UseCreateIssueReturn {
  createIssue: (issueData: Omit<IssueRequestDto, 'language' | 'issueType' | 'departmentId'> & { 
    issueType: string
    departmentId: string
  }) => Promise<TicketResponseDto | null>
  isCreating: boolean
  error: string | null
  resetError: () => void
}

export const useCreateIssue = (): UseCreateIssueReturn => {
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { language } = useLanguage()

  const resetError = useCallback(() => {
    setError(null)
  }, [])

  const mapLanguageToEnum = useCallback((lang: string): Language => {
    switch (lang) {
      case 'en':
        return Language.ENGLISH
      case 'rw':
        return Language.KINYARWANDA
      case 'fr':
        return Language.FRENCH
      default:
        return Language.ENGLISH
    }
  }, [])

  const mapIssueTypeToEnum = useCallback((type: string): IssueType => {
    switch (type) {
      case 'positive_feedback':
        return IssueType.POSITIVE_FEEDBACK
      case 'negative_feedback':
        return IssueType.NEGATIVE_FEEDBACK
      case 'suggestion':
        return IssueType.SUGGESTION
      default:
        return IssueType.SUGGESTION
    }
  }, [])

  const mapCategoryToDepartmentId = useCallback((category: string): number | undefined => {
    // Map category to department ID - adjust these mappings based on your backend
    const categoryMap: Record<string, number> = {
      'infrastructure': 1,
      'healthcare': 2,
      'education': 3,
      'security': 4,
      'environment': 5,
      'other': 6
    }
    return categoryMap[category]
  }, [])

  const createIssue = useCallback(async (issueData: Omit<IssueRequestDto, 'language' | 'issueType' | 'departmentId'> & { 
    issueType: string
    departmentId: string
  }): Promise<TicketResponseDto | null> => {
    try {
      setIsCreating(true)
      setError(null)

      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'
      
      const requestData: IssueRequestDto = {
        ...issueData,
        language: mapLanguageToEnum(language),
        issueType: mapIssueTypeToEnum(issueData.issueType),
        departmentId: mapCategoryToDepartmentId(issueData.departmentId)
      }

      const response = await fetch(`${baseUrl}/issues`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const result: TicketResponseDto = await response.json()
      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create issue'
      setError(errorMessage)
      console.error('Create issue error:', error)
      return null
    } finally {
      setIsCreating(false)
    }
  }, [language, mapLanguageToEnum, mapIssueTypeToEnum, mapCategoryToDepartmentId])

  return {
    createIssue,
    isCreating,
    error,
    resetError,
  }
}
