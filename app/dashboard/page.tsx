"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SharedHeader } from "../components/shared-header"
import { useLanguage } from "@/hooks/use-language"
import { useAuth } from "@/lib/hooks/use-auth"
import { useUserIssues } from "@/lib/hooks/use-user-issues"
import { FileText, Plus, Eye, MessageSquare, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const { t } = useLanguage()
  const { user, isLoading: authLoading } = useAuth()
  const { issues, isLoading: issuesLoading, error: issuesError } = useUserIssues()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, authLoading, router])

  if (authLoading || issuesLoading) {
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

  // Calculate counts for different statuses
  const totalIssues = issues.length
  const inProgressIssues = issues.filter(issue => issue.status === "in-progress" || issue.status === "inProgress").length
  const resolvedIssues = issues.filter(issue => issue.status === "resolved").length
  const totalComments = issues.reduce((total, issue) => total + (issue.comments?.length || 0), 0)

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "received":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
      case "inprogress":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      case "incomplete":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case "received":
        return t("received")
      case "in-progress":
      case "inprogress":
        return t("inProgress")
      case "resolved":
        return t("resolved")
      case "closed":
        return t("closed")
      case "incomplete":
        return t("incomplete")
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <SharedHeader showHomeButton={true} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t("welcomeMessage").replace("{firstName}", user.firstName)}
            </h1>
            <p className="text-muted-foreground">{t("dashboardDescription")}</p>
          </div>

          {/* Error Display */}
          {issuesError && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-md">
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">{t("errorLoadingIssues")}</span>
                <span>{issuesError}</span>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-2xl font-bold">{totalIssues}</div>
                    <div className="text-sm text-muted-foreground">{t("totalIssues")}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-yellow-500" />
                  <div>
                    <div className="text-2xl font-bold">{inProgressIssues}</div>
                    <div className="text-sm text-muted-foreground">{t("inProgress")}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-green-500" />
                  <div>
                    <div className="text-2xl font-bold">{resolvedIssues}</div>
                    <div className="text-sm text-muted-foreground">{t("resolved")}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold">{totalComments}</div>
                    <div className="text-sm text-muted-foreground">{t("comments")}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-primary" />
                  {t("submitNewIssue")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/submit">
                  <Button className="w-full">{t("submitIssue")}</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  {t("viewOpinions")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/opinions">
                  <Button variant="outline" className="w-full bg-transparent">
                    {t("viewOpinions")}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  {t("accountSettings")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard/settings">
                  <Button variant="outline" className="w-full bg-transparent">
                    {t("settings")}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* My Issues */}
          <Card>
            <CardHeader>
              <CardTitle>{t("myIssues")}</CardTitle>
              <CardDescription>{t("myIssuesDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              {totalIssues === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{t("noIssuesYet")}</h3>
                  <p className="text-muted-foreground mb-4">{t("noIssuesDescription")}</p>
                  <Link href="/submit">
                    <Button>{t("submitFirstIssue")}</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {issues.map((issue) => (
                    <div key={issue.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg">{issue.title}</h3>
                        <Badge className={getStatusColor(issue.status)}>
                          {getStatusLabel(issue.status)}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3 line-clamp-2">{issue.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{t("issueId")} {issue.ticketId}</span>
                          <span>{t("issueCategory")} {issue.category}</span>
                          <span>{t("issueSubmitted")} {new Date(issue.createdAt).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            {issue.comments?.length || 0}
                          </span>
                        </div>
                        <Link href={`/followup?id=${issue.ticketId}`}>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            <Eye className="h-4 w-4 mr-2" />
                            {t("viewDetails")}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
