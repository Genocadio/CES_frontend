"use client"


import { LanguageSwitcher } from "@/components/language-switcher"
import { UserMenu } from "@/components/user-menu"
import { useLanguage } from "@/hooks/use-language"

import { FileText, Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SharedHeaderProps {
  showHomeButton?: boolean
}

export function SharedHeader({ showHomeButton = false }: SharedHeaderProps) {
  const { t } = useLanguage()
  const pathname = usePathname()
  
  // Show home button if explicitly requested or if not on home page
  const shouldShowHomeButton = showHomeButton || pathname !== "/"

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {shouldShowHomeButton ? (
              <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary">
                <Home className="h-5 w-5" />
              </Link>
            ) : (
              <>
                <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">{t("welcomeTitle")}</h1>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
