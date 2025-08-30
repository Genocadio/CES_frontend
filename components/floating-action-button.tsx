"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export function FloatingActionButton() {
  const { t } = useLanguage()
  const [showIconOnly, setShowIconOnly] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowIconOnly(window.scrollY > 200)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Link href="/submit">
        <Button
          size="lg"
          className={`${
            showIconOnly ? "h-14 w-14 rounded-full" : "h-14 px-6 rounded-full flex items-center gap-2"
          } shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90`}
        >
          <Plus className="h-5 w-5" />
          {!showIconOnly && <span className="font-medium">{t("submitNewIssue")}</span>}
        </Button>
      </Link>
    </div>
  )
}
