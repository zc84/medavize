import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Database, Smartphone, Activity, FileText } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export function DataSourcesStep() {
  const navigate = useNavigate()
  const { updateOnboarding } = useAuth()

  // Scroll to top on mount
  useEffect(() => {
    document.getElementById('app-content')?.scrollTo(0, 0)
  }, [])

  const handleContinue = () => {
    document.getElementById('app-content')?.scrollTo(0, 0)
    updateOnboarding(2)
    navigate('/onboarding/apple-health')
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
          <span className="text-white text-sm font-medium">Step 2 of 7</span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-neutral-100 px-5 py-3 border-b border-neutral-200">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm font-medium">Data Sources</span>
            <span className="text-emerald-600 text-sm font-semibold">28%</span>
          </div>
          <div className="h-2 bg-white rounded-full">
            <div className="h-full w-[28%] bg-emerald-600 rounded-full transition-all"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-neutral-100 flex flex-col items-center justify-center px-5 py-10">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-emerald-50 rounded-full p-6">
                <Database className="w-12 h-12 text-emerald-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Connect Your Health Data
            </h1>
            <p className="text-muted-foreground">
              Medavize can pull data from multiple sources to give you a complete picture of your health.
            </p>
          </div>

          {/* Data Source Options */}
          <div className="space-y-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-card border-2 border-border">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <FileText className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Electronic Health Records</h3>
                  <p className="text-sm text-muted-foreground">Coming soon</p>
                </div>
                <span className="text-xs bg-neutral-200 text-neutral-600 px-2 py-1 rounded">Soon</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-card border-2 border-emerald-200">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <Smartphone className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Apple Health</h3>
                  <p className="text-sm text-muted-foreground">Sync from your iPhone</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-card border-2 border-emerald-200">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <Activity className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Google Health Connect</h3>
                  <p className="text-sm text-muted-foreground">Sync from your Android</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-card border-2 border-border">
              <div className="flex items-center gap-4">
                <div className="bg-neutral-100 p-3 rounded-lg">
                  <FileText className="w-5 h-5 text-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Manual Entry</h3>
                  <p className="text-sm text-muted-foreground">Input data yourself</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleContinue}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-full transition shadow-lg"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
