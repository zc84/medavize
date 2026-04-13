import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Activity, Loader2 } from 'lucide-react'
import type { Vitals } from '../../types'

export function VitalsStep() {
  const navigate = useNavigate()
  const { updateOnboarding, updateVitals } = useAuth()
  const [isSaving, setIsSaving] = useState(false)
  
  // Default friendly values pre-filled
  const [systolic, setSystolic] = useState('120')
  const [diastolic, setDiastolic] = useState('80')
  const [heartRate, setHeartRate] = useState('72')
  const [weight, setWeight] = useState('70')
  const [height, setHeight] = useState('170')

  // Scroll to top on mount
  useEffect(() => {
    document.getElementById('app-content')?.scrollTo(0, 0)
  }, [])

  const handleSkip = () => {
    // Save default vitals and skip
    const defaultVitals: Partial<Vitals> = {
      bloodPressure: { systolic: 120, diastolic: 80, unit: 'mmHg' },
      heartRate: { value: 72, unit: 'bpm' },
      weight: { value: 70, unit: 'kg' },
      height: { value: 170, unit: 'cm' },
    }
    updateVitals(defaultVitals)
    updateOnboarding(5)
    document.getElementById('app-content')?.scrollTo(0, 0)
    navigate('/onboarding/notifications')
  }

  const handleSave = async () => {
    setIsSaving(true)
    
    // Parse values, fall back to defaults if empty/invalid
    const vitals: Partial<Vitals> = {
      bloodPressure: {
        systolic: parseInt(systolic) || 120,
        diastolic: parseInt(diastolic) || 80,
        unit: 'mmHg',
      },
      heartRate: {
        value: parseInt(heartRate) || 72,
        unit: 'bpm',
      },
      weight: {
        value: parseInt(weight) || 70,
        unit: 'kg',
      },
      height: {
        value: parseInt(height) || 170,
        unit: 'cm',
      },
    }
    
    updateVitals(vitals)
    
    // Simulate save delay
    setTimeout(() => {
      updateOnboarding(5)
      setIsSaving(false)
      document.getElementById('app-content')?.scrollTo(0, 0)
      navigate('/onboarding/notifications')
    }, 800)
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
          <span className="text-white text-sm font-medium">Step 5 of 7</span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-neutral-100 px-5 py-3 border-b border-neutral-200">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm font-medium">Vitals</span>
            <span className="text-emerald-600 text-sm font-semibold">70%</span>
          </div>
          <div className="h-2 bg-white rounded-full">
            <div className="h-full w-[70%] bg-emerald-600 rounded-full transition-all"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-neutral-100 flex flex-col items-center justify-center px-5 py-10">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-emerald-50 rounded-full p-6">
                <Activity className="w-12 h-12 text-emerald-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Enter Your Vitals
            </h1>
            <p className="text-muted-foreground">
              This helps us establish your baseline health metrics.
            </p>
          </div>

          <div className="space-y-5 mb-8">
            {/* Blood Pressure */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Blood Pressure (mmHg)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="number"
                    value={systolic}
                    onChange={(e) => setSystolic(e.target.value)}
                    placeholder="Systolic"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white text-foreground"
                  />
                </div>
                <span className="py-3 text-muted-foreground">/</span>
                <div className="flex-1">
                  <input
                    type="number"
                    value={diastolic}
                    onChange={(e) => setDiastolic(e.target.value)}
                    placeholder="Diastolic"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white text-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Heart Rate */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Heart Rate (bpm)
              </label>
              <input
                type="number"
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
                placeholder="e.g., 72"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white text-foreground"
              />
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g., 70"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white text-foreground"
              />
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Height (cm)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g., 175"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white text-foreground"
              />
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-full transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save & Continue'
              )}
            </button>

            <button
              onClick={handleSkip}
              disabled={isSaving}
              className="w-full bg-transparent text-muted-foreground font-semibold py-3 rounded-full transition hover:text-foreground"
            >
              Skip (I will add later)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
