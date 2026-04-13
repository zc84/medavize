import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Database, Activity, Smartphone, Stethoscope,
  FileText, Mic, Type, Camera, ChevronRight,
  CheckCircle, RotateCcw
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
  }

  useEffect(() => {
    loadDataSources()
  }, [])

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
    <div className="min-h-full flex flex-col bg-white relative">
      {/* Header - Black */}
      <header className="bg-black px-5 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <img src="/logo-white.png" alt="Medavize" className="w-8 h-8 object-contain" />
            <h1 className="text-xl font-bold text-white">Data Sources</h1>
          </Link>
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 bg-white px-5 py-6 overflow-y-auto pb-24">
        {/* Summary Card */}
        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl p-5 mb-6 border border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground mb-1">Connected Sources</h2>
              <p className="text-sm text-muted-foreground">Manage your health data connections</p>
            </div>
            <button
              onClick={handleReset}
              className="bg-white border border-emerald-300 text-emerald-700 hover:bg-emerald-50 px-4 py-2 rounded-lg transition text-sm font-medium flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset All
            </button>
          </div>
        </div>

        {/* Data Sources List */}
        <div className="space-y-3">
          {dataSources.map((source) => (
            <button
              key={source.id}
              onClick={() => handleManage(source.id)}
              className="w-full bg-white rounded-xl border border-border p-4 flex items-center gap-4 hover:shadow-card transition active:scale-[0.98]"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                source.connected ? 'bg-emerald-100 text-emerald-600' : 'bg-neutral-100 text-muted-foreground'
              }`}>
                {source.icon}
              </div>
              
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-foreground text-sm">{source.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {source.connected ? `${source.count} items • ${formatLastSync(source.lastSynced)}` : 'Not connected'}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                {source.connected ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-border" />
                )}
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
        
        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="mt-6 w-full flex items-center justify-center gap-2 py-3 text-muted-foreground hover:text-emerald-600 transition"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="text-sm">Reset Demo Data</span>
        </button>
      </div>
    </div>
  )
}
