import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Smartphone, Check, Loader2 } from 'lucide-react'

export function AppleHealthStep() {
  const navigate = useNavigate()
  const { updateOnboarding } = useAuth()
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const handleConnect = () => {
    setIsConnecting(true)
    // Simulate connection
    setTimeout(() => {
      setIsConnecting(false)
      setIsConnected(true)
      updateOnboarding(3, { appleHealthConnected: true })
      setTimeout(() => {
        navigate('/onboarding/google-health')
      }, 1000)
    }, 1500)
  }

  const handleSkip = () => {
    updateOnboarding(3)
    navigate('/onboarding/google-health')
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Progress */}
      <div className="bg-navy-900 px-6 py-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-semibold">Step 3 of 7</span>
            <span className="text-navy-300 text-sm">Apple Health</span>
          </div>
          <div className="h-2 bg-navy-800 rounded-full">
            <div className="h-full w-[42%] bg-teal-500 rounded-full transition-all"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-navy-600 to-navy-800 rounded-full p-6">
              <Smartphone className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-neutral-900 mb-4">
            Connect Apple Health
          </h1>
          <p className="text-neutral-600 mb-8">
            Sync your health data from your iPhone to get a complete picture of your vitals.
          </p>

          {/* Mock Permission Dialog */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 text-left">
            <div className="bg-navy-900 px-4 py-3">
              <p className="text-white font-semibold">"Medavize" Would Like to Access:</p>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-teal-600" />
                <span className="text-neutral-700">Heart Rate</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-teal-600" />
                <span className="text-neutral-700">Blood Pressure</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-teal-600" />
                <span className="text-neutral-700">Steps</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-teal-600" />
                <span className="text-neutral-700">Sleep Analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-teal-600" />
                <span className="text-neutral-700">Weight</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleConnect}
              disabled={isConnecting || isConnected}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 rounded-xl transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Connecting...
                </>
              ) : isConnected ? (
                <>
                  <Check className="w-5 h-5" />
                  Connected!
                </>
              ) : (
                'Connect Apple Health'
              )}
            </button>

            <button
              onClick={handleSkip}
              disabled={isConnecting}
              className="w-full bg-transparent text-neutral-500 font-semibold py-3 rounded-xl transition hover:text-neutral-700"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
