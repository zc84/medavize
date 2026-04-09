import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Mic, Trash2, ChevronLeft, Upload, Loader2
} from 'lucide-react'
import { getAudioRecordings, addAudioRecording, deleteAudioRecording } from '../../services/storage'
import type { AudioRecording } from '../../types'

const MOCK_TRANSCRIPTS = [
  { transcript: 'Doctor discussed blood pressure management and suggested follow-up in 3 months. Adjusted Lisinopril dosage.', summary: 'BP follow-up, dosage adjusted' },
  { transcript: 'Patient reported headache for two days. Doctor recommended rest and hydration. No medication prescribed.', summary: 'Headache consultation' },
  { transcript: 'Annual diabetes checkup. HbA1c improved to 7.2%. Continue current treatment plan. Schedule next visit in 6 months.', summary: 'Diabetes checkup, improved A1c' }
]

export function AudioPage() {
  const navigate = useNavigate()
  const [recordings, setRecordings] = useState<AudioRecording[]>(getAudioRecordings())
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<number | null>(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = () => {
        processRecording()
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingDuration(0)
      
      timerRef.current = window.setInterval(() => {
        setRecordingDuration(d => d + 1)
      }, 1000)
    } catch (err) {
      alert('Microphone access denied or not available')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      setIsRecording(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }

  const processRecording = async () => {
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const mockData = MOCK_TRANSCRIPTS[Math.floor(Math.random() * MOCK_TRANSCRIPTS.length)]
    
    addAudioRecording({
      fileName: `recording_${new Date().toISOString().slice(0,10).replace(/-/g,'')}_${Date.now()}.webm`,
      duration: recordingDuration,
      recordedAt: new Date().toISOString(),
      ...mockData
    })
    
    setRecordings(getAudioRecordings())
    setIsProcessing(false)
    setRecordingDuration(0)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))

    const mockData = MOCK_TRANSCRIPTS[Math.floor(Math.random() * MOCK_TRANSCRIPTS.length)]
    
    addAudioRecording({
      fileName: file.name,
      duration: 0,
      recordedAt: new Date().toISOString(),
      ...mockData
    })
    
    setRecordings(getAudioRecordings())
    setIsProcessing(false)
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this recording?')) {
      deleteAudioRecording(id)
      setRecordings(getAudioRecordings())
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
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
            <div className="bg-purple-500 rounded-xl p-3">
              <Mic className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Audio Recordings</h1>
              <p className="text-navy-200">Record and transcribe doctor visits</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-6">
        <div className="max-w-4xl mx-auto">
          {/* Recorder */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="text-center">
              {isRecording ? (
                <div className="mb-6">
                  <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <div className="w-8 h-8 bg-white rounded-sm" />
                  </div>
                  <p className="text-3xl font-mono text-neutral-900">{formatDuration(recordingDuration)}</p>
                  <p className="text-neutral-500 mt-1">Recording...</p>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mic className="w-10 h-10 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900">Record Audio</h3>
                  <p className="text-neutral-500">Capture doctor visits or health notes</p>
                </div>
              )}

              <div className="flex justify-center gap-3">
                {isRecording ? (
                  <button
                    onClick={stopRecording}
                    className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                  >
                    Stop Recording
                  </button>
                ) : (
                  <button
                    onClick={startRecording}
                    disabled={isProcessing}
                    className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition disabled:opacity-50"
                  >
                    Start Recording
                  </button>
                )}
                
                <label className="px-6 py-3 border border-neutral-300 hover:bg-neutral-50 rounded-lg transition cursor-pointer">
                  <Upload className="w-5 h-5 inline mr-2" />
                  Upload Audio
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {isProcessing && (
                <div className="mt-4 flex items-center justify-center gap-2 text-purple-600">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Transcribing audio...</span>
                </div>
              )}
            </div>
          </div>

          {/* Recordings List */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              Recordings ({recordings.length})
            </h2>
            
            {recordings.length === 0 ? (
              <div className="text-center py-12">
                <Mic className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                <p className="text-neutral-500">No recordings yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recordings.map((rec) => (
                  <div key={rec.id} className="border border-neutral-200 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 rounded-lg p-2">
                          <Mic className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-neutral-900">{rec.fileName}</h3>
                          <p className="text-sm text-neutral-500">
                            {new Date(rec.recordedAt).toLocaleString()} • {formatDuration(rec.duration)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(rec.id)}
                          className="p-2 text-neutral-400 hover:text-red-600 transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 rounded-lg p-3 mb-2">
                      <p className="text-sm text-purple-900 font-medium mb-1">AI Summary</p>
                      <p className="text-sm text-purple-700">{rec.summary}</p>
                    </div>
                    
                    <div className="bg-neutral-50 rounded-lg p-3">
                      <p className="text-sm text-neutral-600 font-medium mb-1">Transcript</p>
                      <p className="text-sm text-neutral-700">{rec.transcript}</p>
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
