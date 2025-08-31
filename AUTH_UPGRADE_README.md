# Authentication System Upgrade

## Overview
This document describes the upgrade of the authentication system from mock data to real backend API integration.

## Changes Made

### 1. New Type Definitions (`lib/types/auth.ts`)
- `UserRegistrationRequestDto` - For user registration requests
- `LoginRequestDto` - For login requests  
- `AuthResponseDto` - Response from authentication endpoints
- `UserResponseDto` - User data structure from backend
- `LocationResponseDto` - Location information
- `AuthError` - Error handling structure

### 2. New Authentication Hooks (`lib/hooks/use-auth-api.ts`)
- `useAuthApi()` - Hook for making API calls to backend
- Handles login and registration with proper error handling
- Implements name parsing logic for registration
- Uses environment variables for API base URL

### 3. Updated Authentication Context (`hooks/use-auth.tsx`)
- Integrated with new `useAuthApi` hook
- Removed mock user data
- Added token storage for future authenticated requests
- Updated User interface to match backend response

### 4. New User Issues Hook (`lib/hooks/use-user-issues.ts`)
- `useUserIssues()` - Hook for fetching user issues from backend
- Calls `/issues/my-issues` endpoint with Bearer token authentication
- Automatically fetches issues on component mount
- Handles loading states and error handling

### 5. Updated UI Components
- **Login Page** (`app/auth/login/page.tsx`):
  - Changed from phone-only to email-or-phone input
  - Removed demo accounts section
  - Updated form validation and error handling

- **Register Page** (`app/auth/register/page.tsx`):
  - Uses single name field (parsed into first, middle, last names)
  - Removed demo accounts section
  - Maintains existing validation logic

- **Dashboard Page** (`app/dashboard/page.tsx`):
  - Now fetches real user issues from backend API
  - Shows accurate counts for total, in-progress, resolved issues and comments
  - Displays latest active issues (in-progress, incomplete, received) at the top
  - Shows complete list of all user issues below
  - Uses Bearer token authentication for API calls

### 6. Translation Updates (`lib/translations.ts`)
- Added `emailOrPhone` translation keys for all languages
- Updated `invalidCredentials` messages
- Removed demo account related translations
- Added `emailOrPhone` placeholder text

## Name Parsing Logic

The registration system automatically parses full names into components:

- **1 part**: `"John"` → `firstName: "John"`
- **2 parts**: `"John Doe"` → `firstName: "John", lastName: "Doe"`
- **3+ parts**: `"John A B Doe"` → `firstName: "John", lastName: "Doe", middleName: "A B"`

## API Endpoints

- **Login**: `POST /api/auth/login`
- **Register**: `POST /api/auth/register`
- **User Issues**: `GET /api/issues/my-issues` (requires Bearer token)

## Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

## Dashboard Features

The dashboard now provides real-time data from your backend:

### **Stats Cards**
- **Total Issues**: Count of all user-submitted issues
- **In Progress**: Count of issues with "in-progress" or "inProgress" status
- **Resolved**: Count of issues with "resolved" status
- **Comments**: Total comment count across all user issues

### **Latest Active Issues**
- Shows the 5 most recent issues that are:
  - In progress
  - Incomplete
  - Received
- Sorted by creation date (newest first)
- Limited to 5 items for better UX

### **All My Issues**
- Complete list of all user-submitted issues
- Each issue shows:
  - Title and description (truncated to 2 lines)
  - Status badge with appropriate colors
  - Ticket ID, category, submission date
  - Comment count
  - View Details button linking to followup page

## Authentication Flow

1. User logs in/registers → receives access token
2. Token stored in localStorage as `access-token`
3. Dashboard automatically fetches user issues using Bearer token
4. All subsequent API calls include `Authorization: Bearer {token}` header

## Testing

A test file (`lib/test-auth.ts`) is provided for testing the authentication system:

```typescript
import { testLogin, testRegister, testNameParsing } from './lib/test-auth'

// Test name parsing
testNameParsing()

// Test login (requires backend)
// await testLogin("user@example.com", "password")

// Test registration (requires backend)
// await testRegister("John Doe", "+1234567890", "password", "john@example.com")
```

## Backend Requirements

The backend must implement these DTOs and endpoints:

### UserRegistrationRequestDto
```java
public class UserRegistrationRequestDto {
    private String email; // Optional
    private String password;
    private String phoneNumber;
    private String firstName;
    private String lastName;
    private String middleName;
    private Language language;
}
```

### LoginRequestDto
```java
public class LoginRequestDto {
    private String emailOrPhone; // Can be either email or phone
    private String password;
}
```

### AuthResponseDto
```java
public class AuthResponseDto {
    private String accessToken;
    private String refreshToken;
    private UserResponseDto user;
}
```

### User Issues Endpoint
```java
@GetMapping("/issues/my-issues")
public ResponseEntity<List<IssueDto>> getMyIssues(@RequestHeader("Authorization") String token) {
    // Return list of issues for authenticated user
}
```

## Migration Notes

1. **No UI Changes**: The UI remains exactly the same, only the backend integration changed
2. **Token Storage**: Access and refresh tokens are now stored in localStorage
3. **Error Handling**: Improved error handling with backend error messages
4. **Name Parsing**: Automatic name parsing eliminates the need for separate name fields
5. **Demo Removal**: All demo account functionality has been removed
6. **Real Data**: Dashboard now shows actual user data from backend instead of mock data
7. **Authentication**: All API calls now include proper Bearer token authentication

## Future Enhancements

- Token refresh logic
- Profile update API integration
- Password reset functionality
- Email verification
- Two-factor authentication
- Real-time issue updates
- Issue filtering and search
- Export functionality for user issues
