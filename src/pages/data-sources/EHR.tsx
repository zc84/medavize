import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Database, Search, CheckCircle, X, RefreshCw, ChevronLeft,
  Building2, Pill, FlaskConical, AlertTriangle
} from 'lucide-react'
import { getEHRData, updateEHRData, disconnectEHR } from '../../services/storage'
import type { EHRData } from '../../types'

const MOCK_PROVIDERS = [
  'City General Hospital',
  'Valley Medical Center',
  'Springfield Clinic',
  'Metro Health System',
  'Regional Medical Group'
]

const MOCK_EHR_DATA = {
  conditions: ['Hypertension', 'Type 2 Diabetes'],
  medications: ['Lisinopril 10mg', 'Metformin 500mg'],
  labs: [
    { name: 'HbA1c', value: 7.2, unit: '%', date: '2026-03-15' },
    { name: 'LDL Cholesterol', value: 110, unit: 'mg/dL', date: '2026-03-15' },
    { name: 'Blood Pressure', value: 128, unit: 'mmHg', date: '2026-03-15' }
  ]
}

export function EHRPage() {
  const navigate = useNavigate()
  const [ehrData, setEhrData] = useState<EHRData>(getEHRData())
  const [isConnecting, setIsConnecting] = useState(false)
  const [showConsent, setShowConsent] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProvider, setSelectedProvider] = useState('')
  const [isSyncing, setIsSyncing] = useState(false)

  const filteredProviders = MOCK_PROVIDERS.filter(p =>
    p.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleConnect = (provider: string) => {
    setSelectedProvider(provider)
    setShowConsent(true)
  }

  const handleApprove = async () => {
    setIsConnecting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    updateEHRData({
      connected: true,
      providerName: selectedProvider,
      lastSynced: new Date().toISOString(),
      ...MOCK_EHR_DATA
    })
    
    setEhrData(getEHRData())
    setShowConsent(false)
    setIsConnecting(false)
    setSearchQuery('')
  }

  const handleSync = async () => {
    setIsSyncing(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    updateEHRData({ lastSynced: new Date().toISOString() })
    setEhrData(getEHRData())
    setIsSyncing(false)
  }

  const handleDisconnect = () => {
    if (confirm('Disconnect from EHR? All imported data will be removed.')) {
      disconnectEHR()
      setEhrData(getEHRData())
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-navy-900 px-6 pt-8 pb-12">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/data-sources')}
            className="flex items-center text-white hover:text-teal-300 transition mb-4"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Data Sources
          </button>
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 rounded-xl p-3">
              <Database className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">EHR Integration</h1>
              <p className="text-navy-200">Connect via Particle Health</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-6">
        <div className="max-w-4xl mx-auto">
          {ehrData.connected ? (
            <div className="space-y-6">
              {/* Connected Status */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 rounded-full p-2">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-neutral-900">
                        Connected to {ehrData.providerName}
                      </h2>
                      <p className="text-neutral-500">
                        Last synced: {new Date(ehrData.lastSynced!).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSync}
                      disabled={isSyncing}
                      className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition disabled:opacity-50"
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

                {/* Data Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-blue-900">Conditions</h3>
                    </div>
                    <ul className="space-y-1">
                      {ehrData.conditions.map((c, i) => (
                        <li key={i} className="text-sm text-blue-700">{c}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Pill className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold text-green-900">Medications</h3>
                    </div>
                    <ul className="space-y-1">
                      {ehrData.medications.map((m, i) => (
                        <li key={i} className="text-sm text-green-700">{m}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FlaskConical className="w-5 h-5 text-purple-600" />
                      <h3 className="font-semibold text-purple-900">Lab Results</h3>
                    </div>
                    <ul className="space-y-1">
                      {ehrData.labs.map((lab, i) => (
                        <li key={i} className="text-sm text-purple-700">
                          {lab.name}: {lab.value} {lab.unit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                Search Healthcare Provider
              </h2>
              
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for hospital or clinic..."
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-2">
                {filteredProviders.map((provider) => (
                  <button
                    key={provider}
                    onClick={() => handleConnect(provider)}
                    className="w-full flex items-center gap-3 p-4 border border-neutral-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition text-left"
                  >
                    <Building2 className="w-5 h-5 text-neutral-400" />
                    <span className="font-medium text-neutral-900">{provider}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Consent Modal */}
      {showConsent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Authorize Data Access
            </h3>
            <p className="text-neutral-600 mb-4">
              {selectedProvider} is requesting access to:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-neutral-700">
                <CheckCircle className="w-4 h-4 text-teal-600" />
                Medical Conditions
              </li>
              <li className="flex items-center gap-2 text-neutral-700">
                <CheckCircle className="w-4 h-4 text-teal-600" />
                Current Medications
              </li>
              <li className="flex items-center gap-2 text-neutral-700">
                <CheckCircle className="w-4 h-4 text-teal-600" />
                Lab Test Results
              </li>
            </ul>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConsent(false)}
                className="flex-1 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition"
              >
                Deny
              </button>
              <button
                onClick={handleApprove}
                disabled={isConnecting}
                className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition disabled:opacity-50"
              >
                {isConnecting ? 'Connecting...' : 'Approve'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
