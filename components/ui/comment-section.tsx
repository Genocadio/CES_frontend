"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageSquare } from "lucide-react"
import { useComments } from "@/lib/hooks/use-comments"
import { useAuth } from "@/lib/hooks/use-auth"
import { PostType, CommentRequestDto } from "@/lib/types/comments"

interface Comment {
  id: number
  user?: {
    firstName?: string
    lastName?: string
    id?: number
  }
  createdAt?: string
  content: string
  hasvoted?: boolean
  upvotes?: number
  downvotes?: number
  children?: Comment[]
}

interface CommentSectionProps {
  postId: number
  postType: PostType
  showComments: boolean
  onToggleComments: () => void
  className?: string
}

export function CommentSection({ 
  postId, 
  postType, 
  showComments, 
  onToggleComments, 
  className = "" 
}: CommentSectionProps) {
  const { user } = useAuth()
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")

  const {
    comments,
    isLoading: commentsLoading,
    error: commentsError,
    fetchComments,
    createComment,
    voteComment,
    resetError: resetCommentsError,
    clearComments
  } = useComments()

  // Load comments when component mounts and comments are shown
  useEffect(() => {
    if (showComments && user) {
      fetchComments(postId, postType, 0, false)
    }
  }, [postId, postType, showComments, user, fetchComments])

  // Clear comment state when user logs out
  useEffect(() => {
    if (!user) {
      setReplyingTo(null)
      setReplyText('')
      setNewComment('')
      clearComments()
    }
  }, [user, clearComments])

  const handleAddComment = async () => {
    if (!newComment.trim() || !user) return

    try {
      const commentData: CommentRequestDto = {
        text: newComment.trim(),
        isPrivate: false,
        userId: user.id,
        postId: postId,
        postType: postType,
      }

      const newCommentData = await createComment(commentData)
      if (newCommentData) {
        setNewComment('')
      }
    } catch (error) {
      console.error('Failed to add comment:', error)
    }
  }

  const handleAddReply = async (parentCommentId: number) => {
    if (!replyText.trim() || !user) return

    try {
      const replyData: CommentRequestDto = {
        text: replyText.trim(),
        isPrivate: false,
        userId: user.id,
        postId: parentCommentId,
        postType: PostType.COMMENT,
      }

      const newReplyData = await createComment(replyData)
      if (newReplyData) {
        setReplyText('')
        setReplyingTo(null)
        // Refresh comments to get updated structure
        fetchComments(postId, postType, 0, false)
      }
    } catch (error) {
      console.error('Failed to add reply:', error)
    }
  }

  const handleVoteComment = async (commentId: number, voteType: 'up' | 'down') => {
    if (!user) return

    try {
      await voteComment(commentId, voteType)
    } catch (error) {
      console.error('Failed to vote on comment:', error)
    }
  }

  // Helper function to render comments recursively
  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`${isReply ? 'ml-8 border-l-2 border-gray-200 pl-4' : ''} mb-4`}>
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
          {(() => {
            const firstName = comment.user?.firstName || '';
            const lastName = comment.user?.lastName || '';
            
            if (firstName && lastName) {
              return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
            } else if (firstName) {
              return firstName.charAt(0).toUpperCase();
            } else if (lastName) {
              return lastName.charAt(0).toUpperCase();
            }
            return '?';
          })()}
        </div>
        
        <div className="flex-1">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">
                {user?.id && user.id === comment.user?.id ? 'You' : `${comment.user?.firstName || ''} ${comment.user?.lastName || ''}`}
              </span>
              <span className="text-xs text-gray-500">
                {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : 'Date not available'}
              </span>
            </div>
            <p className="text-gray-800 text-sm">{comment.content}</p>
            
            {/* Voting information */}
            <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
              {user ? (
                <>
                  <button
                    onClick={() => handleVoteComment(comment.id, 'up')}
                    className={`flex items-center space-x-1 transition-colors ${
                      comment.hasvoted && (comment.upvotes || 0) > 0 
                        ? 'text-green-600 bg-green-50 px-2 py-1 rounded' 
                        : 'hover:text-green-600'
                    }`}
                  >
                    <span>👍 {comment.upvotes || 0}</span>
                  </button>
                  <button
                    onClick={() => handleVoteComment(comment.id, 'down')}
                    className={`flex items-center space-x-1 transition-colors ${
                      comment.hasvoted && (comment.downvotes || 0) > 0 
                        ? 'text-red-600 bg-red-50 px-2 py-1 rounded' 
                        : 'hover:text-red-600'
                    }`}
                  >
                    <span>👎 {comment.downvotes || 0}</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">👍 {comment.upvotes || 0}</span>
                  <span className="text-red-600">👎 {comment.downvotes || 0}</span>
                </div>
              )}
              {comment.hasvoted && (
                <span className="text-blue-600 text-xs">You voted</span>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
            {user ? (
              <button
                onClick={() => {
                  if (user) {
                    setReplyingTo(replyingTo === comment.id ? null : comment.id);
                  }
                }}
                className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
              >
                <MessageSquare size={12} />
                <span>Reply</span>
              </button>
            ) : (
              <span className="text-gray-400">Log in to reply</span>
            )}
          </div>

          {/* Reply form - Only show for authenticated users */}
          {replyingTo === comment.id && user && (
            <div className="mt-3 flex space-x-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                onClick={() => handleAddReply(comment.id)}
                disabled={!replyText.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
              >
                Reply
              </button>
            </div>
          )}

          {/* Render children (replies) */}
          {comment.children && comment.children.length > 0 && (
            <div className="mt-3">
              {comment.children.map((child: Comment) => renderComment(child, true))}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Comments & Discussion
          </CardTitle>
          {user && (
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleComments}
            >
              {showComments ? 'Hide Comments' : 'Show Comments'}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!user ? (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              Please log in to view and participate in the discussion.
            </p>
          </div>
        ) : showComments ? (
          <>
            {/* Add Comment Form */}
            <div className="border-t pt-4">
              <Label htmlFor="new-comment">Add a comment or question</Label>
              <Textarea
                id="new-comment"
                placeholder="Write your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mt-2"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <Button
                  onClick={handleAddComment}
                  disabled={!newComment.trim() || commentsLoading}
                  className="mt-2"
                >
                  {commentsLoading ? 'Posting...' : 'Post Comment'}
                </Button>
              </div>
            </div>

            {/* Comments Error */}
            {commentsError && (
              <div className="text-red-600 text-sm text-center py-2">
                {commentsError}
                <Button variant="ghost" size="sm" onClick={resetCommentsError} className="ml-2">
                  Dismiss
                </Button>
              </div>
            )}

            {/* Comments List */}
            {commentsLoading && comments.length === 0 ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading comments...</p>
              </div>
            ) : comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((comment) => renderComment(comment))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No comments yet. Be the first to comment!</p>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              Click &quot;Show Comments&quot; to view and participate in the discussion.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
