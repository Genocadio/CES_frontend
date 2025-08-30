"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/hooks/use-language"
import { ArrowLeft, Search, MessageSquare, Clock, CheckCircle, XCircle, FileText, Plus, X } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { useFetchIssue, type IssueResponseDto } from "@/lib/hooks/use-fetch-issue"
import { useDepartments } from "@/lib/hooks/use-departments"

interface Comment {
  id: string
  text: string
  author: string
  createdAt: Date
}

export default function FollowupPage() {
  const { t, language } = useLanguage()
  const searchParams = useSearchParams()
  const [ticketId, setTicketId] = useState("")
  const [newComment, setNewComment] = useState("")
  const [isAddingComment, setIsAddingComment] = useState(false)
  const [showAddInfo, setShowAddInfo] = useState(false)
  const [showCompleteForm, setShowCompleteForm] = useState(false)
  const [additionalInfo, setAdditionalInfo] = useState({
    description: "",
    attachments: [] as File[],
  })
  const [issueDetails, setIssueDetails] = useState({
    title: "",
    description: "",
    departmentId: "",
    issueType: "",
    isPublic: true,
    attachments: [] as File[],
    additionalInfo: "",
  })

  // Use the new hook to fetch issues
  const { issue, isLoading, error, fetchIssue, resetError } = useFetchIssue()

  // Initialize departments hook
  const { departments, searchDepartments, isLoading: departmentsLoading, error: departmentsError } = useDepartments()

  // Issue types for the form
  const issueTypes = [
    { value: "positive_feedback", label: t("positiveFeedback") },
    { value: "negative_feedback", label: t("negativeFeedback") },
    { value: "suggestion", label: t("suggestion") },
  ]

  const handleSearch = useCallback(async (searchTicketId?: string) => {
    const idToSearch = searchTicketId || ticketId
    if (!idToSearch.trim()) return

    resetError()
    await fetchIssue(idToSearch)
  }, [ticketId, fetchIssue, resetError])

  // Check for ticket ID in URL params
  useEffect(() => {
    const urlTicketId = searchParams.get("id")
    if (urlTicketId) {
      setTicketId(urlTicketId)
      // Call fetchIssue directly to avoid recursive dependency
      fetchIssue(urlTicketId)
    }
  }, [searchParams, fetchIssue])

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

    // Note: In a real app, you would call an API to add the comment
    // For now, we'll just clear the input
    setNewComment("")
    setIsAddingComment(false)
  }

  const handleAddMoreInfo = async () => {
    if (!additionalInfo.description.trim() || !issue) return

    setIsAddingComment(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Note: In a real app, you would call an API to add additional info
    // For now, we'll just clear the form
    setAdditionalInfo({ description: "", attachments: [] })
    setShowAddInfo(false)
    setIsAddingComment(false)
  }

  const handleCompleteIssue = async () => {
    if (!issue || !issueDetails.title.trim() || !issueDetails.description.trim() || !issueDetails.departmentId || !issueDetails.issueType) {
      return
    }

    setIsAddingComment(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Note: In a real app, you would call an API to update the issue with the new details
    // For now, we'll just clear the form and show success message
    setIssueDetails({ 
      title: "", 
      description: "", 
      departmentId: "", 
      issueType: "", 
      isPublic: true, 
      attachments: [], 
      additionalInfo: "" 
    })
    setShowCompleteForm(false)
    setIsAddingComment(false)
    
    // Show success message (you could add a state for this)
    alert("Issue completed successfully! Your issue has been updated with the additional details.")
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
                <Button onClick={() => handleSearch()} disabled={isLoading || !ticketId.trim()}>
                  {isLoading ? t("loading") : t("search")}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Error Message */}
          {error && (
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <XCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {error === 'Ticket not found' ? 'Ticket Not Found' : 'Error'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {error === 'Ticket not found' 
                      ? `We couldn't find an issue with ticket ID "${ticketId}". Please check the ID and try again.`
                      : error
                    }
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
                    <Badge className={getStatusColor(issue.status || 'received')}>{t(issue.status || 'received')}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Ticket ID</Label>
                    <p className="font-mono text-lg">{issue.ticketId}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Title</Label>
                    <p className="text-lg font-semibold">{issue.title || 'No title provided'}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                    <p className="text-foreground">{issue.description || 'No description provided'}</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Department</Label>
                      <p className="capitalize">
                        {issue.department 
                          ? (language === 'rw' ? issue.department.nameRw : language === 'fr' ? issue.department.nameFr : issue.department.nameEn)
                          : 'Not assigned'
                        }
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Issue Type</Label>
                      <p className="capitalize">{issue.issueType || 'Not specified'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Submitted</Label>
                      <p>{issue.createdAt ? new Date(issue.createdAt).toLocaleDateString() : 'Date not available'}</p>
                    </div>
                  </div>

                  {issue.attachments && issue.attachments.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Attachments</Label>
                      <div className="flex gap-2 mt-2">
                        {issue.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">{attachment.description || attachment.url.split("/").pop()}</span>
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
                        <p className="text-sm text-muted-foreground">
                          {issue.createdAt ? new Date(issue.createdAt).toLocaleString() : 'Date not available'}
                        </p>
                      </div>
                    </div>

                    {(issue.status && issue.status !== "received") && (
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

                    {(issue.status && (issue.status === "resolved" || issue.status === "closed")) && (
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

              {/* Minimal Issue Notice */}
              {(!issue.title || !issue.description || !issue.issueType) && (
                <Card className="border-amber-200 bg-amber-50">
                  <CardHeader>
                    <CardTitle className="text-amber-800">Quick Issue - More Details Needed</CardTitle>
                    <CardDescription className="text-amber-700">
                      This is a quick issue submission. To help us better assist you, please provide more details below.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-amber-100 rounded-lg">
                        <h4 className="font-medium text-amber-800 mb-2">Current Information:</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-amber-700">Name:</span>
                            <p className="text-amber-800">
                              {issue.createdBy?.firstName || 'N/A'} {issue.createdBy?.lastName || ''}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-amber-700">Phone:</span>
                            <p className="text-amber-800">{issue.createdBy?.phoneNumber || 'N/A'}</p>
                          </div>
                          {issue.createdBy?.email && (
                            <div>
                              <span className="font-medium text-amber-700">Email:</span>
                              <p className="text-amber-800">{issue.createdBy.email}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-amber-700">
                        <strong>Note:</strong> Your contact information cannot be changed. Use the form below to add more details about your issue.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Comments Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Comments & Updates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!issue.comments || issue.comments.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">No comments yet</p>
                  ) : (
                    <div className="space-y-4">
                      {issue.comments.map((comment) => (
                        <div key={comment.id} className="border-l-4 border-primary pl-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">
                              {comment.author?.firstName} {comment.author?.lastName}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : 'Date not available'}
                            </span>
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

              {/* Complete Issue Form - Only show for incomplete issues */}
              {(!issue.title || !issue.description || !issue.issueType) && !showCompleteForm && (
                <Card className="ring-2 ring-amber-500 bg-amber-50">
                  <CardHeader>
                    <CardTitle className="text-amber-800">Complete Your Issue Details</CardTitle>
                    <CardDescription className="text-amber-700">
                      This is a quick issue submission. Please provide the missing details to help us assist you better.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => setShowCompleteForm(true)} 
                      className="bg-amber-600 hover:bg-amber-700 w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Complete Issue Details
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Complete Issue Form - Expanded form */}
              {(!issue.title || !issue.description || !issue.issueType) && showCompleteForm && (
                <Card className="ring-2 ring-amber-500 bg-amber-50">
                  <CardHeader>
                    <CardTitle className="text-amber-800">Complete Your Issue Details</CardTitle>
                    <CardDescription className="text-amber-700">
                      This is a quick issue submission. Please provide the missing details to help us assist you better.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={(e) => { e.preventDefault(); handleCompleteIssue(); }} className="space-y-6">
                      {/* Basic Issue Information */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-amber-800">Required Information</h4>
                        
                        <div>
                          <Label htmlFor="issue-title">Issue Title *</Label>
                          <Input
                            id="issue-title"
                            placeholder="Brief description of your issue"
                            value={issueDetails.title}
                            onChange={(e) => setIssueDetails(prev => ({ ...prev, title: e.target.value }))}
                            required
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="issue-description">Issue Description *</Label>
                          <Textarea
                            id="issue-description"
                            placeholder="Detailed description of your issue"
                            value={issueDetails.description}
                            onChange={(e) => setIssueDetails(prev => ({ ...prev, description: e.target.value }))}
                            rows={4}
                            required
                            className="mt-1"
                          />
                        </div>
                      </div>

                      {/* Category and Issue Type */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="issue-category">Category/Department *</Label>
                          <Select
                            value={issueDetails.departmentId}
                            onValueChange={(value) => setIssueDetails(prev => ({ ...prev, departmentId: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.map((dept) => (
                                <SelectItem key={dept.id} value={dept.id.toString()}>
                                  {language === 'rw' ? dept.nameRw : language === 'fr' ? dept.nameFr : dept.nameEn}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="issue-type">Issue Type *</Label>
                          <Select
                            value={issueDetails.issueType}
                            onValueChange={(value) => setIssueDetails(prev => ({ ...prev, issueType: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select issue type" />
                            </SelectTrigger>
                            <SelectContent>
                              {issueTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Privacy Settings */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-amber-800">Privacy Settings</h4>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="is-public"
                            checked={issueDetails.isPublic}
                            onCheckedChange={(checked) => setIssueDetails(prev => ({ ...prev, isPublic: !!checked }))}
                          />
                          <Label htmlFor="is-public">
                            Make this issue public - {issueDetails.isPublic ? "Visible to everyone" : "Only visible to staff"}
                          </Label>
                        </div>
                      </div>

                      {/* Attachments */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-amber-800">Attachments</h4>
                        
                        <div>
                          <input
                            type="file"
                            multiple
                            onChange={(e) => {
                              if (e.target.files) {
                                setIssueDetails(prev => ({
                                  ...prev,
                                  attachments: [...prev.attachments, ...Array.from(e.target.files!)]
                                }))
                              }
                            }}
                            className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                          />
                        </div>

                        {issueDetails.attachments.length > 0 && (
                          <div className="space-y-2">
                            {issueDetails.attachments.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-amber-100 rounded-lg">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-amber-600" />
                                  <span className="text-sm text-amber-800">{file.name}</span>
                                  <span className="text-xs text-amber-600">
                                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                  </span>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setIssueDetails(prev => ({
                                      ...prev,
                                      attachments: prev.attachments.filter((_, i) => i !== index)
                                    }))
                                  }}
                                  className="h-6 w-6 p-0 hover:bg-amber-200 hover:text-amber-800"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Additional Information */}
                      <div>
                        <Label htmlFor="additional-info">Additional Information (Optional)</Label>
                        <Textarea
                          id="additional-info"
                          placeholder="Any additional details, context, or specific requirements"
                          value={issueDetails.additionalInfo}
                          onChange={(e) => setIssueDetails(prev => ({ ...prev, additionalInfo: e.target.value }))}
                          rows={3}
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="flex gap-3 pt-4">
                        <Button
                          type="submit"
                          disabled={isAddingComment || !issueDetails.title.trim() || !issueDetails.description.trim() || !issueDetails.departmentId || !issueDetails.issueType}
                          className="bg-amber-600 hover:bg-amber-700 flex-1"
                        >
                          {isAddingComment ? t("loading") : "Complete Issue Submission"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowCompleteForm(false)}
                          className="flex-1"
                        >
                          {t("cancel")}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Add More Information - Only show for complete issues */}
              {issue.title && issue.description && issue.issueType && (
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
                      <Button 
                        onClick={() => setShowAddInfo(true)} 
                        variant="outline"
                        className="bg-transparent"
                      >
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
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
