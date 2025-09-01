"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { SharedHeader } from "../components/shared-header"
import { useLanguage } from "@/hooks/use-language"
import { Search, MessageSquare, Clock, CheckCircle, XCircle, FileText, Plus, X, Upload, Phone, User } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useCallback, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { useFetchIssue, type IssueResponseDto } from "@/lib/hooks/use-fetch-issue"
import { useUpdateIssue } from "@/lib/hooks/use-update-issue"
import { useDepartments } from "@/lib/hooks/use-departments"
import { AttachmentType } from "@/lib/hooks/use-cloudinary-upload"
import { Combobox } from "@/components/ui/combobox"
import { LeaderSearch } from "@/components/ui/leader-search"
import { LeaderSearchResponseDto } from "@/lib/hooks/use-search-leaders"

export default function FollowupPage() {
  const { t, language } = useLanguage()
  const searchParams = useSearchParams()
  const [ticketId, setTicketId] = useState("")

  const [showCompleteForm, setShowCompleteForm] = useState(false)
  const [showSearchOverlay, setShowSearchOverlay] = useState(false)
  const [issueDetails, setIssueDetails] = useState({
    title: "",
    description: "",
    departmentId: "",
    issueType: "",
    isPublic: true,
    attachments: [] as File[],
    additionalInfo: "",
    assignedToId: null as number | null,
    assignedLeader: null as LeaderSearchResponseDto | null,
  })

  // Use the new hook to fetch issues
  const { isLoading, error, resetError } = useFetchIssue()

  // Initialize departments hook
  const { departments, searchDepartments, isLoading: departmentsLoading } = useDepartments()
  
  // Initialize update issue hook
  const { updateIssue, resetError: resetUpdateError } = useUpdateIssue()

  // Ref to track if we've already fetched a specific ticket ID
  const fetchedTicketIdRef = useRef<string | null>(null)
  
  // Local state for the issue to avoid hook dependency issues
  const [localIssue, setLocalIssue] = useState<IssueResponseDto | null>(null)
  const [localIsLoading, setLocalIsLoading] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

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
    
    // Use local state to avoid hook dependency issues
    const fetchData = async () => {
      setLocalIsLoading(true)
      setLocalError(null)
      
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'
        const response = await fetch(`${baseUrl}/issues/ticket/${idToSearch}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Ticket not found')
          }
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setLocalIssue(data)
        setTicketId(idToSearch)
        fetchedTicketIdRef.current = idToSearch
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch issue'
        setLocalError(errorMessage)
        console.error('Fetch issue error:', err)
      } finally {
        setLocalIsLoading(false)
      }
    }
    
    await fetchData()
  }, [ticketId, resetError])

  // Check for ticket ID in URL params - only run once per ticket ID
  useEffect(() => {
    const urlTicketId = searchParams.get("id")
    if (urlTicketId && urlTicketId !== fetchedTicketIdRef.current) {
      setTicketId(urlTicketId)
      fetchedTicketIdRef.current = urlTicketId
      
      // Use local state to avoid hook dependency issues
      const fetchData = async () => {
        setLocalIsLoading(true)
        setLocalError(null)
        setLocalIssue(null)
        
        try {
          const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'
          const response = await fetch(`${baseUrl}/issues/ticket/${urlTicketId}`)
          
          if (!response.ok) {
            if (response.status === 404) {
              throw new Error('Ticket not found')
            }
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
          }
          
          const data = await response.json()
          setLocalIssue(data)
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to fetch issue'
          setLocalError(errorMessage)
          console.error('Fetch issue error:', err)
        } finally {
          setLocalIsLoading(false)
        }
      }
      
      fetchData()
    }
  }, [searchParams]) // Only depend on searchParams





  const handleCompleteIssue = async () => {
    if (!localIssue || !issueDetails.title.trim() || !issueDetails.description.trim() || !issueDetails.departmentId || !issueDetails.issueType) {
      return
    }


    resetUpdateError()

    try {
      // Call the update issue API
      const updatedIssue = await updateIssue({
        id: localIssue.id,
        title: issueDetails.title,
        description: issueDetails.description,
        issueType: issueDetails.issueType,
        departmentId: parseInt(issueDetails.departmentId),
        isPrivate: !issueDetails.isPublic,
        assignedToId: issueDetails.assignedToId || undefined,
        attachments: issueDetails.attachments.map(file => ({
          url: URL.createObjectURL(file),
          type: file.type.startsWith('image/') ? AttachmentType.PHOTO : 
                file.type.startsWith('video/') ? AttachmentType.VIDEO : 
                file.type.startsWith('audio/') ? AttachmentType.AUDIO : 
                file.type === 'application/pdf' ? AttachmentType.PHOTO : AttachmentType.DOCUMENT,
          description: file.name
        }))
      })

      if (updatedIssue) {
        // Update the local issue with the returned data
        setLocalIssue(updatedIssue as IssueResponseDto)
        
        // Clear the form
        setIssueDetails({ 
          title: "", 
          description: "", 
          departmentId: "", 
          issueType: "", 
          isPublic: true, 
          attachments: [], 
          additionalInfo: "",
          assignedToId: null,
          assignedLeader: null
        })
        setShowCompleteForm(false)
        

      }
    } catch (error) {
      console.error('Failed to complete issue:', error)
    }
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





  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <SharedHeader showHomeButton={true} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{t("followUp")}</h1>
            <p className="text-muted-foreground">{t("followUpDescription")}</p>
          </div>

          {/* Floating Search Component */}
          <div className="fixed top-6 right-6 z-50">
            {!showSearchOverlay ? (
              // Minimized search button
              <Button
                onClick={() => setShowSearchOverlay(true)}
                size="sm"
                className="rounded-full w-12 h-12 p-0 shadow-lg bg-green-600 hover:bg-green-700 text-white border-0 font-bold"
                title={t("searchNewTicket")}
              >
                <Search className="h-4 w-4" />
              </Button>
            ) : (
              // Expanded search form that overlays current content
              <Card className="w-80 shadow-lg bg-background/95 backdrop-blur-sm border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <Search className="h-4 w-4" />
                      {t("enterTicketId")}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSearchOverlay(false)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input
                    placeholder={t("placeholders.ticketId")}
                    value={ticketId}
                    onChange={(e) => setTicketId(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="text-sm"
                  />
                  <Button 
                    onClick={() => {
                      handleSearch()
                      setShowSearchOverlay(false)
                    }} 
                    disabled={isLoading || localIsLoading || !ticketId.trim()}
                    size="sm"
                    className="w-full"
                  >
                    {isLoading || localIsLoading ? t("loading") : t("search")}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Error Message */}
          {(error || localError) && (
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <XCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {(error || localError) === 'Ticket not found' ? 'Ticket Not Found' : 'Error'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {(error || localError) === 'Ticket not found' 
                      ? `We couldn't find an issue with ticket ID "${ticketId}". Please check the ID and try again.`
                      : (error || localError)
                    }
                  </p>
                  <Link href="/submit">
                    <Button>Submit New Issue</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

                                        {/* Issue Details and Contact Information - Reorganized */}
          {localIssue && (
            <div className="space-y-6">
              {/* Contact Information Card - Always shown */}
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{t("fullName")}:</span>
                      <span className="font-medium text-sm">{localIssue.createdBy?.firstName} {localIssue.createdBy?.lastName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-sm">{localIssue.createdBy?.phoneNumber}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{t("ticketId")}:</span>
                      <span className="font-mono text-sm font-bold">{localIssue.ticketId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-sm">
                        {localIssue.createdAt ? new Date(localIssue.createdAt).toLocaleDateString() : t("dateNotAvailable")}
                      </span>
                    </div>
                  </div>

                  {/* Email if exists */}
                  {localIssue.createdBy?.email && (
                    <div className="mt-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{t("email")}:</span>
                        <span className="font-medium text-sm">{localIssue.createdBy.email}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Issue Details Card - Only shown for complete issues */}
              {(localIssue.title && localIssue.description && localIssue.issueType) && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(localIssue.status || "received")}>
                          {localIssue.status === "received" ? t("received") : 
                           localIssue.status === "in-progress" ? t("inProgress") : 
                           localIssue.status === "resolved" ? t("resolved") : 
                           localIssue.status === "closed" ? t("closed") : t("received")}
                        </Badge>
                        {localIssue.department && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            {language === 'rw' ? localIssue.department.nameRw : language === 'fr' ? localIssue.department.nameFr : localIssue.department.nameEn}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">{t("title")}</Label>
                        <p className="mt-1 text-foreground">{localIssue.title}</p>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">{t("description")}</Label>
                        <p className="mt-1 text-foreground">{localIssue.description}</p>
                      </div>

                      {localIssue.attachments && localIssue.attachments.length > 0 && (
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">{t("attachments")}</Label>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {localIssue.attachments.map((attachment, index) => (
                              <Badge key={index} variant="outline" className="text-sm">
                                <FileText className="h-4 w-4 mr-2" />
                                {attachment.description || attachment.url.split("/").pop()}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {localIssue.assignedTo && (
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">{t("assignedTo")}</Label>
                          <div className="mt-2 p-2 bg-muted rounded-lg">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium">
                                {localIssue.assignedTo.firstName} {localIssue.assignedTo.lastName}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}





              {/* Comments Section - Only show for complete issues */}
              {(localIssue.title && localIssue.description && localIssue.issueType) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      {t("commentsAndUpdates")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!localIssue.comments || localIssue.comments.length === 0 ? (
                      <p className="text-muted-foreground text-center py-4">{t("noCommentsYet")}</p>
                    ) : (
                      <div className="space-y-4">
                        {localIssue.comments.map((comment) => (
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

                                         {/* Add Comment - Only for logged-in users */}
                     {/* TODO: Add authentication check here */}
                     {/* For now, hiding comment form for all users */}
                     {/* 
                     <div className="border-t pt-4">
                       <Label htmlFor="new-comment">{t("addCommentOrQuestion")}</Label>
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
                         {isAddingComment ? t("loading") : t("addComment")}
                       </Button>
                     </div>
                     */}
                  </CardContent>
                </Card>
              )}

              {/* Complete Issue Form - Only show for incomplete issues */}
              {(!localIssue.title || !localIssue.description || !localIssue.issueType) && !showCompleteForm && (
                <Card className="ring-2 ring-amber-500 bg-amber-50">
                  <CardHeader>
                                         <CardTitle className="text-amber-800">{t("completeYourIssueDetails")}</CardTitle>
                     <CardDescription className="text-amber-700">
                       {t("quickIssueFormDescription")}
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => setShowCompleteForm(true)} 
                      className="bg-amber-600 hover:bg-amber-700 w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {t("completeIssueDetails")}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Complete Issue Form - Expanded form (copy-paste from submit page) */}
              {(!localIssue.title || !localIssue.description || !localIssue.issueType) && showCompleteForm && (
                <Card className="ring-2 ring-amber-500 bg-amber-50">
                  <CardHeader>
                    <CardTitle className="text-amber-800">{t("completeYourIssueDetails")}</CardTitle>
                    <CardDescription className="text-amber-700">
                      {t("quickIssueFormDescription")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={(e) => { e.preventDefault(); handleCompleteIssue(); }} className="space-y-6">
                      {/* Issue Details - Copy-paste from submit page */}
                      <Card>
                        <CardHeader>
                          <CardTitle>{t("issueDetails")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                                                     <div>
                             <Label htmlFor="title">{t("title")} *</Label>
                             <Input
                               id="title"
                               value={issueDetails.title}
                               onChange={(e) => setIssueDetails(prev => ({ ...prev, title: e.target.value }))}
                               placeholder={t("placeholders.issueTitle")}
                               required
                             />
                           </div>

                                                     <div>
                             <Label htmlFor="description">{t("description")} *</Label>
                            <Textarea
                              id="description"
                              value={issueDetails.description}
                              onChange={(e) => setIssueDetails(prev => ({ ...prev, description: e.target.value }))}
                              placeholder={t("placeholders.issueDescription")}
                              rows={4}
                              required
                            />
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label>{t("category")} *</Label>
                              <Combobox
                                options={departments.map(dept => ({
                                  value: dept.id.toString(),
                                  label: language === 'rw' ? dept.nameRw : language === 'fr' ? dept.nameFr : dept.nameEn,
                                  id: dept.id
                                }))}
                                value={issueDetails.departmentId}
                                onValueChange={(value: string) => setIssueDetails(prev => ({ ...prev, departmentId: value }))}
                                placeholder={t("placeholders.category")}
                                emptyText={t("noDepartmentsFound")}
                                typeSomethingText={t("typeSomethingToSearch")}
                                onSearch={searchDepartments}
                                isLoading={departmentsLoading}
                              />
                            </div>

                            <div>
                              <Label>{t("issueType")}</Label>
                              <Select
                                value={issueDetails.issueType}
                                onValueChange={(value) => setIssueDetails(prev => ({ ...prev, issueType: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {issueTypes.map((issueType) => (
                                    <SelectItem key={issueType.value} value={issueType.value}>
                                      {issueType.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label>{t("attachments")}</Label>
                              <div className="mt-2">
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
                                  className="hidden"
                                  id="file-upload"
                                  accept="image/*,.pdf,.doc,.docx"
                                />
                                <label
                                  htmlFor="file-upload"
                                  className="flex items-center gap-2 p-3 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                                >
                                  <Upload className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">{t("attachFiles")}</span>
                                </label>
                                {issueDetails.attachments.length > 0 && (
                                  <div className="mt-2 space-y-2">
                                    {issueDetails.attachments.map((file, index) => (
                                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                                        <div className="flex items-center gap-2">
                                          <CheckCircle className="h-4 w-4 text-green-600" />
                                          <span className="text-sm text-muted-foreground">
                                            {file.name}
                                          </span>
                                          <span className="text-xs text-muted-foreground">
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
                                          className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                                        >
                                          <X className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div>
                              <Label>{t("assignReader")}</Label>
                              <div className="mt-2">
                                <LeaderSearch
                                  onLeaderSelect={(leader) => setIssueDetails(prev => ({ 
                                    ...prev, 
                                    assignedToId: leader.userId,
                                    assignedLeader: leader
                                  }))}
                                  selectedLeader={issueDetails.assignedLeader}
                                  onClearSelection={() => setIssueDetails(prev => ({ 
                                    ...prev, 
                                    assignedToId: null,
                                    assignedLeader: null
                                  }))}
                                  placeholder={t("searchLeaderByName")}
                                />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Privacy Settings - Copy-paste from submit page */}
                      <Card>
                        <CardHeader>
                          <CardTitle>{t("privacySettings")}</CardTitle>
                          <CardDescription>{t("privacySettingsDescription")}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="is-public"
                              checked={issueDetails.isPublic}
                              onCheckedChange={(checked) => setIssueDetails(prev => ({ ...prev, isPublic: !!checked }))}
                            />
                            <Label htmlFor="is-public">
                              {t("isPublic")} - {t("isPublicDescription")}
                            </Label>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Submit Button */}
                      <div className="flex gap-3 pt-4">
                        <Button
                          type="submit"
                          disabled={!issueDetails.title.trim() || !issueDetails.description.trim() || !issueDetails.departmentId || !issueDetails.issueType}
                          className="bg-amber-600 hover:bg-amber-700 w-full"
                        >
                          {t("completeIssueSubmission")}
                        </Button>

                      </div>
                    </form>
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
