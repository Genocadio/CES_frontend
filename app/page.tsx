"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { useLanguage } from "@/hooks/use-language"
import { useAuth } from "@/hooks/use-auth"
import { MessageSquare, Search, Plus, Megaphone, FileText } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { SharedHeader } from "./components/shared-header"

export default function HomePage() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [ticketId, setTicketId] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
            {user ? `Welcome back, ${user.name}!` : t("welcomeTitle")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{t("welcomeSubtitle")}</p>
        </div>

        {/* User-specific Quick Actions */}
        {user && (
          <div className="mb-8">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle>Your Account</CardTitle>
                <CardDescription>Quick access to your issues and account settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      My Issues
                    </Button>
                  </Link>
                  <Link href="/dashboard/settings">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Settings
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Submit New Issue */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                {t("submitIssue")}
              </CardTitle>
              <CardDescription>{t("issueDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/submit">
                <Button className="w-full" size="lg">
                  {t("submitIssue")}
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Follow Up Existing Issue */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                {t("followUp")}
              </CardTitle>
              <CardDescription>{t("enterTicketId")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder={t("placeholders.ticketId")}
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
              />
              <Link href={`/followup${ticketId ? `?id=${ticketId}` : ""}`}>
                <Button className="w-full bg-transparent" variant="outline" size="lg">
                  {t("checkStatus")}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageSquare className="h-5 w-5 text-primary" />
                {t("publicOpinions")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                View community discussions and public feedback on various issues
              </p>
              <Link href="/opinions">
                <Button variant="outline" className="w-full bg-transparent">
                  {t("view")}
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Government Announcements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Megaphone className="h-5 w-5 text-primary" />
                {t("governmentAnnouncements")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{t("announcementsDescription")}</p>
              <Link href="/announcements">
                <Button variant="outline" className="w-full bg-transparent">
                  {t("viewAnnouncements")}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-card rounded-lg border">
            <div className="text-2xl font-bold text-primary">1,247</div>
            <div className="text-sm text-muted-foreground">Issues Submitted</div>
          </div>
          <div className="text-center p-4 bg-card rounded-lg border">
            <div className="text-2xl font-bold text-green-600">892</div>
            <div className="text-sm text-muted-foreground">Issues Resolved</div>
          </div>
          <div className="text-center p-4 bg-card rounded-lg border">
            <div className="text-2xl font-bold text-yellow-600">234</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </div>
          <div className="text-center p-4 bg-card rounded-lg border">
            <div className="text-2xl font-bold text-blue-600">121</div>
            <div className="text-sm text-muted-foreground">Pending Review</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>© 2024 Republic of Rwanda - Citizen Issue Platform</p>
            <p className="text-sm mt-2">Helping build a better community together</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
