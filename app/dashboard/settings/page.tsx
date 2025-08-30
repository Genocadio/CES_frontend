"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { LanguageSwitcher } from "@/components/language-switcher"
import { UserMenu } from "@/components/user-menu"
import { useLanguage } from "@/hooks/use-language"
import { useAuth } from "@/hooks/use-auth"
import { ArrowLeft, Settings, Save, User, Bell, Globe } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage()
  const { user, isLoading, updateProfile } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    language: "rw",
    notifications: true,
    publicProfile: false,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    } else if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        language: user.preferences.language,
        notifications: user.preferences.notifications,
        publicProfile: user.preferences.publicProfile,
      })
    }
  }, [user, isLoading, router])

  const handleSave = async () => {
    if (!user) return

    setIsSaving(true)
    setSaveMessage("")

    const success = await updateProfile({
      ...user,
      name: formData.name,
      phone: formData.phone,
      preferences: {
        language: formData.language,
        notifications: formData.notifications,
        publicProfile: formData.publicProfile,
      },
    })

    if (success) {
      // Update app language if changed
      if (formData.language !== language) {
        setLanguage(formData.language as "rw" | "en" | "fr")
      }
      setSaveMessage("Settings saved successfully!")
    } else {
      setSaveMessage("Failed to save settings. Please try again.")
    }

    setIsSaving(false)
    setTimeout(() => setSaveMessage(""), 3000)
  }

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2 text-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Settings className="h-8 w-8" />
              Account Settings
            </h1>
            <p className="text-muted-foreground">Manage your account preferences and personal information</p>
          </div>

          <div className="space-y-6">
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">{t("fullName")} *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">{t("email")} *</Label>
                  <Input id="email" value={formData.email} disabled className="bg-muted" />
                  <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <Label htmlFor="phone">{t("phoneNumber")}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="+250 xxx xxx xxx"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Language & Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Language & Preferences
                </CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Preferred Language</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rw">Kinyarwanda</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="public-profile"
                    checked={formData.publicProfile}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, publicProfile: !!checked }))}
                  />
                  <Label htmlFor="public-profile">Make my profile public</Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  When enabled, your name will be visible on issues and comments you submit
                </p>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
                <CardDescription>Choose what updates you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="notifications"
                    checked={formData.notifications}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, notifications: !!checked }))}
                  />
                  <Label htmlFor="notifications">Email notifications</Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Receive updates about your issues and community discussions
                </p>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex items-center gap-4">
              <Button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
              {saveMessage && (
                <p className={`text-sm ${saveMessage.includes("success") ? "text-green-600" : "text-destructive"}`}>
                  {saveMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
