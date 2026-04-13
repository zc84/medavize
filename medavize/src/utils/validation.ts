import type { ValidationResult, Vitals } from '../types'

// Email validation - standard regex pattern
export const validateEmail = (email: string): ValidationResult => {
  const regex = /\S+@\S+\.\S+/
  if (!email.trim()) {
    return { isValid: false, error: 'Email is required' }
  }
  if (!regex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' }
  }
  return { isValid: true, error: null }
}

// Phone validation - minimum 10 digits
export const validatePhone = (phone: string): ValidationResult => {
  const digitsOnly = phone.replace(/\D/g, '')
  if (!phone.trim()) {
    return { isValid: false, error: 'Phone number is required' }
  }
  if (digitsOnly.length < 10) {
    return { isValid: false, error: 'Phone number must have at least 10 digits' }
  }
  return { isValid: true, error: null }
}

// Password validation - minimum 8 chars, at least one letter and one number
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Password is required' }
  }
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters' }
  }
  if (!/[a-zA-Z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one letter' }
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' }
  }
  return { isValid: true, error: null }
}

// Password confirmation validation
export const validatePasswordMatch = (password: string, confirmPassword: string): ValidationResult => {
  if (!confirmPassword) {
    return { isValid: false, error: 'Please confirm your password' }
  }
  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' }
  }
  return { isValid: true, error: null }
}

// Full name validation
export const validateFullName = (name: string): ValidationResult => {
  if (!name.trim()) {
    return { isValid: false, error: 'Full name is required' }
  }
  if (name.trim().length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters' }
  }
  return { isValid: true, error: null }
}

// Terms validation
export const validateTerms = (accepted: boolean): ValidationResult => {
  if (!accepted) {
    return { isValid: false, error: 'You must agree to the Terms of Service and Privacy Policy' }
  }
  return { isValid: true, error: null }
}

// Vitals validation per spec
export const validateSystolic = (value: number): ValidationResult => {
  if (isNaN(value) || value < 60 || value > 250) {
    return { isValid: false, error: 'Systolic must be between 60-250 mmHg' }
  }
  return { isValid: true, error: null }
}

export const validateDiastolic = (value: number): ValidationResult => {
  if (isNaN(value) || value < 40 || value > 150) {
    return { isValid: false, error: 'Diastolic must be between 40-150 mmHg' }
  }
  return { isValid: true, error: null }
}

export const validateHeartRate = (value: number): ValidationResult => {
  if (isNaN(value) || value < 30 || value > 200) {
    return { isValid: false, error: 'Heart rate must be between 30-200 bpm' }
  }
  return { isValid: true, error: null }
}

export const validateWeight = (value: number): ValidationResult => {
  if (isNaN(value) || value < 20 || value > 500) {
    return { isValid: false, error: 'Weight must be between 20-500 kg' }
  }
  return { isValid: true, error: null }
}

export const validateHeight = (value: number): ValidationResult => {
  if (isNaN(value) || value < 50 || value > 300) {
    return { isValid: false, error: 'Height must be between 50-300 cm' }
  }
  return { isValid: true, error: null }
}

// Complete vitals validation
export const validateVitals = (vitals: Partial<Vitals>): Record<string, ValidationResult> => {
  const results: Record<string, ValidationResult> = {}
  
  if (vitals.bloodPressure) {
    results.systolic = validateSystolic(vitals.bloodPressure.systolic)
    results.diastolic = validateDiastolic(vitals.bloodPressure.diastolic)
  }
  if (vitals.heartRate?.value !== undefined) {
    results.heartRate = validateHeartRate(vitals.heartRate.value)
  }
  if (vitals.weight?.value !== undefined) {
    results.weight = validateWeight(vitals.weight.value)
  }
  if (vitals.height?.value !== undefined) {
    results.height = validateHeight(vitals.height.value)
  }
  
  return results
}
