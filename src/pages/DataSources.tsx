import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Database, Activity, Smartphone, Stethoscope,
  FileText, Mic, Type, Camera, RefreshCw, ChevronRight,
  CheckCircle, XCircle, Clock, RotateCcw
} from 'lucide-react'
import {
  getEHRData, getAppleHealthData, getGoogleHealthData,
  getManualVitals, getDocuments, getAudioRecordings,
  getTextNotes, getScannedDocuments
} from '../services/storage'

interface DataSourceStatus {
  id: string
  name: string
  icon: React.ReactNode
  connected: boolean
  lastSynced: string | null
  count: number
  color: string
}

export function DataSources() {
  const navigate = useNavigate()
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  
  const [dataSources, setDataSources] = useState<DataSourceStatus[]>([
    { id: 'ehr', name: 'EHR (Particle Health)', icon: <Database className="w-6 h-6" />, connected: false, lastSynced: null, count: 0, color: 'bg-blue-500' },
    { id: 'apple', name: 'Apple Health', icon: <Activity className="w-6 h-6" />, connected: false, lastSynced: null, count: 0, color: 'bg-pink-500' },
    { id: 'google', name: 'Google Health', icon: <Smartphone className="w-6 h-6" />, connected: false, lastSynced: null, count: 0, color: 'bg-green-500' },
    { id: 'vitals', name: 'Manual Vitals', icon: <Stethoscope className="w-6 h-6" />, connected: false, lastSynced: null, count: 0, color: 'bg-teal-500' },
    { id: 'documents', name: 'Documents', icon: <FileText className="w-6 h-6" />, connected: false, lastSynced: null, count: 0, color: 'bg-orange-500' },
    { id: 'audio', name: 'Audio Recordings', icon: <Mic className="w-6 h-6" />, connected: false, lastSynced: null, count: 0, color: 'bg-purple-500' },
    { id: 'notes', name: 'Text Notes', icon: <Type className="w-6 h-6" />, connected: false, lastSynced: null, count: 0, color: 'bg-indigo-500' },
    { id: 'scans', name: 'Scanned Documents', icon: <Camera className="w-6 h-6" />, connected: false, lastSynced: null, count: 0, color: 'bg-cyan-500' },
  ])

  const loadDataSources = () => {
    const ehr = getEHRData()
    const apple = getAppleHealthData()
    const google = getGoogleHealthData()
    const vitals = getManualVitals()
    const docs = getDocuments()
    const audio = getAudioRecordings()
    const notes = getTextNotes()
    const scans = getScannedDocuments()

    setDataSources([
      { id: 'ehr', name: 'EHR (Particle Health)', icon: <Database className="w-6 h-6" />, connected: ehr.connected, lastSynced: ehr.lastSynced, count: ehr.conditions.length + ehr.medications.length + ehr.labs.length, color: 'bg-blue-500' },
      { id: 'apple', name: 'Apple Health', icon: <Activity className="w-6 h-6" />, connected: apple.connected, lastSynced: apple.lastSynced, count: apple.connected ? Object.values(apple.vitals).filter(v => v > 0).length : 0, color: 'bg-pink-500' },
      { id: 'google', name: 'Google Health', icon: <Smartphone className="w-6 h-6" />, connected: google.connected, lastSynced: google.lastSynced, count: google.connected ? Object.values(google.vitals).filter(v => v > 0).length : 0, color: 'bg-green-500' },
      { id: 'vitals', name: 'Manual Vitals', icon: <Stethoscope className="w-6 h-6" />, connected: vitals.length > 0, lastSynced: vitals[0]?.timestamp || null, count: vitals.length, color: 'bg-teal-500' },
      { id: 'documents', name: 'Documents', icon: <FileText className="w-6 h-6" />, connected: docs.length > 0, lastSynced: docs[0]?.uploadedAt || null, count: docs.length, color: 'bg-orange-500' },
      { id: 'audio', name: 'Audio Recordings', icon: <Mic className="w-6 h-6" />, connected: audio.length > 0, lastSynced: audio[0]?.recordedAt || null, count: audio.length, color: 'bg-purple-500' },
      { id: 'notes', name: 'Text Notes', icon: <Type className="w-6 h-6" />, connected: notes.length > 0, lastSynced: notes[0]?.createdAt || null, count: notes.length, color: 'bg-indigo-500' },
      { id: 'scans', name: 'Scanned Documents', icon: <Camera className="w-6 h-6" />, connected: scans.length > 0, lastSynced: scans[0]?.uploadedAt || null, count: scans.length, color: 'bg-cyan-500' },
    ])
    setLastUpdated(new Date())
  }

  useEffect(() => {
    loadDataSources()
  }, [])

  const handleSyncAll = async () => {
    setIsSyncing(true)
    // Simulate sync delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    loadDataSources()
    setIsSyncing(false)
  }

  const handleReset = () => {
    if (confirm('Reset all demo data? This will clear all data sources.')) {
      localStorage.removeItem('medavize_mock_db')
      window.location.reload()
    }
  }

  const handleManage = (sourceId: string) => {
    const routes: Record<string, string> = {
      'ehr': '/data-sources/ehr',
      'apple': '/data-sources/apple-health',
      'google': '/data-sources/google-health',
      'vitals': '/data-sources/manual-vitals',
      'documents': '/data-sources/documents',
      'audio': '/data-sources/audio',
      'notes': '/data-sources/text-notes',
      'scans': '/data-sources/scans',
    }
    navigate(routes[sourceId] || '/data-sources')
  }

  const formatLastSync = (timestamp: string | null) => {
    if (!timestamp) return 'Never'
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    if (hours < 1) return 'Just now'
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-navy-900 px-6 pt-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Data Sources</h1>
              <p className="text-navy-200 mt-2">
                Manage all your health data connections
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 text-navy-200 hover:text-white transition"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Demo
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-8">
        <div className="max-w-6xl mx-auto">
          {/* Summary Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-teal-100 rounded-xl p-3">
                  <Database className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Overall Data Status</p>
                  <p className="text-lg font-semibold text-neutral-900">
                    {dataSources.filter(s => s.connected).length} of {dataSources.length} sources connected
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-neutral-500">Last Updated</p>
                  <p className="text-sm font-medium text-neutral-700 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatLastSync(lastUpdated.toISOString())}
                  </p>
                </div>
                <button
                  onClick={handleSyncAll}
                  disabled={isSyncing}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  {isSyncing ? 'Syncing...' : 'Sync All'}
                </button>
              </div>
            </div>
          </div>

          {/* Data Sources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dataSources.map((source) => (
              <div
                key={source.id}
                className="bg-white rounded-xl shadow-sm border border-neutral-200 p-5 hover:shadow-md transition cursor-pointer"
                onClick={() => handleManage(source.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${source.color} text-white rounded-lg p-2`}>
                    {source.icon}
                  </div>
                  {source.connected ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-neutral-300" />
                  )}
                </div>
                
                <h3 className="font-semibold text-neutral-900 mb-1">{source.name}</h3>
                <p className="text-sm text-neutral-500 mb-3">
                  {source.connected ? `${source.count} items` : 'Not connected'}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400">
                    {formatLastSync(source.lastSynced)}
                  </span>
                  <button className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center gap-1">
                    Manage
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
