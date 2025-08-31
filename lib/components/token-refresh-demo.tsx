"use client"

import { useActivityMonitor } from '@/lib/hooks/use-activity-monitor'
import { useTokenRefresh } from '@/lib/hooks/use-token-refresh'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useState, useEffect } from 'react'

export function TokenRefreshDemo() {
  const { refreshToken, isLoading, error } = useTokenRefresh()
  const { getLastActivity, resetActivityTimer, isRefreshing } = useActivityMonitor()
  const [lastActivity, setLastActivity] = useState<number>(Date.now())

  // Update last activity display every second
  useEffect(() => {
    const interval = setInterval(() => {
      setLastActivity(getLastActivity())
    }, 1000)
    return () => clearInterval(interval)
  }, [getLastActivity])

  const handleManualRefresh = async () => {
    await refreshToken()
  }

  const handleSimulateActivity = () => {
    resetActivityTimer()
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString()
  }

  const getTimeSinceActivity = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const seconds = Math.floor((diff % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Token Refresh Monitor</CardTitle>
        <CardDescription>
          Monitor automatic token refresh and user activity
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Last Activity:</span>
            <span className="text-sm text-muted-foreground">
              {formatTime(lastActivity)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Time Since Activity:</span>
            <span className="text-sm text-muted-foreground">
              {getTimeSinceActivity(lastActivity)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Status:</span>
            <span className={`text-sm ${isRefreshing() ? 'text-yellow-600' : 'text-green-600'}`}>
              {isRefreshing() ? 'Refreshing...' : 'Active'}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Button 
            onClick={handleManualRefresh} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Refreshing...' : 'Manual Token Refresh'}
          </Button>
          
          <Button 
            onClick={handleSimulateActivity} 
            variant="outline"
            className="w-full"
          >
            Simulate User Activity
          </Button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Tokens refresh automatically every 9 minutes when user is active</p>
          <p>• Activity includes: mouse, keyboard, scroll, touch</p>
          <p>• 401 responses automatically log out the user</p>
        </div>
      </CardContent>
    </Card>
  )
}
