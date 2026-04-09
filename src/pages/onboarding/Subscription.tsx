import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Crown, Check, Sparkles, Loader2 } from 'lucide-react'

export function SubscriptionStep() {
  const navigate = useNavigate()
  const { setSubscriptionStatus, completeOnboarding } = useAuth()
  const [isStartingTrial, setIsStartingTrial] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleStartTrial = () => {
    setIsStartingTrial(true)
    setSubscriptionStatus('trial')
    
    setTimeout(() => {
      setIsStartingTrial(false)
      setShowSuccess(true)
      completeOnboarding()
      
      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
    }, 1000)
  }

  const handleRestore = () => {
    // Mock restore - always fails for demo
    alert('No previous purchases found')
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Progress */}
      <div className="bg-navy-900 px-6 py-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-semibold">Step 7 of 7</span>
            <span className="text-navy-300 text-sm">Subscription</span>
          </div>
          <div className="h-2 bg-navy-800 rounded-full">
            <div className="h-full w-[100%] bg-teal-500 rounded-full transition-all"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-full p-6">
                <Crown className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-neutral-900 mb-4">
            Start Your Free Trial
          </h1>
          <p className="text-neutral-600 mb-8">
            Get full access to all premium features for 30 days. No commitment. Cancel anytime.
          </p>

          {/* Pricing Card */}
          <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl p-6 shadow-lg mb-6 text-white text-left">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Premium Plan</h2>
                <p className="text-teal-100">Monthly subscription</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">$9.99</div>
                <div className="text-sm text-teal-100">/month</div>
              </div>
            </div>

            <div className="border-t border-white/20 pt-4 space-y-3">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">Unlimited health tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">Advanced health insights</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">Doctor visit preparation</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">Priority support</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">Data export & sharing</span>
              </div>
            </div>
          </div>

          {/* Trial Badge */}
          <div className="bg-teal-50 rounded-xl p-4 mb-6 text-center">
            <div className="inline-flex items-center gap-2 bg-teal-100 px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-semibold text-teal-700">30-day free trial</span>
            </div>
            <p className="text-sm text-neutral-600 mt-3">
              After your trial, $9.99/month will be charged unless you cancel
            </p>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-green-700 font-medium">
                Trial started successfully! Redirecting...
              </p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handleStartTrial}
              disabled={isStartingTrial || showSuccess}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 rounded-xl transition disabled:opacity-50 flex items-center justify-center gap-2"
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
              className="w-full bg-transparent text-neutral-500 font-semibold py-3 rounded-xl transition hover:text-neutral-700"
            >
              Restore Purchases
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
