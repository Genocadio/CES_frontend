"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/hooks/use-auth"
import { useLanguage } from "@/hooks/use-language"
import { Settings, LogOut, FileText, MessageSquare } from "lucide-react"
import Link from "next/link"

export function UserMenu() {
  const { user, logout } = useAuth()
  const { t } = useLanguage()

  if (!user) {
    return (
      <div className="flex gap-2">
        <Link href="/auth/login">
          <button className="px-3 py-2 text-sm border border-input bg-transparent hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
            {t("login")}
          </button>
        </Link>
        <Link href="/auth/register">
          <button className="px-3 py-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors">
            {t("register")}
          </button>
        </Link>
      </div>
    )
  }

  // Generate fallback initials for avatar
  const getFallback = () => {
    if (user.firstName && user.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
    } else if (user.firstName) {
      return user.firstName.charAt(0)
    }
    return "U"
  }

  // Get display name
  const getDisplayName = () => {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`
    } else if (user.firstName) {
      return user.firstName
    }
    return user.phoneNumber
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity">
          <AvatarImage src={user.profileUrl || undefined} alt={getDisplayName()} />
          <AvatarFallback className="text-xs">{getFallback()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">{getDisplayName()}</p>
          {user.email && (
            <p className="text-xs text-muted-foreground">{user.email}</p>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            {t("dashboard")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/opinions" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            {t("opinions")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            {t("settings")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="flex items-center gap-2 text-destructive">
          <LogOut className="h-4 w-4" />
          {t("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
