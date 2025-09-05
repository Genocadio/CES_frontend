"use client"

import { useState, useCallback } from 'react'
import { API_ENDPOINTS } from '@/lib/config/api'
import { makeAuthenticatedRequest, handleAuthenticationError } from '@/lib/utils/authenticated-fetch'
import { 
  CommentResponseDto, 
  CommentRequestDto, 
  PostType,
  CommentVoteResponseDto 
} from '@/lib/types/comments'

interface UseCommentsReturn {
  comments: CommentResponseDto[]
  isLoading: boolean
  error: string | null
  hasMore: boolean
  currentPage: number
  totalPages: number
  totalElements: number
  fetchComments: (postId: number, postType: PostType, page?: number, append?: boolean) => Promise<void>
  createComment: (commentData: CommentRequestDto) => Promise<CommentResponseDto | null>
  voteComment: (commentId: number, voteType: 'up' | 'down') => Promise<CommentVoteResponseDto | null>
  resetError: () => void
  clearComments: () => void
}

export function useComments(): UseCommentsReturn {
  const [comments, setComments] = useState<CommentResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)

  const resetError = useCallback(() => {
    setError(null)
  }, [])

  const clearComments = useCallback(() => {
    setComments([])
    setCurrentPage(0)
    setTotalPages(0)
    setTotalElements(0)
    setHasMore(true)
    setError(null)
  }, [])


  const fetchComments = useCallback(async (
    postId: number, 
    postType: PostType, 
    page: number = 0, 
    append: boolean = false
  ) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await makeAuthenticatedRequest(
        API_ENDPOINTS.COMMENTS.GET_BY_POST(postId, postType, page, 20, 'createdAt', 'desc'),
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      
      if (response.ok) {
        const data = await response.json()
        
        if (append) {
          setComments(prev => [...prev, ...(data.content || [])])
        } else {
          setComments(data.content || [])
        }
        
        setTotalPages(data.totalPages || 0)
        setTotalElements(data.totalElements || 0)
        setCurrentPage(page)
        setHasMore(!data.last)
      } else {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }
    } catch (err) {
      handleAuthenticationError(err as Error)
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch comments'
      setError(errorMessage)
      console.error('Fetch comments error:', err)
      
      if (!append) {
        setComments([])
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const createComment = useCallback(async (commentData: CommentRequestDto): Promise<CommentResponseDto | null> => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await makeAuthenticatedRequest(API_ENDPOINTS.COMMENTS.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      })
      
      if (response.ok) {
        const newComment = await response.json()
        
        // Add the new comment to the beginning of the list
        setComments(prev => [newComment, ...prev])
        
        // Update total elements count
        setTotalElements(prev => prev + 1)
        
        return newComment
      } else {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }
    } catch (err) {
      handleAuthenticationError(err as Error)
      const errorMessage = err instanceof Error ? err.message : 'Failed to create comment'
      setError(errorMessage)
      console.error('Create comment error:', err)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const voteComment = useCallback(async (
    commentId: number, 
    voteType: 'up' | 'down'
  ): Promise<CommentVoteResponseDto | null> => {
    try {
      setError(null)
      
      const endpoint = voteType === 'up' 
        ? API_ENDPOINTS.COMMENTS.UPVOTE(commentId.toString())
        : API_ENDPOINTS.COMMENTS.DOWNVOTE(commentId.toString())
      
      const response = await makeAuthenticatedRequest(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok) {
        const voteData = await response.json()
        
        // Update the comment in the state with new voting data
        const updateCommentInState = (commentList: CommentResponseDto[], targetId: number, updatedData: CommentVoteResponseDto): CommentResponseDto[] => {
          return commentList.map(comment => {
            if (comment.id === targetId) {
              return { ...comment, ...updatedData }
            }
            if (comment.children && comment.children.length > 0) {
              return { ...comment, children: updateCommentInState(comment.children, targetId, updatedData) }
            }
            return comment
          })
        }
        
        setComments(prev => updateCommentInState(prev, commentId, voteData))
        
        return voteData
      } else {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }
    } catch (err) {
      handleAuthenticationError(err as Error)
      const errorMessage = err instanceof Error ? err.message : 'Failed to vote on comment'
      setError(errorMessage)
      console.error('Vote comment error:', err)
      return null
    }
  }, [])

  return {
    comments,
    isLoading,
    error,
    hasMore,
    currentPage,
    totalPages,
    totalElements,
    fetchComments,
    createComment,
    voteComment,
    resetError,
    clearComments,
  }
}
