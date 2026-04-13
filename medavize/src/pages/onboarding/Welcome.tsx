import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Heart, Clock, Shield, Sparkles } from 'lucide-react'
import { useEffect } from 'react'

export function WelcomeStep() {
  const navigate = useNavigate()
  const { updateOnboarding } = useAuth()

  // Scroll to top on mount
  useEffect(() => {
    document.getElementById('app-content')?.scrollTo(0, 0)
  }, [])

  const handleNext = () => {
    document.getElementById('app-content')?.scrollTo(0, 0)
    updateOnboarding(1)
    navigate('/onboarding/data-sources')
  }

  const handleCancel = () => {
    document.getElementById('app-content')?.scrollTo(0, 0)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header - Black */}
      <header className="bg-black px-5 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <img src="/logo-white.png" alt="Medavize" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold text-white">medavize</span>
          </Link>
          <span className="text-white text-sm font-medium">Step 1 of 7</span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-neutral-100 px-5 py-3 border-b border-neutral-200">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm font-medium">Welcome</span>
            <span className="text-emerald-600 text-sm font-semibold">14%</span>
          </div>
          <div className="h-2 bg-white rounded-full">
            <div className="h-full w-[14%] bg-emerald-600 rounded-full transition-all"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-neutral-100 flex flex-col items-center justify-center px-5 py-10">
        <div className="max-w-md w-full text-center">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full p-8">
                <Heart className="w-16 h-16 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-4">
            Welcome to Medavize
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Your companion in caregiving. We're here to help you spend less time managing care and more time being there.
          </p>

          {/* Feature Cards */}
          <div className="space-y-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-card flex items-center gap-4">
              <div className="bg-emerald-50 p-3 rounded-lg">
                <Clock className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-foreground">Save Time</h3>
                <p className="text-sm text-muted-foreground">Streamline your caregiving tasks</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-card flex items-center gap-4">
              <div className="bg-emerald-50 p-3 rounded-lg">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-foreground">Stay Secure</h3>
                <p className="text-sm text-muted-foreground">HIPAA-level data protection</p>
              </div>
            </div>
          </div>

          {/* Registration Consent */}
          <div className="bg-white p-4 rounded-xl shadow-card mb-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              By registering your account, you consent to our{' '}
              <a href="/terms" className="text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
              . You also agree to receive important updates about your account and health data.
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleNext}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-full transition shadow-lg"
            >
              Get Started
            </button>
            <button
              onClick={handleCancel}
              className="w-full bg-white border-2 border-border hover:border-emerald-600 text-muted-foreground hover:text-emerald-600 font-semibold py-4 rounded-full transition"
            >
              Cancel
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Need help? Contact us at{' '}
              <a href="mailto:support@medavize.com" className="text-emerald-600 hover:underline">
                support@medavize.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
