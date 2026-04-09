// Spec-compliant data model for Medavize
// Data is stored under a single key 'medavize_mock_db' in localStorage

export interface User {
  id: string
  fullName: string
  email: string | null
  phone: string | null
  password: string // Mock only - plain text for demo
  createdAt: string
}

export interface OnboardingState {
  completed: boolean
  stepsCompleted: number[]
  appleHealthConnected: boolean
  googleHealthConnected: boolean
  notificationsEnabled: boolean
}

export interface Vitals {
  bloodPressure: {
    systolic: number
    diastolic: number
    unit: 'mmHg'
  } | null
  heartRate: {
    value: number
    unit: 'bpm'
  } | null
  weight: {
    value: number
    unit: 'kg'
  } | null
  height: {
    value: number
    unit: 'cm'
  } | null
}

export interface Subscription {
  status: 'trial' | 'active' | 'expired' | 'none'
  trialEndDate: string | null
  plan: 'monthly' | 'annual' | null
}

export interface MockDatabase {
  users: User[]
  currentUserId: string | null
  onboarding: OnboardingState
  vitals: Vitals
  subscription: Subscription
}

// Auth context types
export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  signup: (data: SignupData) => Promise<void>
  oauthLogin: (provider: 'google' | 'apple', defaults?: { fullName: string, email: string, password: string }) => Promise<void>
  getOnboardingProgress: () => OnboardingState
  updateOnboarding: (step: number, data?: Partial<OnboardingState>) => void
  completeOnboarding: () => void
  updateVitals: (vitals: Partial<Vitals>) => void
  setSubscriptionStatus: (status: Subscription['status']) => void
}

export interface SignupData {
  fullName: string
  email?: string
  phone?: string
  password: string
}

// Validation result type
export interface ValidationResult {
  isValid: boolean
  error: string | null
}
