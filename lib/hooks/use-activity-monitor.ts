import { useEffect, useRef, useCallback } from 'react'
import { useTokenRefresh } from './use-token-refresh'

interface UseActivityMonitorOptions {
  refreshInterval?: number // in milliseconds, default 9 minutes
  activityEvents?: string[] // events to monitor, default common user interactions
}

export function useActivityMonitor(options: UseActivityMonitorOptions = {}) {
  const {
    refreshInterval = 9 * 60 * 1000, // 9 minutes in milliseconds
    activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
  } = options

  const { refreshToken } = useTokenRefresh()
  const lastActivityRef = useRef<number>(Date.now())
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isRefreshingRef = useRef<boolean>(false)

  const handleUserActivity = useCallback(() => {
    lastActivityRef.current = Date.now()
    
    // Clear existing timeout
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current)
    }
    
    // Set new timeout for token refresh
    refreshTimeoutRef.current = setTimeout(async () => {
      if (isRefreshingRef.current) return
      
      isRefreshingRef.current = true
      try {
        await refreshToken()
      } catch (error) {
        console.error('Automatic token refresh failed:', error)
      } finally {
        isRefreshingRef.current = false
      }
    }, refreshInterval)
  }, [refreshToken, refreshInterval])

  const resetActivityTimer = useCallback(() => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current)
    }
    handleUserActivity()
  }, [handleUserActivity])

  useEffect(() => {
    // Set up event listeners for user activity
    const eventListeners = activityEvents.map(event => {
      const listener = () => handleUserActivity()
      document.addEventListener(event, listener, { passive: true })
      return { event, listener }
    })

    // Initial timer setup
    handleUserActivity()

    // Cleanup function
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current)
      }
      
      eventListeners.forEach(({ event, listener }) => {
        document.removeEventListener(event, listener)
      })
    }
  }, [activityEvents, handleUserActivity])

  return {
    resetActivityTimer,
    getLastActivity: () => lastActivityRef.current,
    isRefreshing: () => isRefreshingRef.current
  }
}
