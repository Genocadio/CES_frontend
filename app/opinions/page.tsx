"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FloatingActionButton } from "@/components/floating-action-button"
import { SharedHeader } from "../components/shared-header"
import { useLanguage } from "@/hooks/use-language"
import { useFetchIssues } from "@/lib/hooks/use-fetch-issues"
import { Filter, MessageSquare, Eye, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"

export default function PublicOpinionsPage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")

  const {
    issues,
    isLoading,
    error,
    hasMore,
    searchIssues,
    loadMore,
    resetSearch,
    resetError
  } = useFetchIssues()

  // Debounce search term to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Perform search when filters change
  useEffect(() => {
    if (debouncedSearchTerm.trim() || statusFilter !== "all") {
      const query = buildSearchQuery(debouncedSearchTerm, statusFilter)
      searchIssues({
        query,
        page: 0,
        size: 20,
        sortBy: 'createdAt',
        sortDir: 'desc'
      })
    } else {
      // If no filters, search for all issues
      searchIssues({
        query: "",
        page: 0,
        size: 20,
        sortBy: 'createdAt',
        sortDir: 'desc'
      })
    }
  }, [debouncedSearchTerm, statusFilter, searchIssues])

  // Build search query combining search term and status filter
  const buildSearchQuery = (search: string, status: string) => {
    let query = search.trim()
    
    if (status !== "all") {
      query += query ? ` AND status:${status}` : `status:${status}`
    }
    
    return query || "*"
  }

  // Handle infinite scroll
  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1000) {
      if (hasMore && !isLoading) {
        loadMore()
      }
    }
  }, [hasMore, isLoading, loadMore])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "RECEIVED":
      case "INCOMPLETE":
        return "bg-blue-100 text-blue-800"
      case "IN_PROGRESS":
      case "ESCALATED":
      case "WAITING_FOR_USER_RESPONSE":
        return "bg-yellow-100 text-yellow-800"
      case "RESOLVED":
        return "bg-green-100 text-green-800"
      case "CLOSED":
      case "OVERDUE":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const statuses = [
    { value: "all", label: t("allStatuses") },
    { value: "INCOMPLETE", label: t("incomplete") },
    { value: "RECEIVED", label: t("received") },
    { value: "ESCALATED", label: t("escalated") },
    { value: "WAITING_FOR_USER_RESPONSE", label: t("waitingForUserResponse") },
    { value: "CLOSED", label: t("closed") },
    { value: "OVERDUE", label: t("overdue") },
    { value: "RESOLVED", label: t("resolved") },
    { value: "IN_PROGRESS", label: t("inProgress") },
  ]

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleStatusChange = (value: string) => {
    setStatusFilter(value)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    resetSearch()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <SharedHeader showHomeButton={true} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{t("publicOpinions")}</h1>
            <p className="text-muted-foreground">
              {t("browseCommunityIssues") || "Browse community issues and discussions. See what your neighbors are talking about and add your voice."}
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
                    placeholder={t("placeholders.search")}
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                <div>
                  <Select value={statusFilter} onValueChange={handleStatusChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("allStatuses")} />
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
                <div>
                  <Button 
                    variant="outline" 
                    onClick={clearFilters}
                    className="w-full"
                  >
                    {t("clearFilters")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>



          {/* Error Display */}
          {error && (
            <Card className="mb-6 border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-red-700">
                  <AlertCircle className="h-4 w-4" />
                  <p>{error}</p>
                  <Button variant="ghost" size="sm" onClick={resetError}>
                    {t("dismiss") || "Dismiss"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Issues List */}
          <div className="space-y-6">
            {issues.length === 0 && !isLoading ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground py-8">
                    {searchTerm || statusFilter !== "all" 
                      ? t("noIssuesFound")
                      : t("noIssuesAvailable")
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                {issues.map((issue) => (
                  <Card key={issue.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl">{issue.title}</CardTitle>
                          <CardDescription className="mt-2 text-base">{issue.description}</CardDescription>
                        </div>
                        <Badge className={getStatusColor(issue.status)}>
                          {t(issue.status.toLowerCase()) || issue.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                                             <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center gap-4 text-sm text-muted-foreground">
                           <span>{t("ticketId")}: {issue.ticketId}</span>
                           <span>{t("priority")}: {t(issue.urgency?.toLowerCase()) || issue.urgency}</span>
                           <span>{t("submitted")}: {new Date(issue.createdAt).toLocaleDateString()}</span>
                         </div>
                       </div>

                      {/* Comments Preview */}
                      {issue.comments && issue.comments.length > 0 && (
                        <div className="border-t pt-4">
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            {t("communityComments")} ({issue.comments.length})
                          </h4>
                          <div className="space-y-3">
                            {issue.comments.slice(0, 2).map((comment) => (
                              <div key={comment.id} className="border-l-4 border-primary pl-4">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-sm">
                                    {comment.author.firstName} {comment.author.lastName}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-sm text-foreground">{comment.text}</p>
                              </div>
                            ))}
                            {issue.comments.length > 2 && (
                              <p className="text-sm text-muted-foreground">
                                +{issue.comments.length - 2} {t("moreComments")}
                              </p>
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
                ))}

                {/* Load More Button */}
                {hasMore && (
                  <div className="text-center py-4">
                    <Button 
                      onClick={loadMore} 
                      disabled={isLoading}
                      variant="outline"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          {t("loading")}
                        </>
                      ) : (
                        t("loadMoreIssues")
                      )}
                    </Button>
                  </div>
                )}

                {/* Loading Indicator */}
                {isLoading && issues.length === 0 && (
                  <div className="text-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                    <p className="text-muted-foreground">{t("searchingForIssues")}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <FloatingActionButton />
    </div>
  )
}
