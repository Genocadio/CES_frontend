# Token Refresh System

## Overview
This document describes the automatic token refresh system that monitors user activity and refreshes authentication tokens every 9 minutes when the user is active.

## Features

### 1. Automatic Token Refresh
- **Interval**: Every 9 minutes (540,000 milliseconds)
- **Trigger**: User activity detection
- **Endpoint**: `POST /api/auth/refresh`
- **Authentication**: Uses refresh token from localStorage

### 2. User Activity Monitoring
The system monitors these user interactions:
- Mouse movements (`mousemove`)
- Mouse clicks (`mousedown`, `click`)
- Keyboard input (`keypress`)
- Scrolling (`scroll`)
- Touch interactions (`touchstart`)

### 3. Automatic Logout on 401
- All HTTP requests are intercepted
- 401 responses automatically trigger user logout
- Clears all stored tokens and user data
- Redirects to login page

## Implementation

### New Hooks

#### `useTokenRefresh()`
```typescript
import { useTokenRefresh } from '@/lib/hooks/use-token-refresh'

const { refreshToken, isLoading, error, resetError } = useTokenRefresh()

// Manual token refresh
await refreshToken()
```

#### `useActivityMonitor(options?)`
```typescript
import { useActivityMonitor } from '@/lib/hooks/use-activity-monitor'

const { resetActivityTimer, getLastActivity, isRefreshing } = useActivityMonitor({
  refreshInterval: 9 * 60 * 1000, // 9 minutes
  activityEvents: ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
})
```

### HTTP Interceptor

#### `authenticatedFetch(url, options)`
```typescript
import { authenticatedFetch } from '@/lib/utils/http-interceptor'

// Use instead of regular fetch for authenticated requests
const response = await authenticatedFetch('/api/protected-endpoint', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
})
```

## Usage Examples

### 1. Automatic Integration
The token refresh system is automatically integrated into the `AuthProvider`:

```typescript
// In your app layout or root component
import { AuthProvider } from '@/lib/hooks/use-auth'

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}
```

### 2. Manual Token Refresh
```typescript
import { useTokenRefresh } from '@/lib/hooks/use-token-refresh'

function MyComponent() {
  const { refreshToken, isLoading } = useTokenRefresh()
  
  const handleRefresh = async () => {
    await refreshToken()
  }
  
  return (
    <button onClick={handleRefresh} disabled={isLoading}>
      {isLoading ? 'Refreshing...' : 'Refresh Token'}
    </button>
  )
}
```

### 3. Activity Monitoring
```typescript
import { useActivityMonitor } from '@/lib/hooks/use-activity-monitor'

function ActivityMonitor() {
  const { getLastActivity, resetActivityTimer } = useActivityMonitor()
  
  const lastActivity = getLastActivity()
  
  return (
    <div>
      <p>Last activity: {new Date(lastActivity).toLocaleString()}</p>
      <button onClick={resetActivityTimer}>
        Reset Timer
      </button>
    </div>
  )
}
```

### 4. Protected API Calls
```typescript
import { authenticatedFetch } from '@/lib/utils/http-interceptor'

async function fetchUserData() {
  try {
    const response = await authenticatedFetch('/api/users/profile', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access-token')}`
      }
    })
    
    if (response.ok) {
      const data = await response.json()
      return data
    }
  } catch (error) {
    if (error.message === 'Unauthorized - user logged out') {
      // User was automatically logged out due to 401
      console.log('User logged out automatically')
    }
  }
}
```

## Configuration

### Environment Variables
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

### Customization Options
```typescript
// Custom refresh interval (e.g., 5 minutes)
useActivityMonitor({
  refreshInterval: 5 * 60 * 1000
})

// Custom activity events
useActivityMonitor({
  activityEvents: ['click', 'keypress', 'scroll']
})
```

## Backend Requirements

### Token Refresh Endpoint
```java
@PostMapping("/auth/refresh")
public ResponseEntity<TokenRefreshResponseDto> refreshToken(
    @RequestBody TokenRefreshRequestDto request
) {
    // Validate refresh token
    // Generate new access and refresh tokens
    // Return TokenRefreshResponseDto
}
```

### DTOs
```java
public class TokenRefreshRequestDto {
    private String refreshToken;
}

public class TokenRefreshResponseDto {
    private String accessToken;
    private String refreshToken;
}
```

## Security Features

1. **Automatic Logout**: 401 responses immediately log out the user
2. **Token Storage**: Tokens stored securely in localStorage
3. **Activity-Based Refresh**: Only refreshes when user is actively using the app
4. **Error Handling**: Graceful fallback on refresh failures

## Monitoring and Debugging

### Demo Component
Use the `TokenRefreshDemo` component to monitor the system:

```typescript
import { TokenRefreshDemo } from '@/lib/components/token-refresh-demo'

// Add to any page for testing
<TokenRefreshDemo />
```

### Console Logs
- Token refresh attempts and results
- User activity detection
- Automatic logout events
- Error messages

## Troubleshooting

### Common Issues

1. **Tokens not refreshing**
   - Check if user activity is being detected
   - Verify refresh token exists in localStorage
   - Check backend endpoint availability

2. **Automatic logout not working**
   - Ensure `setGlobalLogout` is called in AuthProvider
   - Check if HTTP interceptor is being used
   - Verify 401 response handling

3. **Activity detection issues**
   - Check browser compatibility
   - Verify event listeners are attached
   - Test with different interaction types

### Debug Mode
Enable detailed logging by setting:
```typescript
localStorage.setItem('debug-token-refresh', 'true')
```

## Performance Considerations

- Activity monitoring uses passive event listeners
- Token refresh only occurs when needed
- Minimal impact on app performance
- Automatic cleanup of timers and listeners
