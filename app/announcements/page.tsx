"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LanguageSwitcher } from "@/components/language-switcher"
import { UserMenu } from "@/components/user-menu"
import { useLanguage } from "@/hooks/use-language"
import { getActiveAnnouncements, type Announcement } from "@/lib/dummy-data"
import {
  FileText,
  ArrowLeft,
  Calendar,
  Download,
  Play,
  ImageIcon,
  Building2,
  AlertCircle,
  Info,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function AnnouncementsPage() {
  const { t } = useLanguage()
  const [announcements] = useState<Announcement[]>(getActiveAnnouncements())
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredAnnouncements =
    selectedCategory === "all" ? announcements : announcements.filter((ann) => ann.category === selectedCategory)

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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {t("back")}
                </Button>
              </Link>
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">{t("governmentAnnouncements")}</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">{t("governmentAnnouncements")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{t("announcementsDescription")}</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
          >
            All Categories
          </Button>
          <Button
            variant={selectedCategory === "policy" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("policy")}
          >
            Policy
          </Button>
          <Button
            variant={selectedCategory === "infrastructure" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("infrastructure")}
          >
            Infrastructure
          </Button>
          <Button
            variant={selectedCategory === "health" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("health")}
          >
            Health
          </Button>
          <Button
            variant={selectedCategory === "education" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("education")}
          >
            Education
          </Button>
        </div>

        {/* Announcements List */}
        <div className="space-y-6">
          {filteredAnnouncements.map((announcement) => (
            <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getPriorityIcon(announcement.priority)}
                      <Badge className={getPriorityColor(announcement.priority)}>
                        {announcement.priority.toUpperCase()}
                      </Badge>
                      <Badge className={getCategoryColor(announcement.category)}>
                        {announcement.category.toUpperCase()}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{announcement.title}</CardTitle>
                    <CardDescription className="text-base">{announcement.description}</CardDescription>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(announcement.publishedAt)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {announcement.author.name}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">{announcement.content}</p>

                {/* Attachments */}
                {announcement.attachments.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Attachments:</h4>
                    <div className="grid gap-2">
                      {announcement.attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-3">
                            {attachment.type === "document" && <FileText className="h-5 w-5 text-blue-500" />}
                            {attachment.type === "video" && <Play className="h-5 w-5 text-red-500" />}
                            {attachment.type === "image" && <ImageIcon className="h-5 w-5 text-green-500" />}
                            <div>
                              <p className="font-medium text-sm">{attachment.name}</p>
                              {attachment.size && <p className="text-xs text-muted-foreground">{attachment.size}</p>}
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            {attachment.type === "video"
                              ? t("watchVideo")
                              : attachment.type === "image"
                                ? t("viewImage")
                                : t("downloadAttachment")}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No announcements found for the selected category.</p>
          </div>
        )}
      </main>
    </div>
  )
}
