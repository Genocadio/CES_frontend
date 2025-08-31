import { useState, useCallback } from 'react'
import { 
  UserRegistrationRequestDto, 
  LoginRequestDto, 
  AuthResponseDto, 
  AuthError 
} from '@/lib/types/auth'

interface UseAuthApiReturn {
  isLoading: boolean
  error: AuthError | null
  login: (emailOrPhone: string, password: string) => Promise<AuthResponseDto | null>
  register: (name: string, phone: string, password: string, email?: string) => Promise<AuthResponseDto | null>
  resetError: () => void
}

export function useAuthApi(): UseAuthApiReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<AuthError | null>(null)

  const resetError = useCallback(() => {
    setError(null)
  }, [])

  const parseName = useCallback((fullName: string) => {
    const nameParts = fullName.trim().split(' ').filter(part => part.length > 0)
    
    if (nameParts.length === 1) {
      return {
        firstName: nameParts[0],
        lastName: undefined,
        middleName: undefined
      }
    } else if (nameParts.length === 2) {
      return {
        firstName: nameParts[0],
        lastName: nameParts[1],
        middleName: undefined
      }
    } else {
      // More than 2 parts: first, last, and middle names
      return {
        firstName: nameParts[0],
        lastName: nameParts[nameParts.length - 1],
        middleName: nameParts.slice(1, -1).join(' ')
      }
    }
  }, [])

  const login = useCallback(async (emailOrPhone: string, password: string): Promise<AuthResponseDto | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrPhone,
          password
        } as LoginRequestDto),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data: AuthResponseDto = await response.json()
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to login'
      const authError: AuthError = {
        message: errorMessage,
        status: err instanceof Error && 'status' in err ? (err as { status?: number }).status : undefined
      }
      setError(authError)
      console.error('Login error:', err)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (name: string, phone: string, password: string, email?: string): Promise<AuthResponseDto | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const { firstName, lastName, middleName } = parseName(name)
      
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          middleName,
          phoneNumber: phone,
          password,
          email
        } as UserRegistrationRequestDto),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data: AuthResponseDto = await response.json()
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to register'
      const authError: AuthError = {
        message: errorMessage,
        status: err instanceof Error && 'status' in err ? (err as { status?: number }).status : undefined
      }
      setError(authError)
      console.error('Registration error:', err)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [parseName])

  return {
    isLoading,
    error,
    login,
    register,
    resetError
  }
}
