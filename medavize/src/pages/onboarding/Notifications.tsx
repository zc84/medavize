import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Bell, Check, Loader2 } from 'lucide-react'

export function NotificationsStep() {
  const navigate = useNavigate()
  const { updateOnboarding } = useAuth()
  const [isEnabling, setIsEnabling] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)

  // Scroll to top on mount
  useEffect(() => {
    document.getElementById('app-content')?.scrollTo(0, 0)
  }, [])

  const handleEnable = () => {
    setIsEnabling(true)
    // Simulate permission request
    setTimeout(() => {
      setIsEnabling(false)
      setIsEnabled(true)
      updateOnboarding(6, { notificationsEnabled: true })
      setTimeout(() => {
        document.getElementById('app-content')?.scrollTo(0, 0)
        navigate('/onboarding/subscription')
      }, 800)
    }, 1500)
  }

  const handleSkip = () => {
    document.getElementById('app-content')?.scrollTo(0, 0)
    updateOnboarding(6)
    navigate('/onboarding/subscription')
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
          <span className="text-white text-sm font-medium">Step 6 of 7</span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-neutral-100 px-5 py-3 border-b border-neutral-200">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm font-medium">Notifications</span>
            <span className="text-emerald-600 text-sm font-semibold">85%</span>
          </div>
          <div className="h-2 bg-white rounded-full">
            <div className="h-full w-[85%] bg-emerald-600 rounded-full transition-all"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-neutral-100 flex flex-col items-center justify-center px-5 py-10">
        <div className="max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="bg-emerald-50 rounded-full p-6">
                <Bell className="w-12 h-12 text-emerald-600" />
              </div>
              {isEnabled && (
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-2">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-4">
            Enable Notifications
          </h1>
          <p className="text-muted-foreground mb-8">
            Stay on top of your health with timely reminders and alerts.
          </p>

          {/* Notification Types */}
          <div className="space-y-3 mb-8 text-left">
            <div className="bg-white p-4 rounded-xl shadow-card flex items-center gap-4">
              <div className="bg-emerald-50 p-3 rounded-lg">
                <Bell className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Medication Reminders</h3>
                <p className="text-sm text-muted-foreground">Never miss a dose</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-card flex items-center gap-4">
              <div className="bg-emerald-50 p-3 rounded-lg">
                <Check className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Appointment Alerts</h3>
                <p className="text-sm text-muted-foreground">Get notified before visits</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-card flex items-center gap-4">
              <div className="bg-emerald-50 p-3 rounded-lg">
                <Bell className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Health Insights</h3>
                <p className="text-sm text-muted-foreground">Weekly health summaries</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 mb-8">
            <p className="text-sm text-muted-foreground">
              You can change notification preferences anytime in Settings
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleEnable}
              disabled={isEnabling || isEnabled}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-full transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
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
              className="w-full bg-transparent text-muted-foreground font-semibold py-3 rounded-full transition hover:text-foreground"
            >
              Not Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
