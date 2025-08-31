export interface UserResponseDto {
  id: number
  firstName: string
  lastName: string
  middleName?: string
  email?: string
  phoneNumber: string
  profileUrl?: string
  role?: string
  accountStatus?: string
  accountStatusDisplayName?: string
  canLogin?: boolean
  department?: {
    id: number
    nameEn: string
    nameFr: string
    nameRw: string
  }
  location?: LocationRequestDto
  leadershipLevelName?: string
  preferences?: {
    language: string
    notifications: boolean
    publicProfile: boolean
  }
}

export interface LocationRequestDto {
  district?: string
  sector?: string
  cell?: string
  village?: string
  latitude?: number
  longitude?: number
}

export interface UserProfileCompletionRequestDto {
  profileUrl?: string
  level?: string
  location: LocationRequestDto
}

export interface LoginRequestDto {
  emailOrPhone: string
  password: string
}

export interface UserRegistrationRequestDto {
  email?: string
  password: string
  phoneNumber: string
  firstName: string
  lastName: string
  middleName?: string
  language: string
}

export interface AuthResponseDto {
  accessToken: string
  refreshToken: string
  user: UserResponseDto
}

export interface AuthError {
  message: string
  status?: number
}

export interface TokenRefreshRequestDto {
  refreshToken: string
}

export interface TokenRefreshResponseDto {
  accessToken: string
  refreshToken: string
}
