import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Heart, Clock, Shield, Sparkles } from 'lucide-react'

export function WelcomeStep() {
  const navigate = useNavigate()
  const { updateOnboarding } = useAuth()

  const handleNext = () => {
    updateOnboarding(1)
    navigate('/onboarding/data-sources')
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Progress */}
      <div className="bg-navy-900 px-6 py-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-semibold">Step 1 of 7</span>
            <span className="text-navy-300 text-sm">Welcome</span>
          </div>
          <div className="h-2 bg-navy-800 rounded-full">
            <div className="h-full w-[14%] bg-teal-500 rounded-full transition-all"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="max-w-md w-full text-center">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-full p-8">
                <Heart className="w-16 h-16 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-neutral-900 mb-4">
            Welcome to Medavize
          </h1>
          <p className="text-lg text-neutral-600 mb-8">
            Your companion in caregiving. We're here to help you spend less time managing care and more time being there.
          </p>

          {/* Feature Cards */}
          <div className="space-y-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
              <div className="bg-teal-100 p-3 rounded-lg">
                <Clock className="w-5 h-5 text-teal-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-neutral-900">Save Time</h3>
                <p className="text-sm text-neutral-600">Streamline your caregiving tasks</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
              <div className="bg-navy-100 p-3 rounded-lg">
                <Shield className="w-5 h-5 text-navy-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-neutral-900">Stay Secure</h3>
                <p className="text-sm text-neutral-600">HIPAA-level data protection</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 rounded-xl transition"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}
