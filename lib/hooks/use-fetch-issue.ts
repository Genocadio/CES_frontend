import { useState, useCallback } from 'react'

export interface AttachmentResponseDto {
  id: number
  url: string
  type: string
  description: string
}

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

export interface UserResponseDto {
  id: number
  firstName: string
  lastName: string
  email?: string
  phoneNumber: string
}

export interface CommentResponseDto {
  id: number
  text: string
  author: UserResponseDto
  createdAt: string
}

export interface ResponseResponseDto {
  id: number
  postType: string
  postId: number
  responder: UserResponseDto
  message: string
  language: string
  isPublic: boolean
  createdAt: string
  status: string
  attachments: AttachmentResponseDto[]
  comments: CommentResponseDto[]
  children?: ResponseResponseDto[]
  parent?: ResponseResponseDto
  upvoteCount: number
  downvoteCount: number
  hasUpvoted: boolean
  hasDownvoted: boolean
  averageRating: number
}

export interface LocationResponseDto {
  id: number
  name: string
  description?: string
}

export interface IssueResponseDto {
  id: number
  title: string
  description: string
  language: string
  issueType: string
  ticketId: string
  department: DepartmentResponseDto
  createdBy: UserResponseDto
  owner: UserResponseDto
  assignedTo?: UserResponseDto
  location?: LocationResponseDto
  attachments: AttachmentResponseDto[]
  responses: ResponseResponseDto[]
  comments: CommentResponseDto[]
  parent?: IssueResponseDto
  links: IssueResponseDto[]
  status: string
  urgency: string
  level: string
  likes: number
  followers: number
  isLikedByUser: boolean
  isFollowedByUser: boolean
  isPrivate: boolean
  createdAt: string
  updatedAt: string
}

interface UseFetchIssueReturn {
  issue: IssueResponseDto | null
  isLoading: boolean
  error: string | null
  fetchIssue: (ticketId: string) => Promise<void>
  resetError: () => void
  resetIssue: () => void
}

export function useFetchIssue(): UseFetchIssueReturn {
  const [issue, setIssue] = useState<IssueResponseDto | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const resetError = useCallback(() => {
    setError(null)
  }, [])

  const resetIssue = useCallback(() => {
    setIssue(null)
    setError(null)
  }, [])

  const fetchIssue = useCallback(async (ticketId: string) => {
    if (!ticketId.trim()) return

    setIsLoading(true)
    setError(null)
    setIssue(null)

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'
      const response = await fetch(`${baseUrl}/issues/ticket/${ticketId}`)

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Ticket not found')
        }
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setIssue(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch issue'
      setError(errorMessage)
      console.error('Fetch issue error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    issue,
    isLoading,
    error,
    fetchIssue,
    resetError,
    resetIssue
  }
}
