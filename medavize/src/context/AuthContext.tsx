import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { AuthState, AuthContextType, SignupData, OnboardingState, Vitals, Subscription } from '../types'
import {
  getCurrentUser,
  setCurrentUser,
  getUserByEmail,
  getUserByPhone,
  createUser,
  getOnboarding,
  updateOnboarding,
  completeOnboarding as completeOnboardingStorage,
  updateVitals as updateVitalsStorage,
  setSubscriptionStatus as setSubStatusStorage,
} from '../services/storage'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const user = getCurrentUser()
    return {
      user,
      isAuthenticated: !!user,
      isLoading: false
    }
  })

  const login = useCallback(async (emailOrPhone: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true }))
    
    // Check if email or phone
    const isEmail = emailOrPhone.includes('@')
    const user = isEmail 
      ? getUserByEmail(emailOrPhone)
      : getUserByPhone(emailOrPhone)
    
    if (!user || user.password !== password) {
      setState(prev => ({ ...prev, isLoading: false }))
      throw new Error('Invalid credentials')
    }
    
    setCurrentUser(user.id)
    setState({
      user,
      isAuthenticated: true,
      isLoading: false
    })
  }, [])

  const logout = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }))
    setCurrentUser(null)
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    })
  }, [])

  const signup = useCallback(async (data: SignupData) => {
    setState(prev => ({ ...prev, isLoading: true }))
    
    // Check if user already exists
    if (data.email && getUserByEmail(data.email)) {
      setState(prev => ({ ...prev, isLoading: false }))
      throw new Error('User with this email already exists')
    }
    if (data.phone && getUserByPhone(data.phone)) {
      setState(prev => ({ ...prev, isLoading: false }))
      throw new Error('User with this phone already exists')
    }
    
    const newUser = createUser({
      fullName: data.fullName,
      email: data.email || null,
      phone: data.phone || null,
      password: data.password
    })
    
    setState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false
    })
  }, [])

  const oauthLogin = useCallback(async (provider: 'google' | 'apple', defaults?: { fullName: string, email: string, password: string }) => {
    setState(prev => ({ ...prev, isLoading: true }))
    
    // Mock OAuth - create user with defaults or hardcoded fallback
    const email = defaults?.email || `${provider}.demo@example.com`
    let user = getUserByEmail(email)
    
    if (!user) {
      user = createUser({
        fullName: defaults?.fullName || (provider === 'google' ? 'Google User' : 'Apple User'),
        email: email,
        phone: null,
        password: defaults?.password || 'OAuthPassword123'
      })
    }
    
    setCurrentUser(user.id)
    setState({
      user,
      isAuthenticated: true,
      isLoading: false
    })
  }, [])

  const getOnboardingProgress = useCallback((): OnboardingState => {
    return getOnboarding()
  }, [])

  const updateOnboardingProgress = useCallback((step: number, data?: Partial<OnboardingState>) => {
    updateOnboarding(step, data)
  }, [])

  const completeOnboarding = useCallback(() => {
    completeOnboardingStorage()
  }, [])

  const updateVitals = useCallback((vitals: Partial<Vitals>) => {
    updateVitalsStorage(vitals)
  }, [])

  const setSubscriptionStatus = useCallback((status: Subscription['status']) => {
    setSubStatusStorage(status)
  }, [])

  return (
    <AuthContext.Provider 
      value={{ 
        ...state, 
        login, 
        logout, 
        signup,
        oauthLogin,
        getOnboardingProgress: getOnboardingProgress,
        updateOnboarding: updateOnboardingProgress,
        completeOnboarding,
        updateVitals,
        setSubscriptionStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
