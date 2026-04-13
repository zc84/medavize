import type {
  MockDatabase, User, OnboardingState, Vitals, Subscription,
  EHRData, AppleHealthData, GoogleHealthData, ManualVitalsEntry,
  Document, AudioRecording, TextNote, ScannedDocument
} from '../types'

const STORAGE_KEY = 'medavize_mock_db'

// Generate UUID with fallback for older browsers
const generateUUID = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // Fallback UUID generator
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// Default/initial database state
const defaultDatabase: MockDatabase = {
  users: [],
  currentUserId: null,
  onboarding: {
    completed: false,
    stepsCompleted: [],
    appleHealthConnected: false,
    googleHealthConnected: false,
    notificationsEnabled: false,
  },
  vitals: {
    bloodPressure: null,
    heartRate: null,
    weight: null,
    height: null,
  },
  subscription: {
    status: 'none',
    trialEndDate: null,
    plan: null,
  },
  ehrData: {
    connected: false,
    providerName: null,
    lastSynced: null,
    conditions: [],
    medications: [],
    labs: []
  },
  appleHealthData: {
    connected: false,
    lastSynced: null,
    vitals: {
      heartRate: 0,
      steps: 0,
      sleepHours: 0,
      bloodPressureSystolic: 0,
      bloodPressureDiastolic: 0
    }
  },
  googleHealthData: {
    connected: false,
    lastSynced: null,
    vitals: {
      heartRate: 0,
      steps: 0,
      sleepHours: 0,
      bloodPressureSystolic: 0,
      bloodPressureDiastolic: 0
    }
  },
  manualVitals: [],
  documents: [],
  audioRecordings: [],
  textNotes: [],
  scannedDocuments: []
}

// Get database from localStorage
export const getDatabase = (): MockDatabase => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...defaultDatabase, ...JSON.parse(stored) }
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error)
  }
  return { ...defaultDatabase }
}

// Save database to localStorage
export const saveDatabase = (db: MockDatabase): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
  } catch (error) {
    console.error('Error writing to localStorage:', error)
  }
}

// User operations
export const createUser = (user: Omit<User, 'id' | 'createdAt'>): User => {
  const db = getDatabase()
  const newUser: User = {
    ...user,
    id: generateUUID(),
    createdAt: new Date().toISOString(),
  }
  db.users.push(newUser)
  db.currentUserId = newUser.id
  saveDatabase(db)
  return newUser
}

export const getUserByEmail = (email: string): User | undefined => {
  const db = getDatabase()
  return db.users.find((u) => u.email?.toLowerCase() === email.toLowerCase())
}

export const getUserByPhone = (phone: string): User | undefined => {
  const db = getDatabase()
  const digitsOnly = phone.replace(/\D/g, '')
  return db.users.find((u) => {
    const userDigits = u.phone?.replace(/\D/g, '')
    return userDigits === digitsOnly
  })
}

export const getCurrentUser = (): User | null => {
  const db = getDatabase()
  if (!db.currentUserId) return null
  return db.users.find((u) => u.id === db.currentUserId) || null
}

export const setCurrentUser = (userId: string | null): void => {
  const db = getDatabase()
  db.currentUserId = userId
  saveDatabase(db)
}

// Onboarding operations
export const getOnboarding = (): OnboardingState => {
  const db = getDatabase()
  return db.onboarding
}

export const updateOnboarding = (
  step: number,
  data?: Partial<OnboardingState>
): void => {
  const db = getDatabase()
  if (!db.onboarding.stepsCompleted.includes(step)) {
    db.onboarding.stepsCompleted.push(step)
  }
  if (data) {
    db.onboarding = { ...db.onboarding, ...data }
  }
  saveDatabase(db)
}

export const completeOnboarding = (): void => {
  const db = getDatabase()
  db.onboarding.completed = true
  saveDatabase(db)
}

// Vitals operations
export const getVitals = (): Vitals => {
  const db = getDatabase()
  return db.vitals
}

export const updateVitals = (vitals: Partial<Vitals>): void => {
  const db = getDatabase()
  db.vitals = { ...db.vitals, ...vitals }
  saveDatabase(db)
}

// Subscription operations
export const getSubscription = (): Subscription => {
  const db = getDatabase()
  return db.subscription
}

export const setSubscriptionStatus = (status: Subscription['status']): void => {
  const db = getDatabase()
  db.subscription.status = status
  
  if (status === 'trial') {
    const trialEndDate = new Date()
    trialEndDate.setDate(trialEndDate.getDate() + 30)
    db.subscription.trialEndDate = trialEndDate.toISOString()
    db.subscription.plan = 'monthly'
  }
  
  saveDatabase(db)
}

// Restore purchases (mock)
export const restorePurchases = (): boolean => {
  // Mock restore - always returns false for demo
  return false
}

// EHR Data Operations
export const getEHRData = (): EHRData => {
  const db = getDatabase()
  return db.ehrData
}

export const updateEHRData = (data: Partial<EHRData>): void => {
  const db = getDatabase()
  db.ehrData = { ...db.ehrData, ...data }
  saveDatabase(db)
}

