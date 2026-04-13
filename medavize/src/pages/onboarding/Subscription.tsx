import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Crown, Check, Sparkles, Loader2 } from 'lucide-react'

export function SubscriptionStep() {
  const navigate = useNavigate()
  const { setSubscriptionStatus, completeOnboarding } = useAuth()
  const [isStartingTrial, setIsStartingTrial] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Scroll to top on mount
  useEffect(() => {
    document.getElementById('app-content')?.scrollTo(0, 0)
  }, [])

  const handleStartTrial = () => {
    setIsStartingTrial(true)
    setSubscriptionStatus('trial')
    
    setTimeout(() => {
      setIsStartingTrial(false)
      setShowSuccess(true)
      completeOnboarding()
      
      setTimeout(() => {
        document.getElementById('app-content')?.scrollTo(0, 0)
        navigate('/dashboard')
      }, 1500)
    }, 1000)
  }

  const handleRestore = () => {
    // Mock restore - always fails for demo
    alert('No previous purchases found')
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
          <span className="text-white text-sm font-medium">Step 7 of 7</span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-neutral-100 px-5 py-3 border-b border-neutral-200">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm font-medium">Subscription</span>
            <span className="text-emerald-600 text-sm font-semibold">100%</span>
          </div>
          <div className="h-2 bg-white rounded-full">
            <div className="h-full w-[100%] bg-emerald-600 rounded-full transition-all"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-neutral-100 flex flex-col items-center justify-center px-5 py-10">
        <div className="max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full p-6">
                <Crown className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-4">
            Start Your Free Trial
          </h1>
          <p className="text-muted-foreground mb-8">
            Get full access to all premium features for 30 days. No commitment. Cancel anytime.
          </p>

          {/* Pricing Card */}
          <div className="bg-white rounded-2xl p-5 shadow-card mb-6 text-left border border-emerald-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-foreground">Premium Plan</h2>
                <p className="text-sm text-muted-foreground">Monthly subscription</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-600">$9.99</div>
                <div className="text-xs text-muted-foreground">/month</div>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-4 space-y-2">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-sm text-foreground">Unlimited health tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-sm text-foreground">Advanced health insights</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-sm text-foreground">Doctor visit preparation</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-sm text-foreground">Priority support</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-sm text-foreground">Data export & sharing</span>
              </div>
            </div>
          </div>

          {/* Trial Badge */}
          <div className="bg-emerald-50 rounded-xl p-4 mb-6 text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">30-day free trial</span>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              After your trial, $9.99/month will be charged unless you cancel
            </p>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-emerald-700 font-medium">
                Trial started successfully! Redirecting...
              </p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handleStartTrial}
              disabled={isStartingTrial || showSuccess}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-full transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
            >
              {isStartingTrial ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Starting Trial...
                </>
              ) : (
                'Start Free Trial'
              )}
            </button>

            <button
              onClick={handleRestore}
              disabled={isStartingTrial || showSuccess}
              className="w-full bg-transparent text-muted-foreground font-semibold py-3 rounded-full transition hover:text-foreground"
            >
              Restore Purchases
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
