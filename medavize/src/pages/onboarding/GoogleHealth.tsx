import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Activity, Check, Loader2 } from 'lucide-react'

export function GoogleHealthStep() {
  const navigate = useNavigate()
  const { updateOnboarding } = useAuth()
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  // Scroll to top on mount
  useEffect(() => {
    document.getElementById('app-content')?.scrollTo(0, 0)
  }, [])

  const handleConnect = () => {
    setIsConnecting(true)
    // Simulate connection
    setTimeout(() => {
      setIsConnecting(false)
      setIsConnected(true)
      updateOnboarding(4, { googleHealthConnected: true })
      setTimeout(() => {
        document.getElementById('app-content')?.scrollTo(0, 0)
        navigate('/onboarding/vitals')
      }, 1000)
    }, 1500)
  }

  const handleSkip = () => {
    document.getElementById('app-content')?.scrollTo(0, 0)
    updateOnboarding(4)
    navigate('/onboarding/vitals')
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
          <span className="text-white text-sm font-medium">Step 4 of 7</span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-neutral-100 px-5 py-3 border-b border-neutral-200">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm font-medium">Google Health</span>
            <span className="text-emerald-600 text-sm font-semibold">56%</span>
          </div>
          <div className="h-2 bg-white rounded-full">
            <div className="h-full w-[56%] bg-emerald-600 rounded-full transition-all"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-neutral-100 flex flex-col items-center justify-center px-5 py-10">
        <div className="max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full p-6">
              <Activity className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-4">
            Connect Google Health Connect
          </h1>
          <p className="text-muted-foreground mb-8">
            Sync your health data from your Android device to track your vitals automatically.
          </p>

          {/* Mock Permission Dialog */}
          <div className="bg-white rounded-xl shadow-card overflow-hidden mb-8 text-left">
            <div className="bg-black px-4 py-3">
              <p className="text-white font-semibold">"Medavize" Would Like to Access:</p>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-600" />
                <span className="text-foreground">Heart Rate</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-600" />
                <span className="text-foreground">Blood Pressure</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-600" />
                <span className="text-foreground">Steps</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-600" />
                <span className="text-foreground">Sleep Data</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-600" />
                <span className="text-foreground">Weight</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleConnect}
              disabled={isConnecting || isConnected}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-full transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
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
                'Connect Google Health'
              )}
            </button>

            <button
              onClick={handleSkip}
              disabled={isConnecting}
              className="w-full bg-transparent text-muted-foreground font-semibold py-3 rounded-full transition hover:text-foreground"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
