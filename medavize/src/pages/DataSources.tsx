import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Database, Activity, Smartphone, Stethoscope,
  FileText, Mic, Type, Camera, RefreshCw, ChevronRight,
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
  const [isSyncing, setIsSyncing] = useState(false)
  
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
    <div className="h-full flex flex-col bg-[#f4f8fb] relative">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#0a3d62] to-[#0077cc] px-5 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Data Sources</h1>
            <p className="text-[#e8f4fd] text-sm opacity-80 mt-1">
              Manage your health connections
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
        </div>
        
        {/* Summary Card */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-xl p-2.5">
                <Database className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-white/70">Connected</p>
                <p className="text-lg font-bold text-white">
                  {dataSources.filter(s => s.connected).length}/{dataSources.length}
                </p>
              </div>
            </div>
            <button
              onClick={handleSyncAll}
              disabled={isSyncing}
              className="flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Sync All'}
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        {/* Data Sources List */}
        <div className="space-y-3">
          {dataSources.map((source) => (
            <button
              key={source.id}
              onClick={() => handleManage(source.id)}
              className="w-full bg-white rounded-xl border border-[#d0dce8] p-4 flex items-center gap-4 hover:shadow-md transition active:scale-[0.98]"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                source.connected ? 'bg-[#0077cc]/10 text-[#0077cc]' : 'bg-[#e8f0f7] text-[#6b7c93]'
              }`}>
                {source.icon}
              </div>
              
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-[#0d1b2a] text-sm">{source.name}</h3>
                <p className="text-xs text-[#6b7c93] mt-0.5">
                  {source.connected ? `${source.count} items • ${formatLastSync(source.lastSynced)}` : 'Not connected'}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                {source.connected ? (
                  <CheckCircle className="w-5 h-5 text-[#2ecc71]" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-[#d0dce8]" />
                )}
                <ChevronRight className="w-5 h-5 text-[#6b7c93]" />
              </div>
            </button>
          ))}
        </div>
        
        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="mt-6 w-full flex items-center justify-center gap-2 py-3 text-[#6b7c93] hover:text-[#0077cc] transition"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="text-sm">Reset Demo Data</span>
        </button>
      </div>
    </div>
  )
}
