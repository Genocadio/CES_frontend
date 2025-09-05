"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { SharedHeader } from "../components/shared-header"
import { useLanguage } from "@/hooks/use-language"
import { useAuth } from "@/lib/hooks/use-auth"
import { 
  MessageSquare, 
  Plus, 
  ThumbsUp, 
  ThumbsDown, 
  Reply, 
  FileText, 
  Clock,
  User,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useTopics } from "@/lib/hooks/use-topics"


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

export default function TopicsPage() {
  const { t } = useLanguage()
  const { user, isLoading: authLoading } = useAuth()
  const { posts, isLoading, createPost, votePost, createReply } = useTopics()
  const router = useRouter()
  
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostTitle, setNewPostTitle] = useState("")
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set())
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, authLoading, router])

  const handleCreatePost = async () => {
    if (!newPostContent.trim() || !user) return
    
    try {
      await createPost({
        title: newPostTitle,
        content: newPostContent,
        attachments: attachments
      })
      setNewPostContent("")
      setNewPostTitle("")
      setAttachments([])
      setShowCreateForm(false)
    } catch (error) {
      console.error("Failed to create post:", error)
    }
  }

  const handleVote = async (postId: string, type: 'up' | 'down') => {
    if (!user) return
    try {
      await votePost(postId, type)
    } catch (error) {
      console.error("Failed to vote:", error)
    }
  }

  const handleReply = async (postId: string, parentId?: string) => {
    if (!replyContent.trim() || !user) return
    
    try {
      await createReply(postId, {
        content: replyContent,
        parentId: parentId
      })
      setReplyContent("")
      setReplyingTo(null)
    } catch (error) {
      console.error("Failed to create reply:", error)
    }
  }

  const toggleReplies = (postId: string) => {
    const newExpanded = new Set(expandedReplies)
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId)
    } else {
      newExpanded.add(postId)
    }
    setExpandedReplies(newExpanded)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setAttachments(prev => [...prev, ...files])
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return "Just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }

  const renderReplies = (replies: Reply[], postId: string, depth = 0) => {
    return replies.map((reply) => (
      <div key={reply.id} className={`ml-${depth * 4} border-l-2 border-gray-200 pl-4 mt-4`}>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="font-medium text-sm">
                {reply.author.firstName} {reply.author.lastName}
              </span>
              <span className="text-xs text-gray-500">
                {formatTimeAgo(reply.createdAt)}
              </span>
            </div>
          </div>
          
          <p className="text-sm mb-3">{reply.content}</p>
          
          {reply.attachments && reply.attachments.length > 0 && (
            <div className="mb-3">
              {reply.attachments.map((attachment) => (
                <div key={attachment.id} className="mb-2">
                  {attachment.type === 'image' ? (
                    <Image 
                      src={attachment.url} 
                      alt={attachment.name}
                      width={200}
                      height={200}
                      className="max-w-xs rounded-lg"
                    />
                  ) : (
                    <a 
                      href={attachment.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:underline"
                    >
                      <FileText className="h-4 w-4" />
                      {attachment.name}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
          
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="h-6 px-2"
                onClick={() => handleVote(reply.id, 'up')}
              >
                <ThumbsUp className="h-3 w-3" />
                {reply.upvotes}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 px-2"
                onClick={() => handleVote(reply.id, 'down')}
              >
                <ThumbsDown className="h-3 w-3" />
                {reply.downvotes}
              </Button>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 px-2"
              onClick={() => setReplyingTo(reply.id)}
            >
              <Reply className="h-3 w-3 mr-1" />
              Reply
            </Button>
          </div>
          
          {replyingTo === reply.id && (
            <div className="mt-3">
              <Textarea
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="mb-2"
                rows={2}
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleReply(postId, reply.id)}>
                  Reply
                </Button>
                <Button size="sm" variant="outline" onClick={() => setReplyingTo(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
          
          {reply.replies && reply.replies.length > 0 && (
            <div className="mt-3">
              {renderReplies(reply.replies, postId, depth + 1)}
            </div>
          )}
        </div>
      </div>
    ))
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t("loading")}</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader showHomeButton={true} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t("topics")}
            </h1>
            <p className="text-muted-foreground">
              {t("topicsDescription")}
            </p>
          </div>

          {/* Create Post Button */}
          <div className="mb-6">
            <Button 
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="w-full md:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t("createPost")}
            </Button>
          </div>

          {/* Create Post Form */}
          {showCreateForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{t("createNewPost")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder={t("postTitle")}
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                />
                <Textarea
                  placeholder={t("whatsOnYourMind")}
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  rows={4}
                />
                
                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("attachments")}
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {attachments.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                          <span className="text-sm">{file.name}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeAttachment(index)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleCreatePost} disabled={!newPostContent.trim()}>
                    {t("post")}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowCreateForm(false)
                      setNewPostContent("")
                      setNewPostTitle("")
                      setAttachments([])
                    }}
                  >
                    {t("cancel")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Posts List */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {post.author.firstName} {post.author.lastName}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatTimeAgo(post.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {post.title && (
                    <h2 className="text-lg font-semibold mb-3">{post.title}</h2>
                  )}
                  
                  <p className="text-foreground mb-4 whitespace-pre-wrap">{post.content}</p>

                  {post.attachments && post.attachments.length > 0 && (
                    <div className="mb-4">
                      {post.attachments.map((attachment) => (
                        <div key={attachment.id} className="mb-2">
                          {attachment.type === 'image' ? (
                            <Image 
                              src={attachment.url} 
                              alt={attachment.name}
                              width={400}
                              height={400}
                              className="max-w-md rounded-lg"
                            />
                          ) : (
                            <a 
                              href={attachment.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-blue-600 hover:underline"
                            >
                              <FileText className="h-4 w-4" />
                              {attachment.name}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 px-3"
                          onClick={() => handleVote(post.id, 'up')}
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {post.upvotes}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 px-3"
                          onClick={() => handleVote(post.id, 'down')}
                        >
                          <ThumbsDown className="h-4 w-4 mr-1" />
                          {post.downvotes}
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-3"
                        onClick={() => setReplyingTo(post.id)}
                      >
                        <Reply className="h-4 w-4 mr-1" />
                        {t("reply")}
                      </Button>
                    </div>

                    {post.replies && post.replies.length > 0 && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleReplies(post.id)}
                      >
                        {expandedReplies.has(post.id) ? (
                          <>
                            <ChevronUp className="h-4 w-4 mr-1" />
                            Hide {post.replies.length} replies
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 mr-1" />
                            Show {post.replies.length} replies
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  {replyingTo === post.id && (
                    <div className="mt-4 pt-4 border-t">
                      <Textarea
                        placeholder={t("writeAReply")}
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="mb-3"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleReply(post.id)}>
                          {t("reply")}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setReplyingTo(null)}>
                          {t("cancel")}
                        </Button>
                      </div>
                    </div>
                  )}

                  {expandedReplies.has(post.id) && post.replies && (
                    <div className="mt-4 pt-4 border-t">
                      {renderReplies(post.replies, post.id)}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {posts.length === 0 && (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{t("noPostsYet")}</h3>
                  <p className="text-muted-foreground mb-4">{t("noPostsDescription")}</p>
                  <Button onClick={() => setShowCreateForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    {t("createFirstPost")}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
