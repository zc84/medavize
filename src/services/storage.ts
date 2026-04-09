import type { MockDatabase, User, OnboardingState, Vitals, Subscription } from '../types'

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

// Clear all data (for logout/reset)
export const clearDatabase = (): void => {
  localStorage.removeItem(STORAGE_KEY)
}
