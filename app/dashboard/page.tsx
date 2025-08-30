"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LanguageSwitcher } from "@/components/language-switcher"
import { UserMenu } from "@/components/user-menu"
import { useLanguage } from "@/hooks/use-language"
import { useAuth } from "@/hooks/use-auth"
import { ArrowLeft, FileText, Plus, Eye, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { dummyIssues } from "@/lib/dummy-data"

export default function DashboardPage() {
  const { t } = useLanguage()
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Filter issues by user (mock - in real app this would be from API)
  const userIssues = dummyIssues.filter((issue) => issue.submittedBy.email === user.email)

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
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
              {t("back")}
            </Link>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, {user.name}!</h1>
            <p className="text-muted-foreground">Manage your submitted issues and track their progress</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-2xl font-bold">{userIssues.length}</div>
                    <div className="text-sm text-muted-foreground">Total Issues</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-yellow-500" />
                  <div>
                    <div className="text-2xl font-bold">
                      {userIssues.filter((i) => i.status === "in-progress").length}
                    </div>
                    <div className="text-sm text-muted-foreground">In Progress</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-green-500" />
                  <div>
                    <div className="text-2xl font-bold">{userIssues.filter((i) => i.status === "resolved").length}</div>
                    <div className="text-sm text-muted-foreground">Resolved</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold">
                      {userIssues.reduce((total, issue) => total + issue.comments.length, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Comments</div>
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
                  Submit New Issue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/submit">
                  <Button className="w-full">Submit Issue</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  My Opinions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard/opinions">
                  <Button variant="outline" className="w-full bg-transparent">
                    View Opinions
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard/settings">
                  <Button variant="outline" className="w-full bg-transparent">
                    Settings
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* My Issues */}
          <Card>
            <CardHeader>
              <CardTitle>My Issues</CardTitle>
              <CardDescription>Issues you have submitted and their current status</CardDescription>
            </CardHeader>
            <CardContent>
              {userIssues.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Issues Yet</h3>
                  <p className="text-muted-foreground mb-4">You haven&apos;t submitted any issues yet.</p>
                  <Link href="/submit">
                    <Button>Submit Your First Issue</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {userIssues.map((issue) => (
                    <div key={issue.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg">{issue.title}</h3>
                        <Badge className={getStatusColor(issue.status)}>{t(issue.status)}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{issue.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>ID: {issue.ticketId}</span>
                          <span>Category: {t(issue.category)}</span>
                          <span>Submitted: {issue.createdAt.toLocaleDateString()}</span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            {issue.comments.length}
                          </span>
                        </div>
                        <Link href={`/followup?id=${issue.ticketId}`}>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
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
