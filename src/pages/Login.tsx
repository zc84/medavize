import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Mail, Lock, Phone, Eye, EyeOff, Chrome as GoogleIcon, Apple } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export function Login() {
  const navigate = useNavigate()
  const { login, oauthLogin, getOnboardingProgress } = useAuth()
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Use default values if empty
      const contactValue = contactMethod === 'email' 
        ? (email.trim() || `demo@example.com`)
        : (phone.trim() || '1234567890')
      
      await login(contactValue, password || 'password')
      
      // Check onboarding status
      const onboarding = getOnboardingProgress()
      if (!onboarding.completed) {
        // Find next incomplete step
        const nextStep = [1, 2, 3, 4, 5, 6, 7].find(s => !onboarding.stepsCompleted.includes(s)) || 1
        const stepRoutes: Record<number, string> = {
          1: '/onboarding/welcome',
          2: '/onboarding/data-sources',
          3: '/onboarding/apple-health',
          4: '/onboarding/google-health',
          5: '/onboarding/vitals',
          6: '/onboarding/notifications',
          7: '/onboarding/subscription'
        }
        navigate(stepRoutes[nextStep])
      } else {
        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuth = async (provider: 'google' | 'apple') => {
    setIsLoading(true)
    try {
      await oauthLogin(provider, {
        fullName: 'User',
        email: `user_${provider}_${Date.now()}@example.com`,
        password: 'oauth_default'
      })
      const onboarding = getOnboardingProgress()
      if (!onboarding.completed) {
        navigate('/onboarding/welcome')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      console.error('OAuth failed:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Header */}
      <div className="bg-navy-900 px-6 pt-8 pb-12">
        <Link 
          to="/" 
          className="inline-flex items-center text-white hover:text-teal-300 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Link>
        <h1 className="text-3xl font-bold text-white mt-6">Welcome Back</h1>
        <p className="text-navy-200 mt-2">Sign in to continue your caregiving journey</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 -mt-6">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Contact Method Toggle */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Sign in with
              </label>
              <div className="flex rounded-lg border border-neutral-300 p-1 bg-neutral-50">
                <button
                  type="button"
                  onClick={() => setContactMethod('email')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                    contactMethod === 'email'
                      ? 'bg-white text-navy-900 shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setContactMethod('phone')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                    contactMethod === 'phone'
                      ? 'bg-white text-navy-900 shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Phone
                </button>
              </div>
            </div>

            {/* Email or Phone */}
            {contactMethod === 'email' ? (
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="1234567890"
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-neutral-500">Or continue with</span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleOAuth('google')}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition disabled:opacity-50"
            >
              <GoogleIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Google</span>
            </button>
            <button
              onClick={() => handleOAuth('apple')}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition disabled:opacity-50"
            >
              <Apple className="w-5 h-5" />
              <span className="text-sm font-medium">Apple</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-neutral-600 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-teal-600 hover:text-teal-700 font-medium">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