export const disconnectEHR = (): void => {
  const db = getDatabase()
  db.ehrData = {
    connected: false,
    providerName: null,
    lastSynced: null,
    conditions: [],
    medications: [],
    labs: []
  }
  saveDatabase(db)
}

// Apple Health Operations
export const getAppleHealthData = (): AppleHealthData => {
  const db = getDatabase()
  return db.appleHealthData
}

export const updateAppleHealthData = (data: Partial<AppleHealthData>): void => {
  const db = getDatabase()
  db.appleHealthData = { ...db.appleHealthData, ...data }
  saveDatabase(db)
}

export const disconnectAppleHealth = (): void => {
  const db = getDatabase()
  db.appleHealthData = {
    connected: false,
    lastSynced: null,
    vitals: {
      heartRate: 0,
      steps: 0,
      sleepHours: 0,
      bloodPressureSystolic: 0,
      bloodPressureDiastolic: 0
    }
  }
  saveDatabase(db)
}

// Google Health Operations
export const getGoogleHealthData = (): GoogleHealthData => {
  const db = getDatabase()
  return db.googleHealthData
}

export const updateGoogleHealthData = (data: Partial<GoogleHealthData>): void => {
  const db = getDatabase()
  db.googleHealthData = { ...db.googleHealthData, ...data }
  saveDatabase(db)
}

export const disconnectGoogleHealth = (): void => {
  const db = getDatabase()
  db.googleHealthData = {
    connected: false,
    lastSynced: null,
    vitals: {
      heartRate: 0,
      steps: 0,
      sleepHours: 0,
      bloodPressureSystolic: 0,
      bloodPressureDiastolic: 0
    }
  }
  saveDatabase(db)
}

// Manual Vitals Operations
export const getManualVitals = (): ManualVitalsEntry[] => {
  const db = getDatabase()
  return db.manualVitals
}

export const addManualVitals = (entry: Omit<ManualVitalsEntry, 'id'>): ManualVitalsEntry => {
  const db = getDatabase()
  const newEntry: ManualVitalsEntry = {
    ...entry,
    id: generateUUID()
  }
  db.manualVitals.unshift(newEntry)
  saveDatabase(db)
  return newEntry
}

export const deleteManualVitals = (id: string): void => {
  const db = getDatabase()
  db.manualVitals = db.manualVitals.filter(entry => entry.id !== id)
  saveDatabase(db)
}

// Documents Operations
export const getDocuments = (): Document[] => {
  const db = getDatabase()
  return db.documents
}

export const addDocument = (doc: Omit<Document, 'id'>): Document => {
  const db = getDatabase()
  const newDoc: Document = {
    ...doc,
    id: generateUUID()
  }
  db.documents.unshift(newDoc)
  saveDatabase(db)
  return newDoc
}

export const deleteDocument = (id: string): void => {
  const db = getDatabase()
  db.documents = db.documents.filter(doc => doc.id !== id)
  saveDatabase(db)
}

// Audio Recordings Operations
export const getAudioRecordings = (): AudioRecording[] => {
  const db = getDatabase()
  return db.audioRecordings
}

export const addAudioRecording = (recording: Omit<AudioRecording, 'id'>): AudioRecording => {
  const db = getDatabase()
  const newRecording: AudioRecording = {
    ...recording,
    id: generateUUID()
  }
  db.audioRecordings.unshift(newRecording)
  saveDatabase(db)
  return newRecording
}

export const deleteAudioRecording = (id: string): void => {
  const db = getDatabase()
  db.audioRecordings = db.audioRecordings.filter(rec => rec.id !== id)
  saveDatabase(db)
}

// Text Notes Operations
export const getTextNotes = (): TextNote[] => {
  const db = getDatabase()
  return db.textNotes
}

export const addTextNote = (note: Omit<TextNote, 'id'>): TextNote => {
  const db = getDatabase()
  const newNote: TextNote = {
    ...note,
    id: generateUUID()
  }
  db.textNotes.unshift(newNote)
  saveDatabase(db)
  return newNote
}

export const deleteTextNote = (id: string): void => {
  const db = getDatabase()
  db.textNotes = db.textNotes.filter(note => note.id !== id)
  saveDatabase(db)
}

// Scanned Documents Operations
export const getScannedDocuments = (): ScannedDocument[] => {
  const db = getDatabase()
  return db.scannedDocuments
}

export const addScannedDocument = (doc: Omit<ScannedDocument, 'id'>): ScannedDocument => {
  const db = getDatabase()
  const newDoc: ScannedDocument = {
    ...doc,
    id: generateUUID()
  }
  db.scannedDocuments.unshift(newDoc)
  saveDatabase(db)
  return newDoc
}

export const deleteScannedDocument = (id: string): void => {
  const db = getDatabase()
  db.scannedDocuments = db.scannedDocuments.filter(doc => doc.id !== id)
  saveDatabase(db)
}

// Clear all data (for logout/reset)
export const clearDatabase = (): void => {
  localStorage.removeItem(STORAGE_KEY)
}
