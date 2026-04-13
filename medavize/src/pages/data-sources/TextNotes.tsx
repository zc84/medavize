import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Type, Trash2, ChevronLeft, Save, Loader2, Tag
} from 'lucide-react'
import { getTextNotes, addTextNote, deleteTextNote } from '../../services/storage'
import type { TextNote } from '../../types'

const SYMPTOM_KEYWORDS = ['headache', 'fever', 'cough', 'pain', 'nausea', 'dizziness', 'fatigue', 'shortness of breath']
const DURATION_PATTERNS = [/\d+\s*(day|days|week|weeks|month|months)/i]
const SEVERITY_KEYWORDS = ['mild', 'moderate', 'severe', 'slight', 'intense']

function extractSymptoms(text: string): string[] {
  const lower = text.toLowerCase()
  return SYMPTOM_KEYWORDS.filter(k => lower.includes(k))
}

function extractDuration(text: string): string | null {
  for (const pattern of DURATION_PATTERNS) {
    const match = text.match(pattern)
    if (match) return match[0]
  }
  return null
}

function extractSeverity(text: string): string | null {
  const lower = text.toLowerCase()
  for (const s of SEVERITY_KEYWORDS) {
    if (lower.includes(s)) return s
  }
  return null
}

export function TextNotesPage() {
  const navigate = useNavigate()
  const [notes, setNotes] = useState<TextNote[]>(getTextNotes())
  const [text, setText] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSave = async () => {
    if (!text.trim()) return
    
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const extracted = {
      symptoms: extractSymptoms(text),
      duration: extractDuration(text),
      severity: extractSeverity(text)
    }
    
    addTextNote({
      rawText: text,
      createdAt: new Date().toISOString(),
      extracted
    })
    
    setNotes(getTextNotes())
    setText('')
    setIsProcessing(false)
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this note?')) {
      deleteTextNote(id)
      setNotes(getTextNotes())
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
            <div className="bg-indigo-500 rounded-xl p-3">
              <Type className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Text Notes</h1>
              <p className="text-navy-200">Record symptoms and health observations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-6">
        <div className="max-w-4xl mx-auto">
          {/* Note Input */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">New Note</h2>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Describe your symptoms or health concerns... (e.g., 'I've had a mild headache for two days')"
              className="w-full h-32 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-neutral-500">
                AI will extract symptoms, duration, and severity
              </p>
              <button
                onClick={handleSave}
                disabled={!text.trim() || isProcessing}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Note
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Notes List */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              Notes History ({notes.length})
            </h2>
            
            {notes.length === 0 ? (
              <div className="text-center py-12">
                <Type className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                <p className="text-neutral-500">No notes yet. Record your first health observation.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notes.map((note) => (
                  <div key={note.id} className="border border-neutral-200 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-sm text-neutral-500">
                        {new Date(note.createdAt).toLocaleString()}
                      </span>
                      <button
                        onClick={() => handleDelete(note.id)}
                        className="text-neutral-400 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <p className="text-neutral-900 mb-3">{note.rawText}</p>
                    
                    {note.extracted.symptoms.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-neutral-500 flex items-center gap-1">
                          <Tag className="w-3 h-3" /> Extracted:
                        </span>
                        {note.extracted.symptoms.map((symptom, i) => (
                          <span key={i} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                            {symptom}
                          </span>
                        ))}
                        {note.extracted.duration && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {note.extracted.duration}
                          </span>
                        )}
                        {note.extracted.severity && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                            {note.extracted.severity}
                          </span>
                        )}
                      </div>
                    )}
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
