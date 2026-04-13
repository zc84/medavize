import { useState } from 'react'
import { useNavigate, Link as RouterLink, Link } from 'react-router-dom'
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
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header - Black */}
      <header className="bg-black px-5 py-4">
        <div className="flex items-center justify-between">
          <RouterLink to="/" className="inline-flex items-center text-white hover:text-emerald-400 transition">
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">Back</span>
          </RouterLink>
          <RouterLink to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <img src="/logo-white.png" alt="Medavize" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold text-white">medavize</span>
          </RouterLink>
        </div>
      </header>

      {/* Form Section - Light Background */}
      <div className="flex-1 bg-neutral-100 px-5 py-10 border-b border-neutral-200">
        <div className="max-w-md mx-auto">
          <h1 className="text-[28px] font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-base text-muted-foreground mb-8">Sign in to continue</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Contact Method Toggle */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Sign in with
              </label>
              <div className="flex rounded-xl border border-border p-1 bg-white">
                <button
                  type="button"
                  onClick={() => setContactMethod('email')}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition ${
                    contactMethod === 'email'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setContactMethod('phone')}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition ${
                    contactMethod === 'phone'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Phone
                </button>
              </div>
            </div>

            {/* Email or Phone */}
            {contactMethod === 'email' ? (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 border border-border rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-white text-foreground"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 border border-border rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-white text-foreground"
                    placeholder="1234567890"
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 border border-border rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-white text-foreground"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-full transition disabled:opacity-50 shadow-lg"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-neutral-100 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleOAuth('google')}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-xl bg-white hover:bg-neutral-50 transition disabled:opacity-50"
            >
              <GoogleIcon className="w-5 h-5 text-foreground" />
              <span className="text-sm font-medium text-foreground">Google</span>
            </button>
            <button
              onClick={() => handleOAuth('apple')}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-xl bg-white hover:bg-neutral-50 transition disabled:opacity-50"
            >
              <Apple className="w-5 h-5 text-foreground" />
              <span className="text-sm font-medium text-foreground">Apple</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-emerald-600 hover:text-emerald-700 font-semibold">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
