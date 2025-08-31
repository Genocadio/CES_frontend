"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SharedHeader } from "@/app/components/shared-header"
import { useLanguage } from "@/hooks/use-language"
import { useAnnouncements } from "@/lib/hooks/use-announcements"
import { AttachmentType } from "@/lib/types/announcements"
import {
  FileText,
  Calendar,
  Download,
  Play,
  ImageIcon,
  AlertCircle,
  Info,
  Zap,
  ChevronDown,
  ChevronUp,
  Eye,
} from "lucide-react"
import { useState } from "react"

export default function AnnouncementsPage() {
  const { t } = useLanguage()
  const [expandedAnnouncements, setExpandedAnnouncements] = useState<Set<number>>(new Set())
  
  const {
    announcements,
    isLoading,
    error,
    totalPages,
    currentPage,
    markAsRead,
    nextPage,
    previousPage,
    hasNext,
    hasPrevious,
    goToPage,
  } = useAnnouncements()

  const toggleExpanded = (announcementId: number) => {
    setExpandedAnnouncements(prev => {
      const newSet = new Set(prev)
      if (newSet.has(announcementId)) {
        newSet.delete(announcementId)
      } else {
        newSet.add(announcementId)
        // Mark as read when expanding
        markAsRead(announcementId)
      }
      return newSet
    })
  }

  const isExpanded = (announcementId: number) => expandedAnnouncements.has(announcementId)

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Zap className="h-4 w-4 text-red-500" />
      case "high":
        return <AlertCircle className="h-4 w-4 text-orange-500" />
      case "medium":
        return <Info className="h-4 w-4 text-blue-500" />
      default:
        return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "policy":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "infrastructure":
        return "bg-green-100 text-green-800 border-green-200"
      case "health":
        return "bg-red-100 text-red-800 border-red-200"
      case "education":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "emergency":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getAttachmentIcon = (type: AttachmentType) => {
    switch (type) {
      case AttachmentType.DOCUMENT:
        return <FileText className="h-5 w-5 text-blue-500" />
      case AttachmentType.VIDEO:
        return <Play className="h-5 w-5 text-red-500" />
      case AttachmentType.IMAGE:
        return <ImageIcon className="h-5 w-5 text-green-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const getAttachmentActionText = (type: AttachmentType) => {
    switch (type) {
      case AttachmentType.VIDEO:
        return t("watchVideo")
      case AttachmentType.IMAGE:
        return t("viewImage")
      default:
        return t("downloadAttachment")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <SharedHeader showHomeButton={true} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">{t("loadingAnnouncements")}</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <SharedHeader showHomeButton={true} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">{t("errorLoadingAnnouncements")}</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>{t("tryAgain")}</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader showHomeButton={true} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">{t("governmentAnnouncements")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{t("announcementsDescription")}</p>
        </div>



        {/* Announcements List */}
        <div className="space-y-6">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getPriorityIcon(announcement.priority || "medium")}
                      <Badge className={getPriorityColor(announcement.priority || "medium")}>
                        {(announcement.priority || "medium").toUpperCase()}
                      </Badge>
                      <Badge className={getCategoryColor(announcement.category || "general")}>
                        {(announcement.category || "general").toUpperCase()}
                      </Badge>
                      {announcement.hasViewed && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {t("read")}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl mb-2">{announcement.title}</CardTitle>
                    <CardDescription className="text-base">{announcement.description}</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(announcement.id)}
                    className="ml-auto"
                  >
                    {isExpanded(announcement.id) ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </Button>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(announcement.createdAt)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {announcement.viewCount} {t("views")}
                  </div>
                  {announcement.endTime && (
                    <div className="flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {t("expires")} {formatDate(announcement.endTime)}
                    </div>
                  )}
                </div>
              </CardHeader>

              {/* Expanded Content */}
              {isExpanded(announcement.id) && (
                <CardContent>
                  <div className="border-t pt-4">
                    <div className="mb-4">
                      <h4 className="font-medium text-foreground mb-2">{t("fullContent")}</h4>
                      <p className="text-muted-foreground leading-relaxed">{announcement.description}</p>
                    </div>

                    {/* Attachments */}
                    {announcement.attachments && announcement.attachments.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium text-foreground">{t("attachmentsLabel")}</h4>
                        <div className="grid gap-2">
                          {announcement.attachments.map((attachment) => (
                            <div key={attachment.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                              <div className="flex items-center gap-3">
                                {getAttachmentIcon(attachment.type)}
                                <div>
                                  <p className="font-medium text-sm">{attachment.description}</p>
                                </div>
                              </div>
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4 mr-2" />
                                {getAttachmentActionText(attachment.type)}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Additional Details */}
                    <div className="mt-4 pt-4 border-t">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-foreground">{t("languageLabel")}</span>
                          <span className="ml-2 text-muted-foreground">{announcement.language}</span>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">{t("statusLabel")}</span>
                          <span className="ml-2 text-muted-foreground">
                            {announcement.active ? t("active") : t("inactive")}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">{t("createdLabel")}</span>
                          <span className="ml-2 text-muted-foreground">{formatDate(announcement.createdAt)}</span>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">{t("updatedLabel")}</span>
                          <span className="ml-2 text-muted-foreground">{formatDate(announcement.updatedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              variant="outline"
              onClick={previousPage}
              disabled={!hasPrevious}
            >
              {t("previous")}
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(0, Math.min(totalPages - 1, currentPage - 2 + i))
                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToPage(pageNum)}
                  >
                    {pageNum + 1}
                  </Button>
                )
              })}
            </div>
            
            <Button
              variant="outline"
              onClick={nextPage}
              disabled={!hasNext}
            >
              {t("next")}
            </Button>
          </div>
        )}

        {announcements.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("noAnnouncementsFound")}</p>
          </div>
        )}
      </main>
    </div>
  )
}

