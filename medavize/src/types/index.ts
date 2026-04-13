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

// Data Source Types
export interface EHRData {
  connected: boolean
  providerName: string | null
  lastSynced: string | null
  conditions: string[]
  medications: string[]
  labs: {
    name: string
    value: number
    unit: string
    date: string
  }[]
}

export interface AppleHealthData {
  connected: boolean
  lastSynced: string | null
  vitals: {
    heartRate: number
    steps: number
    sleepHours: number
    bloodPressureSystolic: number
    bloodPressureDiastolic: number
  }
}

export interface GoogleHealthData {
  connected: boolean
  lastSynced: string | null
  vitals: {
    heartRate: number
    steps: number
    sleepHours: number
    bloodPressureSystolic: number
    bloodPressureDiastolic: number
  }
}

export interface ManualVitalsEntry {
  id: string
  timestamp: string
  systolic: number | null
  diastolic: number | null
  heartRate: number | null
  weight: number | null
  height: number | null
  bloodGlucose: number | null
  spo2: number | null
  temperature: number | null
  respiratoryRate: number | null
}

export interface Document {
  id: string
  fileName: string
  fileType: string
  uploadedAt: string
  extractedData: {
    type: string
    summary: string
    rawText: string
  }
}

export interface AudioRecording {
  id: string
  fileName: string
  duration: number
  recordedAt: string
  transcript: string
  summary: string
}

export interface TextNote {
  id: string
  rawText: string
  createdAt: string
  extracted: {
    symptoms: string[]
    duration: string | null
    severity: string | null
  }
}

export interface ScannedDocument {
  id: string
  fileName: string
  fileType: string
  scanMethod: 'camera' | 'upload'
  uploadedAt: string
  extractedData: {
    type: string
    summary: string
    rawText: string
  }
}

export interface MockDatabase {
  users: User[]
  currentUserId: string | null
  onboarding: OnboardingState
  vitals: Vitals
  subscription: Subscription
  ehrData: EHRData
  appleHealthData: AppleHealthData
  googleHealthData: GoogleHealthData
  manualVitals: ManualVitalsEntry[]
  documents: Document[]
  audioRecordings: AudioRecording[]
  textNotes: TextNote[]
  scannedDocuments: ScannedDocument[]
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
