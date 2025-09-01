import React, { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, User, X } from 'lucide-react'
import { useSearchLeaders, LeaderSearchResponseDto, DepartmentResponseDto } from '@/lib/hooks/use-search-leaders'
import { useLanguage } from '@/hooks/use-language'

interface LeaderSearchProps {
  onLeaderSelect: (leader: LeaderSearchResponseDto) => void
  selectedLeader: LeaderSearchResponseDto | null
  onClearSelection: () => void
  placeholder?: string
  value?: string
}

export function LeaderSearch({ 
  onLeaderSelect, 
  selectedLeader, 
  onClearSelection,
  placeholder,
  value
}: LeaderSearchProps) {
  const { t, language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState(value || '')
  const [isOpen, setIsOpen] = useState(false)
  const { leaders, isLoading, searchLeaders, clearLeaders } = useSearchLeaders()
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Helper function to get localized department name
  const getLocalizedDepartmentName = (department: DepartmentResponseDto | null | undefined) => {
    if (!department) {
      return t("noDepartment")
    }
    
    switch (language) {
      case 'rw':
        return department.nameRw || department.nameEn || t("noDepartment")
      case 'fr':
        return department.nameFr || department.nameEn || t("noDepartment")
      case 'en':
      default:
        return department.nameEn || t("noDepartment")
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        clearLeaders()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [clearLeaders])

  useEffect(() => {
    // Don't search if a leader is already selected
    if (selectedLeader) {
      return
    }

    if (searchTerm.trim()) {
      const timeoutId = setTimeout(() => {
        searchLeaders(searchTerm)
        setIsOpen(true)
      }, 300)

      return () => clearTimeout(timeoutId)
    } else {
      clearLeaders()
      setIsOpen(false)
    }
  }, [searchTerm, searchLeaders, clearLeaders, selectedLeader])

  const handleLeaderSelect = (leader: LeaderSearchResponseDto) => {
    onLeaderSelect(leader)
    setSearchTerm('')
    setIsOpen(false)
    clearLeaders()
    // Focus the clear button for better UX
    setTimeout(() => {
      const clearButton = document.querySelector('[data-testid="clear-leader"]') as HTMLButtonElement
      if (clearButton) {
        clearButton.focus()
      }
    }, 100)
  }

  const handleClearSelection = () => {
    onClearSelection()
    setSearchTerm('')
    setIsOpen(false)
    clearLeaders()
  }

  const handleInputFocus = () => {
    // Don't open dropdown if a leader is already selected
    if (selectedLeader) {
      return
    }
    
    if (searchTerm.trim() && leaders.length > 0) {
      setIsOpen(true)
    }
  }

  return (
    <div className="relative" ref={searchRef}>
      {!selectedLeader ? (
        // Show search box when no leader is selected
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="text"
              placeholder={placeholder || t("searchLeaderByName")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={handleInputFocus}
              className="pl-10 pr-4"
            />
          </div>
        </div>
      ) : (
        // Show selected leader with clear button when leader is selected
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClearSelection}
            className="px-2"
            data-testid="clear-leader"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Selected Leader Display */}
      {selectedLeader && (
        <div className="mt-2 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-primary">{selectedLeader.fullName}</p>
              <p className="text-xs text-muted-foreground">
                {selectedLeader.leadershipPlaceName} • {getLocalizedDepartmentName(selectedLeader.department)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search Results Dropdown - Only show when no leader is selected */}
      {!selectedLeader && isOpen && (leaders.length > 0 || isLoading) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              {t("searching")}...
            </div>
          ) : (
            <div className="py-1">
              {leaders.map((leader) => (
                <button
                  key={leader.userId}
                  type="button"
                  onClick={() => handleLeaderSelect(leader)}
                  className="w-full px-4 py-2 text-left hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{leader.fullName}</p>
                      <p className="text-xs text-muted-foreground">
                        {leader.leadershipPlaceName} • {getLocalizedDepartmentName(leader.department)}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* No Results - Only show when no leader is selected */}
      {!selectedLeader && isOpen && !isLoading && searchTerm.trim() && leaders.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50">
          <div className="p-4 text-center text-sm text-muted-foreground">
            {t("noLeadersFound")}
          </div>
        </div>
      )}
    </div>
  )
}
