"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LanguageSwitcher } from "@/components/language-switcher"
import { FloatingActionButton } from "@/components/floating-action-button"
import { useLanguage } from "@/hooks/use-language"
import { ArrowLeft, Filter, MessageSquare, Eye } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { dummyIssues } from "@/lib/dummy-data"

export default function PublicOpinionsPage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredIssues = dummyIssues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || issue.category === categoryFilter
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

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

  const categories = [
    { value: "all", label: t("allCategories") },
    { value: "infrastructure", label: t("infrastructure") },
    { value: "healthcare", label: t("healthcare") },
    { value: "education", label: t("education") },
    { value: "security", label: t("security") },
    { value: "environment", label: t("environment") },
    { value: "other", label: t("other") },
  ]

  const statuses = [
    { value: "all", label: t("allStatuses") },
    { value: "received", label: t("received") },
    { value: "in-progress", label: t("inProgress") },
    { value: "resolved", label: t("resolved") },
    { value: "closed", label: t("closed") },
  ]

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
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{t("publicOpinions")}</h1>
            <p className="text-muted-foreground">
              Browse community issues and discussions. See what your neighbors are talking about and add your voice.
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                {t("filterIssues")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Input
                    placeholder={t("placeholders.search") || "Search issues..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue />
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
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Issues List */}
          <div className="space-y-6">
            {filteredIssues.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground py-8">{t("noIssuesFound")}</p>
                </CardContent>
              </Card>
            ) : (
              filteredIssues.map((issue) => (
                <Card key={issue.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl">{issue.title}</CardTitle>
                        <CardDescription className="mt-2 text-base">{issue.description}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(issue.status)}>{t(issue.status)}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>ID: {issue.ticketId}</span>
                        <span>Category: {t(issue.category)}</span>
                        <span>Priority: {t(issue.priority)}</span>
                        <span>Submitted: {issue.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Comments Preview */}
                    {issue.comments.length > 0 && (
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          {t("communityComments")} ({issue.comments.length})
                        </h4>
                        <div className="space-y-3">
                          {issue.comments.slice(0, 2).map((comment) => (
                            <div key={comment.id} className="border-l-4 border-primary pl-4">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm">{comment.author}</span>
                                <span className="text-xs text-muted-foreground">
                                  {comment.createdAt.toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-foreground">{comment.text}</p>
                            </div>
                          ))}
                          {issue.comments.length > 2 && (
                            <p className="text-sm text-muted-foreground">+{issue.comments.length - 2} more comments</p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 mt-4">
                      <Link href={`/followup?id=${issue.ticketId}`}>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Eye className="h-4 w-4 mr-2" />
                          {t("viewDetails")}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      <FloatingActionButton />
    </div>
  )
}
