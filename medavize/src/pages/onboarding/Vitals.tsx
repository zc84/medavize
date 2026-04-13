import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
      navigate('/onboarding/notifications')
    }, 800)
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Progress */}
      <div className="bg-navy-900 px-6 py-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-semibold">Step 5 of 7</span>
            <span className="text-navy-300 text-sm">Vitals</span>
          </div>
          <div className="h-2 bg-navy-800 rounded-full">
            <div className="h-full w-[70%] bg-teal-500 rounded-full transition-all"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-teal-100 rounded-full p-6">
                <Activity className="w-12 h-12 text-teal-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">
              Enter Your Vitals
            </h1>
            <p className="text-neutral-600">
              This helps us establish your baseline health metrics.
            </p>
          </div>

          <div className="space-y-5 mb-8">
            {/* Blood Pressure */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Blood Pressure (mmHg)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="number"
                    value={systolic}
                    onChange={(e) => setSystolic(e.target.value)}
                    placeholder="Systolic"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <span className="py-3 text-neutral-400">/</span>
                <div className="flex-1">
                  <input
                    type="number"
                    value={diastolic}
                    onChange={(e) => setDiastolic(e.target.value)}
                    placeholder="Diastolic"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>

            {/* Heart Rate */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Heart Rate (bpm)
              </label>
              <input
                type="number"
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
                placeholder="e.g., 72"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g., 70"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Height (cm)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g., 175"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 rounded-xl transition disabled:opacity-50 flex items-center justify-center gap-2"
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
              className="w-full bg-transparent text-neutral-500 font-semibold py-3 rounded-xl transition hover:text-neutral-700"
            >
              Skip (use defaults)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
