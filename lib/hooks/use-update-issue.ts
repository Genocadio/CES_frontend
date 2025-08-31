'use client'

import { useState, useCallback } from 'react'
import { useLanguage } from '@/hooks/use-language'
import { AttachmentRequestDto } from './use-cloudinary-upload'
import { ResponseResponseDto, CommentResponseDto } from './use-fetch-issue'

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

export enum IssueStatus {
  RECEIVED = 'RECEIVED',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED'
}

export enum Urgency {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export interface IssueUserDto {
  firstName: string
  lastName: string
  phoneNumber: string
  email?: string
}

export interface LocationRequestDto {
  latitude?: number
  longitude?: number
  address?: string
}

export interface IssueUpdateRequestDto {
  id: number
  title?: string
  description?: string
  language?: Language
  issueType?: IssueType
  departmentId?: number
  isPrivate?: boolean
  assignedToId?: number
  location?: LocationRequestDto
  attachments?: AttachmentRequestDto[]
  status?: IssueStatus
  urgency?: Urgency
  level?: string
}

export interface IssueResponseDto {
  id: number
  title: string
  description: string
  language: Language
  issueType: IssueType
  ticketId: string
  department?: {
    id: number
    nameEn: string
    nameFr: string
    nameRw: string
  }
  createdBy?: {
    id: number
    firstName: string
    lastName: string
    middleName?: string
    phoneNumber: string
    email?: string
    profileUrl?: string
    role?: string
    accountStatus?: string
    accountStatusDisplayName?: string
    canLogin?: boolean
    department?: {
      id: number
      nameEn: string
      nameFr: string
      nameRw: string
    }
    location?: LocationRequestDto
    leadershipLevelName?: string
  }
  owner?: {
    id: number
    firstName: string
    lastName: string
    middleName?: string
    phoneNumber: string
    email?: string
    profileUrl?: string
    role?: string
    accountStatus?: string
    accountStatusDisplayName?: string
    canLogin?: boolean
    department?: {
      id: number
      nameEn: string
      nameFr: string
      nameRw: string
    }
    location?: LocationRequestDto
    leadershipLevelName?: string
  }
  assignedTo?: {
    id: number
    firstName: string
    lastName: string
    middleName?: string
    phoneNumber: string
    email?: string
    profileUrl?: string
    role?: string
    accountStatus?: string
    accountStatusDisplayName?: string
    canLogin?: boolean
    department?: {
      id: number
      nameEn: string
      nameFr: string
      nameRw: string
    }
    location?: LocationRequestDto
    leadershipLevelName?: string
  }
  location?: LocationRequestDto
  attachments?: AttachmentRequestDto[]
  responses?: ResponseResponseDto[]
  comments?: CommentResponseDto[]
  parent?: IssueResponseDto
  links?: IssueResponseDto[]
  status: IssueStatus
  urgency?: Urgency
  level?: string
  likes: number
  followers: number
  isLikedByUser: boolean
  isFollowedByUser: boolean
  isPrivate: boolean
  createdAt: string
  updatedAt: string
}

export interface UseUpdateIssueReturn {
  updateIssue: (issueData: Omit<IssueUpdateRequestDto, 'language' | 'issueType'> & { 
    issueType?: string
  }) => Promise<IssueResponseDto | null>
  isUpdating: boolean
  error: string | null
  resetError: () => void
}

export const useUpdateIssue = (): UseUpdateIssueReturn => {
  const [isUpdating, setIsUpdating] = useState(false)
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

  const updateIssue = useCallback(async (issueData: Omit<IssueUpdateRequestDto, 'language' | 'issueType'> & { 
    issueType?: string
  }): Promise<IssueResponseDto | null> => {
    try {
      setIsUpdating(true)
      setError(null)

      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'
      
      const requestData: IssueUpdateRequestDto = {
        ...issueData,
        language: mapLanguageToEnum(language),
        issueType: issueData.issueType ? mapIssueTypeToEnum(issueData.issueType) : undefined,
        departmentId: issueData.departmentId || mapCategoryToDepartmentId(issueData.departmentId?.toString() || '')
      }

      // Remove undefined values to avoid sending them in the request
      const cleanRequestData = Object.fromEntries(
        Object.entries(requestData).filter(([, value]) => value !== undefined)
      )

      const response = await fetch(`${baseUrl}/issues/${issueData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanRequestData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const result: IssueResponseDto = await response.json()
      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update issue'
      setError(errorMessage)
      console.error('Update issue error:', error)
      return null
    } finally {
      setIsUpdating(false)
    }
  }, [language, mapLanguageToEnum, mapIssueTypeToEnum, mapCategoryToDepartmentId])

  return {
    updateIssue,
    isUpdating,
    error,
    resetError,
  }
}


