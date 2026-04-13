import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Bell, Check, Loader2 } from 'lucide-react'

export function NotificationsStep() {
  const navigate = useNavigate()
  const { updateOnboarding } = useAuth()
  const [isEnabling, setIsEnabling] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)

  const handleEnable = () => {
    setIsEnabling(true)
    // Simulate permission request
    setTimeout(() => {
      setIsEnabling(false)
      setIsEnabled(true)
      updateOnboarding(6, { notificationsEnabled: true })
      setTimeout(() => {
        navigate('/onboarding/subscription')
      }, 800)
    }, 1500)
  }

  const handleSkip = () => {
    updateOnboarding(6)
    navigate('/onboarding/subscription')
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Progress */}
      <div className="bg-navy-900 px-6 py-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-semibold">Step 6 of 7</span>
            <span className="text-navy-300 text-sm">Notifications</span>
          </div>
          <div className="h-2 bg-navy-800 rounded-full">
            <div className="h-full w-[85%] bg-teal-500 rounded-full transition-all"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="bg-teal-100 rounded-full p-6">
                <Bell className="w-12 h-12 text-teal-600" />
              </div>
              {isEnabled && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-neutral-900 mb-4">
            Enable Notifications
          </h1>
          <p className="text-neutral-600 mb-8">
            Stay on top of your health with timely reminders and alerts.
          </p>

          {/* Notification Types */}
          <div className="space-y-3 mb-8 text-left">
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
              <div className="bg-teal-100 p-3 rounded-lg">
                <Bell className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">Medication Reminders</h3>
                <p className="text-sm text-neutral-500">Never miss a dose</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
              <div className="bg-navy-100 p-3 rounded-lg">
                <Check className="w-5 h-5 text-navy-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">Appointment Alerts</h3>
                <p className="text-sm text-neutral-500">Get notified before visits</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Bell className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">Health Insights</h3>
                <p className="text-sm text-neutral-500">Weekly health summaries</p>
              </div>
            </div>
          </div>

          <div className="bg-neutral-100 rounded-lg p-4 mb-8">
            <p className="text-sm text-neutral-600">
              You can change notification preferences anytime in Settings
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleEnable}
              disabled={isEnabling || isEnabled}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 rounded-xl transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isEnabling ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Requesting permission...
                </>
              ) : isEnabled ? (
                <>
                  <Check className="w-5 h-5" />
                  Enabled!
                </>
              ) : (
                'Enable Notifications'
              )}
            </button>

            <button
              onClick={handleSkip}
              disabled={isEnabling}
              className="w-full bg-transparent text-neutral-500 font-semibold py-3 rounded-xl transition hover:text-neutral-700"
            >
              Not Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
