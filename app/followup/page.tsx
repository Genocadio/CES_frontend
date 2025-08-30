"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/hooks/use-language"
import { ArrowLeft, Search, MessageSquare, Clock, CheckCircle, XCircle, FileText, Plus } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import { findIssueByTicketId, type Issue } from "@/lib/dummy-data"
import { useSearchParams } from "next/navigation"

interface Comment {
  id: string
  text: string
  author: string
  createdAt: Date
}

export default function FollowupPage() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const [ticketId, setTicketId] = useState("")
  const [issue, setIssue] = useState<Issue | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [isAddingComment, setIsAddingComment] = useState(false)
  const [showAddInfo, setShowAddInfo] = useState(false)
  const [additionalInfo, setAdditionalInfo] = useState({
    description: "",
    attachments: [] as File[],
  })

  const handleSearch = useCallback(async (searchTicketId?: string) => {
    const idToSearch = searchTicketId || ticketId
    if (!idToSearch.trim()) return

    setIsSearching(true)
    setNotFound(false)
    setIssue(null)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundIssue = findIssueByTicketId(idToSearch)
    if (foundIssue) {
      setIssue(foundIssue)
    } else {
      setNotFound(true)
    }
    setIsSearching(false)
  }, [ticketId])

  // Check for ticket ID in URL params
  useEffect(() => {
    const urlTicketId = searchParams.get("id")
    if (urlTicketId) {
      setTicketId(urlTicketId)
      handleSearch(urlTicketId)
    }
  }, [searchParams, handleSearch])

  const handleAddComment = async () => {
    if (!newComment.trim() || !issue) return

    setIsAddingComment(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const comment: Comment = {
      id: Date.now().toString(),
      text: newComment,
      author: "You",
      createdAt: new Date(),
    }

    setIssue((prev) => (prev ? { ...prev, comments: [...prev.comments, comment] } : null))
    setNewComment("")
    setIsAddingComment(false)
  }

  const handleAddMoreInfo = async () => {
    if (!additionalInfo.description.trim()) return

    setIsAddingComment(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Add the additional info as a comment
    const comment: Comment = {
      id: Date.now().toString(),
      text: `Additional Information: ${additionalInfo.description}`,
      author: "You",
      createdAt: new Date(),
    }

    setIssue((prev) => (prev ? { ...prev, comments: [...prev.comments, comment] } : null))
    setAdditionalInfo({ description: "", attachments: [] })
    setShowAddInfo(false)
    setIsAddingComment(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "received":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "received":
        return <Clock className="h-4 w-4" />
      case "in-progress":
        return <FileText className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      case "closed":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
              {t("back")}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{t("followUp")}</h1>
            <p className="text-muted-foreground">Track your issue status and add additional information</p>
          </div>

          {/* Search Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                {t("enterTicketId")}
              </CardTitle>
              <CardDescription>Enter your ticket ID to view the current status and details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder={t("placeholders.ticketId")}
                    value={ticketId}
                    onChange={(e) => setTicketId(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <Button onClick={() => handleSearch()} disabled={isSearching || !ticketId.trim()}>
                  {isSearching ? t("loading") : t("search")}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Not Found Message */}
          {notFound && (
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <XCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Ticket Not Found</h3>
                  <p className="text-muted-foreground mb-4">
                    We couldn&apos;t find an issue with ticket ID &quot;{ticketId}&quot;. Please check the ID and try again.
                  </p>
                  <Link href="/submit">
                    <Button>Submit New Issue</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Issue Details */}
          {issue && (
            <div className="space-y-6">
              {/* Status Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {getStatusIcon(issue.status)}
                      Issue Details
                    </CardTitle>
                    <Badge className={getStatusColor(issue.status)}>{t(issue.status)}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Ticket ID</Label>
                    <p className="font-mono text-lg">{issue.ticketId}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Title</Label>
                    <p className="text-lg font-semibold">{issue.title}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                    <p className="text-foreground">{issue.description}</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Category</Label>
                      <p className="capitalize">{t(issue.category)}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Priority</Label>
                      <p className="capitalize">{t(issue.priority)}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Submitted</Label>
                      <p>{issue.createdAt.toLocaleDateString()}</p>
                    </div>
                  </div>

                  {issue.attachments.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Attachments</Label>
                      <div className="flex gap-2 mt-2">
                        {issue.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">{attachment.split("/").pop()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Progress Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Progress Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Issue Submitted</p>
                        <p className="text-sm text-muted-foreground">{issue.createdAt.toLocaleString()}</p>
                      </div>
                    </div>

                    {issue.status !== "received" && (
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Under Review</p>
                          <p className="text-sm text-muted-foreground">Your issue is being reviewed by our team</p>
                        </div>
                      </div>
                    )}

                    {(issue.status === "resolved" || issue.status === "closed") && (
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Issue Resolved</p>
                          <p className="text-sm text-muted-foreground">The issue has been successfully addressed</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Comments Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Comments & Updates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {issue.comments.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">No comments yet</p>
                  ) : (
                    <div className="space-y-4">
                      {issue.comments.map((comment) => (
                        <div key={comment.id} className="border-l-4 border-primary pl-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">{comment.createdAt.toLocaleString()}</span>
                          </div>
                          <p className="text-foreground">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Comment */}
                  <div className="border-t pt-4">
                    <Label htmlFor="new-comment">Add a comment or question</Label>
                    <Textarea
                      id="new-comment"
                      placeholder={t("placeholders.comments")}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="mt-2"
                    />
                    <Button
                      onClick={handleAddComment}
                      disabled={!newComment.trim() || isAddingComment}
                      className="mt-2"
                    >
                      {isAddingComment ? t("loading") : "Add Comment"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Add More Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    {t("addMoreInfo")}
                  </CardTitle>
                  <CardDescription>
                    Provide additional details, photos, or documents related to your issue
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!showAddInfo ? (
                    <Button onClick={() => setShowAddInfo(true)} variant="outline" className="bg-transparent">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Additional Information
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="additional-info">Additional Information</Label>
                        <Textarea
                          id="additional-info"
                          placeholder={t("placeholders.additionalInfo")}
                          value={additionalInfo.description}
                          onChange={(e) => setAdditionalInfo((prev) => ({ ...prev, description: e.target.value }))}
                          rows={4}
                        />
                      </div>

                      <div>
                        <Label>Additional Attachments</Label>
                        <input
                          type="file"
                          multiple
                          onChange={(e) => {
                            if (e.target.files) {
                              setAdditionalInfo((prev) => ({
                                ...prev,
                                attachments: [...prev.attachments, ...Array.from(e.target.files!)],
                              }))
                            }
                          }}
                          className="mt-2 block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={handleAddMoreInfo}
                          disabled={!additionalInfo.description.trim() || isAddingComment}
                        >
                          {isAddingComment ? t("loading") : "Submit Additional Info"}
                        </Button>
                        <Button variant="outline" onClick={() => setShowAddInfo(false)} className="bg-transparent">
                          {t("cancel")}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
