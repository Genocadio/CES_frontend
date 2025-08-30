"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  phone?: string
  isVerified: boolean
  createdAt: Date
  preferences: {
    language: string
    notifications: boolean
    publicProfile: boolean
  }
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string, phone?: string) => Promise<boolean>
  logout: () => void
  updateProfile: (updates: Partial<User>) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    name: "Jean Baptiste",
    email: "jean@example.com",
    phone: "+250788123456",
    isVerified: true,
    createdAt: new Date("2024-01-01"),
    preferences: {
      language: "rw",
      notifications: true,
      publicProfile: false,
    },
  },
  {
    id: "2",
    name: "Marie Uwimana",
    email: "marie@example.com",
    phone: "+250789654321",
    isVerified: true,
    createdAt: new Date("2024-01-05"),
    preferences: {
      language: "en",
      notifications: true,
      publicProfile: true,
    },
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("current-user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem("current-user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.email === email)
    if (foundUser && password === "password") {
      // Mock password check
      setUser(foundUser)
      localStorage.setItem("current-user", JSON.stringify(foundUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const register = async (name: string, email: string, password: string, phone?: string): Promise<boolean> => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email)
    if (existingUser) {
      setIsLoading(false)
      return false
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      isVerified: false,
      createdAt: new Date(),
      preferences: {
        language: "rw",
        notifications: true,
        publicProfile: false,
      },
    }

    mockUsers.push(newUser)
    setUser(newUser)
    localStorage.setItem("current-user", JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("current-user")
  }

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem("current-user", JSON.stringify(updatedUser))
    setIsLoading(false)
    return true
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
