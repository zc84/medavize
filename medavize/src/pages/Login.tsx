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
    <div className="h-full flex flex-col bg-[#f4f8fb] relative">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#0a3d62] to-[#0077cc] px-5 pt-12 pb-8 rounded-b-3xl">
        <Link 
          to="/" 
          className="inline-flex items-center text-white/80 hover:text-white transition"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="text-sm">Back</span>
        </Link>
        <h1 className="text-2xl font-bold text-white mt-4">Welcome Back</h1>
        <p className="text-[#e8f4fd] text-sm opacity-80 mt-1">Sign in to continue</p>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-4 -mt-4 pt-4 pb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-[#d0dce8] p-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Contact Method Toggle */}
            <div>
              <label className="block text-sm font-medium text-[#0d1b2a] mb-2">
                Sign in with
              </label>
              <div className="flex rounded-xl border border-[#d0dce8] p-1 bg-[#f4f8fb]">
                <button
                  type="button"
                  onClick={() => setContactMethod('email')}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition ${
                    contactMethod === 'email'
                      ? 'bg-white text-[#0077cc] shadow-sm'
                      : 'text-[#6b7c93] hover:text-[#0d1b2a]'
                  }`}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setContactMethod('phone')}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition ${
                    contactMethod === 'phone'
                      ? 'bg-white text-[#0077cc] shadow-sm'
                      : 'text-[#6b7c93] hover:text-[#0d1b2a]'
                  }`}
                >
                  Phone
                </button>
              </div>
            </div>

            {/* Email or Phone */}
            {contactMethod === 'email' ? (
              <div>
                <label className="block text-sm font-medium text-[#0d1b2a] mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7c93]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 border border-[#d0dce8] rounded-xl focus:outline-none focus:border-[#0077cc] focus:ring-1 focus:ring-[#0077cc] bg-[#f4f8fb] text-[#0d1b2a]"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-[#0d1b2a] mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7c93]" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 border border-[#d0dce8] rounded-xl focus:outline-none focus:border-[#0077cc] focus:ring-1 focus:ring-[#0077cc] bg-[#f4f8fb] text-[#0d1b2a]"
                    placeholder="1234567890"
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#0d1b2a] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7c93]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 border border-[#d0dce8] rounded-xl focus:outline-none focus:border-[#0077cc] focus:ring-1 focus:ring-[#0077cc] bg-[#f4f8fb] text-[#0d1b2a]"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b7c93] hover:text-[#0d1b2a]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0077cc] hover:bg-[#0066b3] text-white font-semibold py-4 rounded-xl transition disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#d0dce8]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-[#6b7c93]">Or continue with</span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleOAuth('google')}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-[#d0dce8] rounded-xl hover:bg-[#f4f8fb] transition disabled:opacity-50"
            >
              <GoogleIcon className="w-5 h-5 text-[#0d1b2a]" />
              <span className="text-sm font-medium text-[#0d1b2a]">Google</span>
            </button>
            <button
              onClick={() => handleOAuth('apple')}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-[#d0dce8] rounded-xl hover:bg-[#f4f8fb] transition disabled:opacity-50"
            >
              <Apple className="w-5 h-5 text-[#0d1b2a]" />
              <span className="text-sm font-medium text-[#0d1b2a]">Apple</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-[#6b7c93] mt-5">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#0077cc] hover:text-[#0066b3] font-semibold">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
