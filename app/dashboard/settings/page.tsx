"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/hooks/use-language"
import { useAuth } from "@/lib/hooks/use-auth"
import { useProfileCompletion } from "@/lib/hooks/use-profile-completion"
import { useCloudinaryUpload } from "@/lib/hooks/use-cloudinary-upload"
import { SharedHeader } from "@/app/components/shared-header"
import { ArrowLeft, Settings, Save, User, Bell, Globe, MapPin, Upload, Camera } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage()
  const { user, isLoading, updateProfile } = useAuth()
  const { completeProfile, isLoading: completingProfile, error: profileError, resetError } = useProfileCompletion()
  
  // Cloudinary upload configuration for profile photos
  const cloudinaryConfig = {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo',
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'ml_default',
    folder: 'profile-photos',
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedFormats: ['jpg', 'jpeg', 'png', 'gif'],
    maxFiles: 1
  }
  
  const { uploadFile, isUploading: uploadingPhoto, progress: uploadProgress } = useCloudinaryUpload(cloudinaryConfig)
  
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    language: "rw",
    notifications: true,
    publicProfile: false,
  })
  const [profileCompletionData, setProfileCompletionData] = useState({
    profileUrl: "",
    location: {
      district: "",
      sector: "",
      cell: "",
      village: "",
    }
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    } else if (user) {
      setFormData({
        name: `${user.firstName} ${user.lastName}`.trim(),
        email: user.email || "",
        phone: user.phoneNumber || "",
        language: user.preferences?.language || "rw",
        notifications: user.preferences?.notifications || true,
        publicProfile: user.preferences?.publicProfile || false,
      })
      
      if (user.location) {
        setProfileCompletionData(prev => ({
          ...prev,
          location: {
            district: user.location?.district || "",
            sector: user.location?.sector || "",
            cell: user.location?.cell || "",
            village: user.location?.village || "",
          }
        }))
      }
      
      if (user.profileUrl) {
        setProfileCompletionData(prev => ({
          ...prev,
          profileUrl: user.profileUrl || ""
        }))
      }
    }
  }, [user, isLoading, router])

  const handleSave = async () => {
    if (!user) return

    setIsSaving(true)
    setSaveMessage("")

    const success = await updateProfile({
      ...user,
      firstName: formData.name.split(" ")[0] || "",
      lastName: formData.name.split(" ").slice(1).join(" ") || "",
      phoneNumber: formData.phone,
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
      setSaveMessage(t("settingsSaved"))
    } else {
      setSaveMessage(t("settingsSaveFailed"))
    }

    setIsSaving(false)
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const result = await uploadFile(file)
    if (result.success && result.data) {
      setProfileCompletionData(prev => ({
        ...prev,
        profileUrl: result.data!.url
      }))
      setSaveMessage(t("photoUploadSuccess"))
      setTimeout(() => setSaveMessage(""), 3000)
    } else {
      setSaveMessage(result.error || t("photoUploadFailed"))
      setTimeout(() => setSaveMessage(""), 3000)
    }
  }

  const handleCompleteProfile = async () => {
    if (!user) return

    resetError()
    
    const success = await completeProfile(user.id, {
      profileUrl: profileCompletionData.profileUrl,
      level: "", // Leave level empty as requested
      location: profileCompletionData.location
    })

    if (success) {
      setSaveMessage(t("settingsSaved"))
      // Refresh user data or update local state
      setTimeout(() => setSaveMessage(""), 3000)
    }
  }

  // Check if user has complete location information
  const hasCompleteLocation = user?.location?.district && 
                             user?.location?.sector && 
                             user?.location?.cell && 
                             user?.location?.village

  if (isLoading) {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <SharedHeader showHomeButton={false} />
      
      {/* Back to Dashboard Button */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/dashboard" className="flex items-center gap-2 text-foreground hover:text-primary w-fit">
          <ArrowLeft className="h-4 w-4" />
          {t("backToDashboard")}
        </Link>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Settings className="h-8 w-8" />
              {t("accountSettings")}
            </h1>
            <p className="text-muted-foreground">{t("manageAccountDescription")}</p>
          </div>

          <div className="space-y-6">
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {t("profileInformation")}
                </CardTitle>
                <CardDescription>{t("profileDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">{t("fullName")}</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground mt-1">{t("nameCannotBeChanged")}</p>
                </div>

                <div>
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input id="email" value={formData.email} disabled className="bg-muted" />
                  <p className="text-xs text-muted-foreground mt-1">{t("emailCannotBeChanged")}</p>
                </div>

                <div>
                  <Label htmlFor="phone">{t("phoneNumber")}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground mt-1">{t("phoneCannotBeChanged")}</p>
                </div>
              </CardContent>
            </Card>

            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {t("profileCompletion")}
                </CardTitle>
                <CardDescription>{t("profileCompletionDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="profilePhoto">{t("profilePhoto")}</Label>
                  <div className="flex items-center gap-4">
                    {profileCompletionData.profileUrl ? (
                      <div className="relative">
                        <Image 
                          src={profileCompletionData.profileUrl} 
                          alt="Profile" 
                          width={80}
                          height={80}
                          className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => setProfileCompletionData(prev => ({ ...prev, profileUrl: "" }))}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center bg-gray-50">
                        <Camera className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <input
                        id="profilePhoto"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="profilePhoto"
                        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
                      >
                        <Camera className="h-4 w-4" />
                        {uploadingPhoto ? t("uploading") : t("uploadPhoto")}
                      </label>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t("photoFormatInfo")}
                      </p>
                    </div>
                  </div>
                  
                  {uploadingPhoto && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="district">{t("district")}</Label>
                    <Input
                      id="district"
                      value={profileCompletionData.location.district}
                      onChange={(e) => setProfileCompletionData(prev => ({ 
                        ...prev, 
                        location: { ...prev.location, district: e.target.value }
                      }))}
                      placeholder={t("district")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sector">{t("sector")}</Label>
                    <Input
                      id="sector"
                      value={profileCompletionData.location.sector}
                      onChange={(e) => setProfileCompletionData(prev => ({ 
                        ...prev, 
                        location: { ...prev.location, sector: e.target.value }
                      }))}
                      placeholder={t("sector")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cell">{t("cell")}</Label>
                    <Input
                      id="cell"
                      value={profileCompletionData.location.cell}
                      onChange={(e) => setProfileCompletionData(prev => ({ 
                        ...prev, 
                        location: { ...prev.location, cell: e.target.value }
                      }))}
                      placeholder={t("cell")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="village">{t("village")}</Label>
                    <Input
                      id="village"
                      value={profileCompletionData.location.village}
                      onChange={(e) => setProfileCompletionData(prev => ({ 
                        ...prev, 
                        location: { ...prev.location, village: e.target.value }
                      }))}
                      placeholder={t("village")}
                    />
                  </div>
                </div>

                {!hasCompleteLocation && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800 text-sm">
                      {t("completeLocationMessage")}
                    </p>
                  </div>
                )}

                <Button 
                  onClick={handleCompleteProfile} 
                  disabled={completingProfile}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {completingProfile ? t("updatingProfile") : t("updateProfile")}
                </Button>

                {profileError && (
                  <p className="text-sm text-destructive">{profileError}</p>
                )}
              </CardContent>
            </Card>

            {/* Language & Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  {t("languagePreferences")}
                </CardTitle>
                <CardDescription>{t("customizeExperience")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>{t("preferredLanguage")}</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rw">{t("kinyarwanda")}</SelectItem>
                      <SelectItem value="en">{t("english")}</SelectItem>
                      <SelectItem value="fr">{t("french")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="public-profile"
                    checked={formData.publicProfile}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, publicProfile: !!checked }))}
                  />
                  <Label htmlFor="public-profile">{t("makeProfilePublic")}</Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("publicProfileDescription")}
                </p>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  {t("notifications")}
                </CardTitle>
                <CardDescription>{t("chooseUpdates")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="notifications"
                    checked={formData.notifications}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, notifications: !!checked }))}
                  />
                  <Label htmlFor="notifications">{t("emailNotifications")}</Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("notificationsDescription")}
                </p>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex items-center gap-4">
              <Button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                {isSaving ? t("saving") : t("saveChanges")}
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
