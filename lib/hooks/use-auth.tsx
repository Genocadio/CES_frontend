"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuthApi } from "@/lib/hooks/use-auth-api"
import { useActivityMonitor } from "@/lib/hooks/use-activity-monitor"
import { setGlobalLogout } from "@/lib/utils/http-interceptor"
import { UserResponseDto } from "@/lib/types/auth"

type User = UserResponseDto

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (emailOrPhone: string, password: string) => Promise<boolean>
  register: (name: string, phone: string, password: string, email?: string) => Promise<boolean>
  logout: () => void
  updateProfile: (updates: Partial<User>) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { login: loginApi, register: registerApi, isLoading: apiLoading } = useAuthApi()
  
  // Set up activity monitoring for automatic token refresh
  useActivityMonitor({
    refreshInterval: 9 * 60 * 1000, // 9 minutes
    activityEvents: ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
  })

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("current-user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem("current-user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (emailOrPhone: string, password: string): Promise<boolean> => {
    const authResponse = await loginApi(emailOrPhone, password)
    if (authResponse) {
      setUser(authResponse.user as User)
      localStorage.setItem("current-user", JSON.stringify(authResponse.user))
      // Store tokens if needed for future API calls
      localStorage.setItem("access-token", authResponse.accessToken)
      localStorage.setItem("refresh-token", authResponse.refreshToken)
      return true
    }
    return false
  }

  const register = async (name: string, phone: string, password: string, email?: string): Promise<boolean> => {
    const authResponse = await registerApi(name, phone, password, email)
    if (authResponse) {
      setUser(authResponse.user as User)
      localStorage.setItem("current-user", JSON.stringify(authResponse.user))
      // Store tokens if needed for future API calls
      localStorage.setItem("access-token", authResponse.accessToken)
      localStorage.setItem("refresh-token", authResponse.refreshToken)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("current-user")
    localStorage.removeItem("access-token")
    localStorage.removeItem("refresh-token")
  }

  // Set global logout function for HTTP interceptor
  useEffect(() => {
    setGlobalLogout(logout)
  }, [])

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false

    setIsLoading(true)
    // Simulate API call - you can implement actual profile update API call here
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem("current-user", JSON.stringify(updatedUser))
    setIsLoading(false)
    return true
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading: isLoading || apiLoading, 
      login, 
      register, 
      logout, 
      updateProfile 
    }}>
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
