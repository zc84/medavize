import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Database, Smartphone, Activity, FileText } from 'lucide-react'

export function DataSourcesStep() {
  const navigate = useNavigate()
  const { updateOnboarding } = useAuth()

  const handleContinue = () => {
    updateOnboarding(2)
    navigate('/onboarding/apple-health')
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Progress */}
      <div className="bg-navy-900 px-6 py-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-semibold">Step 2 of 7</span>
            <span className="text-navy-300 text-sm">Data Sources</span>
          </div>
          <div className="h-2 bg-navy-800 rounded-full">
            <div className="h-full w-[28%] bg-teal-500 rounded-full transition-all"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-teal-100 rounded-full p-6">
                <Database className="w-12 h-12 text-teal-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">
              Connect Your Health Data
            </h1>
            <p className="text-neutral-600">
              Medavize can pull data from multiple sources to give you a complete picture of your health.
            </p>
          </div>

          {/* Data Source Options */}
          <div className="space-y-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm border-2 border-neutral-200">
              <div className="flex items-center gap-4">
                <div className="bg-navy-100 p-3 rounded-lg">
                  <FileText className="w-5 h-5 text-navy-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900">Electronic Health Records</h3>
                  <p className="text-sm text-neutral-500">Coming soon</p>
                </div>
                <span className="text-xs bg-neutral-200 text-neutral-600 px-2 py-1 rounded">Soon</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border-2 border-teal-200">
              <div className="flex items-center gap-4">
                <div className="bg-teal-100 p-3 rounded-lg">
                  <Smartphone className="w-5 h-5 text-teal-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900">Apple Health</h3>
                  <p className="text-sm text-neutral-500">Sync from your iPhone</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border-2 border-teal-200">
              <div className="flex items-center gap-4">
                <div className="bg-teal-100 p-3 rounded-lg">
                  <Activity className="w-5 h-5 text-teal-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900">Google Health Connect</h3>
                  <p className="text-sm text-neutral-500">Sync from your Android</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border-2 border-neutral-200">
              <div className="flex items-center gap-4">
                <div className="bg-neutral-100 p-3 rounded-lg">
                  <FileText className="w-5 h-5 text-neutral-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900">Manual Entry</h3>
                  <p className="text-sm text-neutral-500">Input data yourself</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleContinue}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 rounded-xl transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
