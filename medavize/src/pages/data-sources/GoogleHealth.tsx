import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Smartphone, Heart, Footprints, Moon, Activity as BloodPressure,
  CheckCircle, X, RefreshCw, ChevronLeft
} from 'lucide-react'
import { getGoogleHealthData, updateGoogleHealthData, disconnectGoogleHealth } from '../../services/storage'
import type { GoogleHealthData } from '../../types'

export function GoogleHealthPage() {
  const navigate = useNavigate()
  const [healthData, setHealthData] = useState<GoogleHealthData>(getGoogleHealthData())
  const [showPermission, setShowPermission] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)

  const handleConnect = () => {
    setShowPermission(true)
  }

  const handleAllow = async () => {
    setIsConnecting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    updateGoogleHealthData({
      connected: true,
      lastSynced: new Date().toISOString(),
      vitals: {
        heartRate: 68,
        steps: 10245,
        sleepHours: 6.8,
        bloodPressureSystolic: 122,
        bloodPressureDiastolic: 80
      }
    })
    
    setHealthData(getGoogleHealthData())
    setShowPermission(false)
    setIsConnecting(false)
  }

  const handleSync = async () => {
    setIsSyncing(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const current = healthData.vitals
    updateGoogleHealthData({
      lastSynced: new Date().toISOString(),
      vitals: {
        ...current,
        heartRate: current.heartRate + Math.floor(Math.random() * 10) - 5,
        steps: current.steps + Math.floor(Math.random() * 1000)
      }
    })
    
    setHealthData(getGoogleHealthData())
    setIsSyncing(false)
  }

  const handleDisconnect = () => {
    if (confirm('Disconnect Google Health?')) {
      disconnectGoogleHealth()
      setHealthData(getGoogleHealthData())
    }
  }

  const vitals = [
    { icon: <Heart className="w-5 h-5" />, label: 'Heart Rate', value: healthData.vitals.heartRate, unit: 'bpm', color: 'text-red-600', bg: 'bg-red-50' },
    { icon: <Footprints className="w-5 h-5" />, label: 'Steps', value: healthData.vitals.steps, unit: 'steps', color: 'text-orange-600', bg: 'bg-orange-50' },
    { icon: <Moon className="w-5 h-5" />, label: 'Sleep', value: healthData.vitals.sleepHours, unit: 'hours', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { icon: <BloodPressure className="w-5 h-5" />, label: 'Blood Pressure', value: `${healthData.vitals.bloodPressureSystolic}/${healthData.vitals.bloodPressureDiastolic}`, unit: 'mmHg', color: 'text-teal-600', bg: 'bg-teal-50' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Black */}
      <header className="bg-black px-5 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/data-sources')}
              className="flex items-center text-white hover:text-emerald-400 transition"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back
            </button>
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <img src="/logo-white.png" alt="Medavize" className="w-8 h-8 object-contain" />
              <span className="text-xl font-bold text-white">medavize</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="bg-neutral-100 px-5 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-emerald-500 rounded-xl p-3">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Google Health</h1>
              <p className="text-muted-foreground">Sync with Health Connect</p>
            </div>
          </div>

          {healthData.connected ? (
            <div className="space-y-6">
              {/* Connected Status */}
              <div className="bg-white rounded-2xl shadow-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-100 rounded-full p-2">
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">Connected</h2>
                      <p className="text-muted-foreground">
                        Last synced: {new Date(healthData.lastSynced!).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSync}
                      disabled={isSyncing}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition disabled:opacity-50"
                    >
                      <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                      {isSyncing ? 'Syncing...' : 'Sync Now'}
                    </button>
                    <button
                      onClick={handleDisconnect}
                      className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <X className="w-4 h-4" />
                      Disconnect
                    </button>
                  </div>
                </div>

                {/* Vitals Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {vitals.map((vital, i) => (
                    <div key={i} className={`${vital.bg} rounded-xl p-4`}>
                      <div className={`${vital.color} mb-2`}>{vital.icon}</div>
                      <p className="text-sm text-muted-foreground">{vital.label}</p>
                      <p className="text-2xl font-bold text-foreground">{vital.value}</p>
                      <p className="text-xs text-muted-foreground">{vital.unit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-card p-8 text-center">
              <div className="bg-emerald-50 rounded-full p-4 w-fit mx-auto mb-4">
                <Smartphone className="w-12 h-12 text-emerald-600" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Connect Google Health
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Sync your health data from Android Health Connect including heart rate, steps, sleep, and blood pressure.
              </p>
              <button
                onClick={handleConnect}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
              >
                Connect Google Health
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Permission Modal */}
      {showPermission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-50 rounded-full p-2">
                <Smartphone className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Health Connect Permissions
              </h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Medavize would like to access the following health data:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-foreground">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Heart Rate
              </li>
              <li className="flex items-center gap-2 text-foreground">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Steps & Activity
              </li>
              <li className="flex items-center gap-2 text-foreground">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Sleep Analysis
              </li>
              <li className="flex items-center gap-2 text-foreground">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Blood Pressure
              </li>
            </ul>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPermission(false)}
                className="flex-1 py-3 border border-border rounded-lg hover:bg-neutral-50 transition"
              >
                Don't Allow
              </button>
              <button
                onClick={handleAllow}
                disabled={isConnecting}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition disabled:opacity-50"
              >
                {isConnecting ? 'Connecting...' : 'Allow'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
