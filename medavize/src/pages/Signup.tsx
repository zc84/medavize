import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { 
  ArrowLeft, Mail, Lock, User, Phone, Eye, EyeOff,
  Chrome as GoogleIcon, Apple
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export function Signup() {
  const navigate = useNavigate()
  const { signup, oauthLogin } = useAuth()
  
  const [fullName, setFullName] = useState('')
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Use default values for any empty fields
    const finalFullName = fullName.trim() || 'User'
    const finalEmail = contactMethod === 'email' ? (email.trim() || `user_${Date.now()}@example.com`) : undefined
    const finalPhone = contactMethod === 'phone' ? (phone.trim() || '1234567890') : undefined
    const finalPassword = password || 'password123'
    
    setIsLoading(true)
    try {
      await signup({
        fullName: finalFullName,
        email: finalEmail,
        phone: finalPhone,
        password: finalPassword
      })
      navigate('/onboarding/welcome')
    } catch (error) {
      console.error('Signup failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuth = async (provider: 'google' | 'apple') => {
    setIsLoading(true)
    try {
      // OAuth creates user with default values
      await oauthLogin(provider, {
        fullName: 'User',
        email: `user_${provider}_${Date.now()}@example.com`,
        password: 'oauth_default'
      })
      navigate('/onboarding/welcome')
    } catch (error) {
      console.error('OAuth failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full flex flex-col bg-[#f4f8fb] relative">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#0a3d62] to-[#0077cc] px-5 pt-12 pb-8 rounded-b-3xl">
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center text-white/80 hover:text-white transition"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="text-sm">Back</span>
        </button>
        <h1 className="text-2xl font-bold text-white mt-4">Create Account</h1>
        <p className="text-[#e8f4fd] text-sm opacity-80 mt-1">Join Medavize today</p>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-4 -mt-4 pt-4 pb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-[#d0dce8] p-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-[#0d1b2a] mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7c93]" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border border-[#d0dce8] rounded-xl focus:outline-none focus:border-[#0077cc] focus:ring-1 focus:ring-[#0077cc] bg-[#f4f8fb] text-[#0d1b2a]"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Contact Method Toggle */}
            <div>
              <label className="block text-sm font-medium text-[#0d1b2a] mb-2">
                Contact Method
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
                  placeholder="Create password"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-[#0d1b2a] mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7c93]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border border-[#d0dce8] rounded-xl focus:outline-none focus:border-[#0077cc] focus:ring-1 focus:ring-[#0077cc] bg-[#f4f8fb] text-[#0d1b2a]"
                  placeholder="Confirm password"
                />
              </div>
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded-lg border-[#d0dce8] text-[#0077cc] focus:ring-[#0077cc] focus:ring-2"
                />
                <span className="text-sm text-[#6b7c93]">
                  I agree to the{' '}
                  <Link to="/terms" className="text-[#0077cc] hover:text-[#0066b3] font-medium">
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-[#0077cc] hover:text-[#0066b3] font-medium">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0077cc] hover:bg-[#0066b3] text-white font-semibold py-4 rounded-xl transition disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
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

          {/* Sign In Link */}
          <p className="text-center text-sm text-[#6b7c93] mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-[#0077cc] hover:text-[#0066b3] font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
