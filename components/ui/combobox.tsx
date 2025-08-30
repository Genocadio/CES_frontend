"use client"

import { Check, ChevronsUpDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect, useRef, useCallback } from "react"

interface ComboboxProps {
  options: Array<{ value: string; label: string; id?: number }>
  value?: string
  onValueChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  typeSomethingText?: string
  disabled?: boolean
  className?: string
  onSearch?: (query: string) => void
  isLoading?: boolean
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  typeSomethingText = "Type something to search...",
  disabled = false,
  className,
  onSearch,
  isLoading = false,
}: ComboboxProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [inputValue, setInputValue] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((option) => option.value === value)

  // Update input value when selection changes, but only if user isn't actively typing
  useEffect(() => {
    if (selectedOption && !searchQuery) {
      setInputValue(selectedOption.label)
    }
  }, [selectedOption, searchQuery])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    if (onSearch) {
      onSearch(query)
    }
  }, [onSearch])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    
    // Always open dropdown when typing or when input is empty
    if (newValue.trim()) {
      setOpen(true)
      handleSearch(newValue)
    } else {
      setOpen(true)
      handleSearch("") // Query with empty string to show all options
      // Clear selection if user clears the input
      if (value) {
        onValueChange("")
      }
    }
  }

  const handleInputFocus = () => {
    setOpen(true)
    // If input is empty, show all options; otherwise search with current text
    if (inputValue.trim()) {
      handleSearch(inputValue)
    } else {
      handleSearch("") // Show all available options
    }
  }

  const handleInputClick = () => {
    setOpen(true)
    // If input is empty, show all options; otherwise search with current text
    if (inputValue.trim()) {
      handleSearch(inputValue)
    } else {
      handleSearch("") // Show all available options
    }
  }

  const handleSelectOption = (optionValue: string) => {
    onValueChange(optionValue)
    setOpen(false)
    setSearchQuery("")
    // Don't immediately update inputValue here - let the useEffect handle it
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
        // When closing, if there's a selection, show the selected label
        if (selectedOption && !searchQuery) {
          setInputValue(selectedOption.label)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [selectedOption, searchQuery])

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onClick={handleInputClick}
          placeholder={placeholder}
          disabled={disabled}
          className={cn("pr-10", className)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      
      {open && (
        <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-[300px] overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Loading...
            </div>
          ) : options.length === 0 && searchQuery.trim() !== "" ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              {emptyText}
            </div>
          ) : options.length === 0 && searchQuery.trim() === "" ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              {typeSomethingText}
            </div>
          ) : (
            <div className="p-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  className={cn(
                    "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    value === option.value && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => handleSelectOption(option.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
