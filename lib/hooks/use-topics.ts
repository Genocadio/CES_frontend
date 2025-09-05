import { useState, useEffect } from 'react'
import { useAuth } from './use-auth'
import { makeAuthenticatedRequest, handleAuthenticationError } from '@/lib/utils/authenticated-fetch'

interface Post {
  id: string
  title?: string
  content: string
  author: {
    id: string
    firstName: string
    lastName: string
  }
  createdAt: string
  upvotes: number
  downvotes: number
  replies: Reply[]
  attachments?: Attachment[]
  userVote?: 'up' | 'down' | null
}

interface Reply {
  id: string
  content: string
  author: {
    id: string
    firstName: string
    lastName: string
  }
  createdAt: string
  upvotes: number
  downvotes: number
  replies: Reply[]
  attachments?: Attachment[]
  userVote?: 'up' | 'down' | null
  parentId?: string
}

interface Attachment {
  id: string
  url: string
  type: 'image' | 'file'
  name: string
}

interface CreatePostData {
  title?: string
  content: string
  attachments?: File[]
}

interface CreateReplyData {
  content: string
  parentId?: string
  attachments?: File[]
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'

export function useTopics() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const fetchPosts = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await makeAuthenticatedRequest(`${API_BASE_URL}/topics/posts`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }

      const data = await response.json()
      setPosts(data.posts || [])
    } catch (err) {
      handleAuthenticationError(err as Error)
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching posts:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const uploadAttachment = async (file: File): Promise<Attachment> => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await makeAuthenticatedRequest(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to upload attachment')
    }

    const data = await response.json()
    return {
      id: data.id,
      url: data.url,
      type: file.type.startsWith('image/') ? 'image' : 'file',
      name: file.name,
    }
  }

  const createPost = async (postData: CreatePostData) => {
    try {
      let attachments: Attachment[] = []
      
      if (postData.attachments && postData.attachments.length > 0) {
        attachments = await Promise.all(
          postData.attachments.map(file => uploadAttachment(file))
        )
      }

      const response = await makeAuthenticatedRequest(`${API_BASE_URL}/topics/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: postData.title,
          content: postData.content,
          attachments: attachments,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create post')
      }

      const newPost = await response.json()
      setPosts(prev => [newPost, ...prev])
    } catch (err) {
      handleAuthenticationError(err as Error)
      console.error('Error creating post:', err)
      throw err
    }
  }

  const createReply = async (postId: string, replyData: CreateReplyData) => {
    try {
      let attachments: Attachment[] = []
      
      if (replyData.attachments && replyData.attachments.length > 0) {
        attachments = await Promise.all(
          replyData.attachments.map(file => uploadAttachment(file))
        )
      }

      const response = await makeAuthenticatedRequest(`${API_BASE_URL}/topics/posts/${postId}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: replyData.content,
          parentId: replyData.parentId,
          attachments: attachments,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create reply')
      }

      const newReply = await response.json()
      
      // Update the posts state to include the new reply
      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            replies: replyData.parentId 
              ? addReplyToNestedReplies(post.replies, newReply, replyData.parentId)
              : [...post.replies, newReply]
          }
        }
        return post
      }))
    } catch (err) {
      handleAuthenticationError(err as Error)
      console.error('Error creating reply:', err)
      throw err
    }
  }

  const addReplyToNestedReplies = (replies: Reply[], newReply: Reply, parentId: string): Reply[] => {
    return replies.map(reply => {
      if (reply.id === parentId) {
        return {
          ...reply,
          replies: [...reply.replies, newReply]
        }
      } else if (reply.replies.length > 0) {
        return {
          ...reply,
          replies: addReplyToNestedReplies(reply.replies, newReply, parentId)
        }
      }
      return reply
    })
  }

  const votePost = async (postId: string, voteType: 'up' | 'down') => {
    try {
      const response = await makeAuthenticatedRequest(`${API_BASE_URL}/topics/posts/${postId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voteType }),
      })

      if (!response.ok) {
        throw new Error('Failed to vote on post')
      }

      const updatedPost = await response.json()
      
      setPosts(prev => prev.map(post => 
        post.id === postId ? updatedPost : post
      ))
    } catch (err) {
      handleAuthenticationError(err as Error)
      console.error('Error voting on post:', err)
      throw err
    }
  }

  const voteReply = async (replyId: string, voteType: 'up' | 'down') => {
    try {
      const response = await makeAuthenticatedRequest(`${API_BASE_URL}/topics/replies/${replyId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voteType }),
      })

      if (!response.ok) {
        throw new Error('Failed to vote on reply')
      }

      const updatedReply = await response.json()
      
      // Update the posts state to include the updated reply
      setPosts(prev => prev.map(post => ({
        ...post,
        replies: updateReplyInNestedReplies(post.replies, updatedReply)
      })))
    } catch (err) {
      handleAuthenticationError(err as Error)
      console.error('Error voting on reply:', err)
      throw err
    }
  }

  const updateReplyInNestedReplies = (replies: Reply[], updatedReply: Reply): Reply[] => {
    return replies.map(reply => {
      if (reply.id === updatedReply.id) {
        return updatedReply
      } else if (reply.replies.length > 0) {
        return {
          ...reply,
          replies: updateReplyInNestedReplies(reply.replies, updatedReply)
        }
      }
      return reply
    })
  }

  useEffect(() => {
    if (user) {
      fetchPosts()
    }
  }, [user])

  return {
    posts,
    isLoading,
    error,
    createPost,
    createReply,
    votePost,
    voteReply,
    refetch: fetchPosts,
  }
}
