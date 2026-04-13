import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Stethoscope, Plus, Trash2, ChevronLeft, Save, Activity
} from 'lucide-react'
import { getManualVitals, addManualVitals, deleteManualVitals } from '../../services/storage'
import type { ManualVitalsEntry } from '../../types'

export function ManualVitalsPage() {
  const navigate = useNavigate()
  const [vitals, setVitals] = useState<ManualVitalsEntry[]>(getManualVitals())
  const [showForm, setShowForm] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState({
    systolic: '',
    diastolic: '',
    heartRate: '',
    weight: '',
    height: '',
    bloodGlucose: '',
    spo2: '',
    temperature: '',
    respiratoryRate: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (formData.systolic && (parseInt(formData.systolic) < 60 || parseInt(formData.systolic) > 250)) {
      newErrors.systolic = 'Systolic must be between 60-250 mmHg'
    }
    if (formData.diastolic && (parseInt(formData.diastolic) < 40 || parseInt(formData.diastolic) > 150)) {
      newErrors.diastolic = 'Diastolic must be between 40-150 mmHg'
    }
    if (formData.heartRate && (parseInt(formData.heartRate) < 30 || parseInt(formData.heartRate) > 220)) {
      newErrors.heartRate = 'Heart rate must be between 30-220 bpm'
    }
    if (formData.temperature && (parseFloat(formData.temperature) < 30 || parseFloat(formData.temperature) > 45)) {
      newErrors.temperature = 'Temperature must be between 30-45 C'
    }
    if (formData.spo2 && (parseInt(formData.spo2) < 50 || parseInt(formData.spo2) > 100)) {
      newErrors.spo2 = 'SpO2 must be between 50-100%'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return
    
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    addManualVitals({
      timestamp: new Date().toISOString(),
      systolic: formData.systolic ? parseInt(formData.systolic) : null,
      diastolic: formData.diastolic ? parseInt(formData.diastolic) : null,
      heartRate: formData.heartRate ? parseInt(formData.heartRate) : null,
      weight: formData.weight ? parseInt(formData.weight) : null,
      height: formData.height ? parseInt(formData.height) : null,
      bloodGlucose: formData.bloodGlucose ? parseInt(formData.bloodGlucose) : null,
      spo2: formData.spo2 ? parseInt(formData.spo2) : null,
      temperature: formData.temperature ? parseFloat(formData.temperature) : null,
      respiratoryRate: formData.respiratoryRate ? parseInt(formData.respiratoryRate) : null
    })
    
    setVitals(getManualVitals())
    setFormData({
      systolic: '', diastolic: '', heartRate: '', weight: '', height: '',
      bloodGlucose: '', spo2: '', temperature: '', respiratoryRate: ''
    })
    setShowForm(false)
    setIsSaving(false)
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this entry?')) {
      deleteManualVitals(id)
      setVitals(getManualVitals())
    }
  }

  const inputClass = (field: string) => `
    w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500
    ${errors[field] ? 'border-red-300' : 'border-neutral-300'}
  `

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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-teal-500 rounded-xl p-3">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Manual Vitals</h1>
                <p className="text-navy-200">Record your health measurements</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
            >
              <Plus className="w-4 h-4" />
              {showForm ? 'Cancel' : 'Add Entry'}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-6">
        <div className="max-w-4xl mx-auto">
          {/* Entry Form */}
          {showForm && (
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">New Vital Signs Entry</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-neutral-600 mb-1">Systolic (mmHg)</label>
                  <input
                    type="number"
                    value={formData.systolic}
                    onChange={(e) => setFormData({...formData, systolic: e.target.value})}
                    className={inputClass('systolic')}
                    placeholder="120"
                  />
                  {errors.systolic && <p className="text-xs text-red-600 mt-1">{errors.systolic}</p>}
                </div>
                <div>
                  <label className="block text-sm text-neutral-600 mb-1">Diastolic (mmHg)</label>
                  <input
                    type="number"
                    value={formData.diastolic}
                    onChange={(e) => setFormData({...formData, diastolic: e.target.value})}
                    className={inputClass('diastolic')}
                    placeholder="80"
                  />
                  {errors.diastolic && <p className="text-xs text-red-600 mt-1">{errors.diastolic}</p>}
                </div>
                <div>
                  <label className="block text-sm text-neutral-600 mb-1">Heart Rate (bpm)</label>
                  <input
                    type="number"
                    value={formData.heartRate}
                    onChange={(e) => setFormData({...formData, heartRate: e.target.value})}
                    className={inputClass('heartRate')}
                    placeholder="72"
                  />
                  {errors.heartRate && <p className="text-xs text-red-600 mt-1">{errors.heartRate}</p>}
                </div>
                <div>
                  <label className="block text-sm text-neutral-600 mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="70"
                  />
                </div>
                <div>
                  <label className="block text-sm text-neutral-600 mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({...formData, height: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="175"
                  />
                </div>
                <div>
                  <label className="block text-sm text-neutral-600 mb-1">Blood Glucose (mg/dL)</label>
                  <input
                    type="number"
                    value={formData.bloodGlucose}
                    onChange={(e) => setFormData({...formData, bloodGlucose: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="95"
                  />
                </div>
                <div>
                  <label className="block text-sm text-neutral-600 mb-1">SpO2 (%)</label>
                  <input
                    type="number"
                    value={formData.spo2}
                    onChange={(e) => setFormData({...formData, spo2: e.target.value})}
                    className={inputClass('spo2')}
                    placeholder="98"
                  />
                  {errors.spo2 && <p className="text-xs text-red-600 mt-1">{errors.spo2}</p>}
                </div>
                <div>
                  <label className="block text-sm text-neutral-600 mb-1">Temperature (C)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.temperature}
                    onChange={(e) => setFormData({...formData, temperature: e.target.value})}
                    className={inputClass('temperature')}
                    placeholder="36.6"
                  />
                  {errors.temperature && <p className="text-xs text-red-600 mt-1">{errors.temperature}</p>}
                </div>
                <div>
                  <label className="block text-sm text-neutral-600 mb-1">Respiratory Rate</label>
                  <input
                    type="number"
                    value={formData.respiratoryRate}
                    onChange={(e) => setFormData({...formData, respiratoryRate: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="16"
                  />
                </div>
              </div>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save Entry'}
              </button>
            </div>
          )}

          {/* History */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Entry History</h2>
            {vitals.length === 0 ? (
              <div className="text-center py-12">
                <Activity className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                <p className="text-neutral-500">No entries yet. Add your first vital signs measurement.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {vitals.map((entry) => (
                  <div key={entry.id} className="border border-neutral-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-neutral-500">
                        {new Date(entry.timestamp).toLocaleString()}
                      </span>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="text-red-400 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {entry.systolic && entry.diastolic && (
                        <div className="bg-red-50 rounded-lg p-2">
                          <p className="text-xs text-red-600">Blood Pressure</p>
                          <p className="font-semibold text-red-900">{entry.systolic}/{entry.diastolic}</p>
                        </div>
                      )}
                      {entry.heartRate && (
                        <div className="bg-blue-50 rounded-lg p-2">
                          <p className="text-xs text-blue-600">Heart Rate</p>
                          <p className="font-semibold text-blue-900">{entry.heartRate} bpm</p>
                        </div>
                      )}
                      {entry.weight && (
                        <div className="bg-green-50 rounded-lg p-2">
                          <p className="text-xs text-green-600">Weight</p>
                          <p className="font-semibold text-green-900">{entry.weight} kg</p>
                        </div>
                      )}
                      {entry.bloodGlucose && (
                        <div className="bg-purple-50 rounded-lg p-2">
                          <p className="text-xs text-purple-600">Blood Glucose</p>
                          <p className="font-semibold text-purple-900">{entry.bloodGlucose} mg/dL</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
