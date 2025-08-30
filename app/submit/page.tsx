"use client"

import React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/hooks/use-language"
import { Upload, FileText, User, UserX, Save, Send, X, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"
import { generateTicketId } from "@/lib/dummy-data"
import { SharedHeader } from "../components/shared-header"
import Link from "next/link"
import { useCloudinaryUpload, AttachmentRequestDto } from "@/lib/hooks/use-cloudinary-upload"
import { useCreateIssue, IssueUserDto } from "@/lib/hooks/use-create-issue"

interface IssueForm {
  title: string
  description: string
  category: string
  issueType: string
  isPublic: boolean
  isAnonymous: boolean
  fullName: string
  phoneNumber: string
  email: string
  attachments: AttachmentRequestDto[]
  isForSomeoneElse: boolean
  otherPersonName: string
}

export default function SubmitIssuePage() {
  const { t } = useLanguage()
  
  // Mock authentication state - replace with your actual auth logic
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const [form, setForm] = useState<IssueForm>({
    title: "",
    description: "",
    category: "",
    issueType: "suggestion",
    isPublic: true,
    isAnonymous: !isLoggedIn, // Default to anonymous for non-logged-in users
    fullName: "",
    phoneNumber: "",
    email: "",
    attachments: [],
    isForSomeoneElse: false,
    otherPersonName: "",
  })

  // Initialize Cloudinary upload hook
  const { uploadFile, uploadMultipleFiles, isUploading, progress, resetProgress } = useCloudinaryUpload({
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'your-cloud-name',
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'your-upload-preset',
    folder: 'issue-attachments',
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'],
    maxFiles: 5
  })
  const [ticketId, setTicketId] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [submissionMode, setSubmissionMode] = useState<"minimal" | "full">("full")

  // Initialize create issue hook
  const { createIssue, isCreating, error: createError, resetError } = useCreateIssue()

  // Update form.isAnonymous when login status changes
  React.useEffect(() => {
    setForm(prev => ({
      ...prev,
      isAnonymous: !isLoggedIn
    }))
  }, [isLoggedIn])

  const categories = [
    { value: "infrastructure", label: t("infrastructure") },
    { value: "healthcare", label: t("healthcare") },
    { value: "education", label: t("education") },
    { value: "security", label: t("security") },
    { value: "environment", label: t("environment") },
    { value: "other", label: t("other") },
  ]

  const issueTypes = [
    { value: "positive_feedback", label: t("positiveFeedback") },
    { value: "negative_feedback", label: t("negativeFeedback") },
    { value: "suggestion", label: t("suggestion") },
  ]

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files)
      
      try {
        const results = await uploadMultipleFiles(files)
        
        // Filter successful uploads and add to form
        const successfulUploads = results
          .filter(result => result.success && result.data)
          .map(result => result.data!)
        
        setForm((prev) => ({
          ...prev,
          attachments: [...prev.attachments, ...successfulUploads],
        }))
        
        // Reset progress after successful upload
        resetProgress()
      } catch (error) {
        console.error('File upload error:', error)
      }
    }
  }

  const removeAttachment = (index: number) => {
    setForm((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }))
  }

  const handleSaveMinimal = async () => {
    resetError()

    // Prepare user data - null if anonymous
    const userData: IssueUserDto | null = form.isAnonymous ? null : {
      firstName: form.fullName.split(' ')[0] || form.fullName,
      lastName: form.fullName.split(' ').slice(1).join(' ') || '',
      phoneNumber: form.phoneNumber,
      email: form.email || undefined
    }

    // Create minimal issue data for backend
    const minimalData = {
      title: "Draft Issue", // Placeholder title for minimal submission
      description: "Issue details to be completed later", // Placeholder description
      issueType: "suggestion" as const, // Default issue type
      user: userData,
      departmentId: "", // No category selected yet
      isPrivate: true, // Default to private for drafts
      isanonymous: form.isAnonymous,
      assignedToId: undefined,
      location: undefined,
      attachments: form.attachments
    }

    // Call backend API to create minimal issue
    const result = await createIssue(minimalData)
    
    if (result) {
      setTicketId(result.ticketId)
      setShowSuccess(true)
    } else {
      // Error is already set in the hook
      console.error('Failed to create minimal issue')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    resetError()

    // Prepare user data - null if anonymous
    const userData: IssueUserDto | null = form.isAnonymous ? null : {
      firstName: form.fullName.split(' ')[0] || form.fullName,
      lastName: form.fullName.split(' ').slice(1).join(' ') || '',
      phoneNumber: form.phoneNumber,
      email: form.email || undefined
    }

    // Create issue data for backend
    const issueData = {
      title: form.title,
      description: form.description,
      issueType: form.issueType,
      user: userData,
      departmentId: form.category, // This will be mapped to department ID
      isPrivate: !form.isPublic,
      isanonymous: form.isAnonymous,
      assignedToId: undefined, // Leave blank as requested
      location: undefined, // No location for now
      attachments: form.attachments
    }

    // Call backend API
    const result = await createIssue(issueData)
    
    if (result) {
      setTicketId(result.ticketId)
      setShowSuccess(true)
    } else {
      // Error is already set in the hook
      console.error('Failed to create issue')
    }
  }

  // Toggle login status for demo purposes - remove this in production
  const toggleLoginStatus = () => {
    setIsLoggedIn(!isLoggedIn)
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <SharedHeader />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center">
            <Card>
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-green-600">{t("success")}!</CardTitle>
                <CardDescription>
                  {submissionMode === "minimal"
                    ? t("minimalSubmissionSuccess")
                    : t("fullSubmissionSuccess")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">{t("ticketId")}</p>
                  <p className="text-lg font-mono font-semibold">{ticketId}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {submissionMode === "minimal"
                    ? t("minimalSubmissionInstructions")
                    : t("fullSubmissionInstructions")}
                </p>
                <div className="flex gap-2">
                  <Link href="/" className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      {t("home")}
                    </Button>
                  </Link>
                  <Link href={`/followup?id=${ticketId}`} className="flex-1">
                                      <Button className="w-full">
                    {submissionMode === "minimal" ? t("completeIssue") : t("followUp")}
                  </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
              <SharedHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{t("submitIssue")}</h1>
            <p className="text-muted-foreground">{t("issueDescription")}</p>
            {!isLoggedIn && (
              <p className="text-sm text-muted-foreground mt-2">
                {t("notLoggedInMessage")}
              </p>
            )}
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t("submissionMethodTitle")}</CardTitle>
              <CardDescription>{t("submissionMethodDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Card
                  className={`cursor-pointer transition-colors ${submissionMode === "minimal" ? "ring-2 ring-primary" : "hover:bg-muted/50"}`}
                  onClick={() => setSubmissionMode("minimal")}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <input
                        type="radio"
                        checked={submissionMode === "minimal"}
                        onChange={() => setSubmissionMode("minimal")}
                        className="text-primary"
                      />
                      <h3 className="font-semibold">{t("quickStart")}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t("quickStartDescription")}
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-colors ${submissionMode === "full" ? "ring-2 ring-primary" : "hover:bg-muted/50"}`}
                  onClick={() => setSubmissionMode("full")}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <input
                        type="radio"
                        checked={submissionMode === "full"}
                        onChange={() => setSubmissionMode("full")}
                        className="text-primary"
                      />
                      <h3 className="font-semibold">{t("completeSubmission")}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t("completeSubmissionDescription")}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-6">
            {submissionMode === "full" && (
              <Card>
                <CardHeader>
                  <CardTitle>{t("issueDetails")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">{t("issueTitle")} *</Label>
                    <Input
                      id="title"
                      value={form.title}
                      onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder={t("placeholders.issueTitle")}
                      required={submissionMode === "full"}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">{t("issueDescription")} *</Label>
                    <Textarea
                      id="description"
                      value={form.description}
                      onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder={t("placeholders.issueDescription")}
                      rows={4}
                      required={submissionMode === "full"}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>{t("category")} *</Label>
                      <Select
                        value={form.category}
                        onValueChange={(value) => setForm((prev) => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={`${t("category")}...`} />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>{t("issueType")}</Label>
                      <Select
                        value={form.issueType}
                        onValueChange={(value) => setForm((prev) => ({ ...prev, issueType: value }))}
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

                  <div>
                    <Label>{t("attachments")}</Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                        accept="image/*,.pdf,.doc,.docx"
                      />
                      <label
                        htmlFor="file-upload"
                        className="flex items-center gap-2 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                      >
                        <Upload className="h-5 w-5 text-muted-foreground" />
                        <span className="text-muted-foreground">{t("attachFiles")}</span>
                      </label>
                      {form.attachments.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {form.attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="text-sm text-muted-foreground">
                                  {attachment.description}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  ({attachment.type})
                                </span>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeAttachment(index)}
                                className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Upload Progress */}
                      {isUploading && (
                        <div className="mt-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                            Uploading... {Math.round(progress)}%
                          </div>
                          <div className="w-full bg-muted rounded-full h-2 mt-1">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {submissionMode === "full" && (
              <Card>
                <CardHeader>
                  <CardTitle>{t("privacySettings")}</CardTitle>
                  <CardDescription>{t("privacySettingsDescription")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="is-public"
                      checked={form.isPublic}
                      onCheckedChange={(checked) => setForm((prev) => ({ ...prev, isPublic: !!checked }))}
                    />
                    <Label htmlFor="is-public">
                      {t("isPublic")} - {t("isPublicDescription")}
                    </Label>
                  </div>
                </CardContent>
              </Card>
            )}

            {submissionMode === "full" && isLoggedIn && (
              <Card>
                <CardHeader>
                  <CardTitle>{t("submissionOptions")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="for-someone-else"
                      checked={form.isForSomeoneElse}
                      onCheckedChange={(checked) => setForm((prev) => ({ ...prev, isForSomeoneElse: !!checked }))}
                    />
                    <Label htmlFor="for-someone-else">{t("submittingForSomeoneElse")}</Label>
                  </div>

                  {form.isForSomeoneElse && (
                    <div>
                      <Label htmlFor="other-person-name">{t("otherPersonNameLabel")}</Label>
                      <Input
                        id="other-person-name"
                        value={form.otherPersonName}
                        onChange={(e) => setForm((prev) => ({ ...prev, otherPersonName: e.target.value }))}
                        placeholder={t("placeholders.fullName")}
                      />
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="anonymous"
                      checked={form.isAnonymous}
                      onCheckedChange={(checked) => setForm((prev) => ({ ...prev, isAnonymous: !!checked }))}
                    />
                    <Label htmlFor="anonymous" className="flex items-center gap-2">
                      <UserX className="h-4 w-4" />
                      {t("anonymous")}
                    </Label>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Information - Only show for non-logged-in users */}
            {!isLoggedIn && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    {t("contactInformation")}
                  </CardTitle>
                  <CardDescription>
                    {submissionMode === "minimal"
                      ? t("contactRequiredDescription")
                      : `${t("optional")} - ${t("contactOptionalDescription")}`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">
                      {t("fullName")} {submissionMode === "minimal" ? "*" : ""}
                    </Label>
                    <Input
                      id="fullName"
                      value={form.fullName}
                      onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
                      placeholder={t("placeholders.fullName")}
                      required={submissionMode === "minimal"}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">
                        {t("phoneNumber")} {submissionMode === "minimal" ? "*" : ""}
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={form.phoneNumber}
                        onChange={(e) => setForm((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                        placeholder={t("placeholders.phoneNumber")}
                        required={submissionMode === "minimal"}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">{t("email")}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder={t("placeholders.email")}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Error Display */}
            {createError && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Error: {createError}</span>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              {submissionMode === "minimal" ? (
                                                  <Button
                  type="button"
                  onClick={handleSaveMinimal}
                  className="w-full"
                  disabled={isCreating || (!isLoggedIn && (!form.fullName || !form.phoneNumber))}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isCreating ? t("loading") : t("getTicketId")}
                </Button>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSaveMinimal}
                    className="flex-1 bg-transparent"
                    disabled={isCreating || (!isLoggedIn && (!form.fullName || !form.phoneNumber))}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isCreating ? t("loading") : t("saveDraftAndGetTicketId")}
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isCreating || !form.title || !form.description || !form.category}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {isCreating ? t("loading") : t("submit")}
                  </Button>
                </>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
