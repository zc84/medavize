import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Camera, Trash2, ChevronLeft, Upload, Loader2, Eye, X
} from 'lucide-react'
import { getScannedDocuments, addScannedDocument, deleteScannedDocument } from '../../services/storage'
import type { ScannedDocument } from '../../types'

const MOCK_OCR_DATA = [
  { type: 'lab', summary: 'Blood work: WBC normal, RBC normal, Platelets 250K', rawText: 'Complete Blood Count\nWBC: 7.5 (normal)\nRBC: 4.8 (normal)\nPlatelets: 250,000/uL' },
  { type: 'prescription', summary: 'Amoxicillin 500mg, 10 days course', rawText: 'PRESCRIPTION\nAmoxicillin 500mg\nTake 1 capsule 3 times daily\nDuration: 10 days' },
  { type: 'report', summary: 'X-ray: No fractures detected', rawText: 'RADIOLOGY REPORT\nChest X-ray\nFindings: No acute cardiopulmonary process.\nNo fractures detected.' }
]

export function ScansPage() {
  const navigate = useNavigate()
  const [scans, setScans] = useState<ScannedDocument[]>(getScannedDocuments())
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedScan, setSelectedScan] = useState<ScannedDocument | null>(null)
  const [pendingScan, setPendingScan] = useState<{ file: File, method: 'camera' | 'upload' } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const processFile = async (file: File, method: 'camera' | 'upload') => {
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const mockData = MOCK_OCR_DATA[Math.floor(Math.random() * MOCK_OCR_DATA.length)]
    
    addScannedDocument({
      fileName: file.name,
      fileType: file.type,
      scanMethod: method,
      uploadedAt: new Date().toISOString(),
      extractedData: mockData
    })
    
    setScans(getScannedDocuments())
    setIsProcessing(false)
    setPendingScan(null)
  }

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPendingScan({ file, method: 'camera' })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPendingScan({ file, method: 'upload' })
  }

  const handleConfirmScan = () => {
    if (pendingScan) {
      processFile(pendingScan.file, pendingScan.method)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this scanned document?')) {
      deleteScannedDocument(id)
      setScans(getScannedDocuments())
    }
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('image')) return <Camera className="w-8 h-8 text-cyan-500" />
    return <Upload className="w-8 h-8 text-cyan-500" />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Black */}
      <header className="bg-black px-5 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/data-sources')}
              className="flex items-center text-white hover:text-emerald-400 transition"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back
            </button>
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <img src="/logo-white.png" alt="Medavize" className="w-8 h-8 object-contain" />
              <span className="text-xl font-bold text-white">medavize</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="bg-neutral-100 px-5 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-emerald-500 rounded-xl p-3">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Scan Documents</h1>
              <p className="text-muted-foreground">Capture and OCR paper documents</p>
            </div>
          </div>

          {/* Capture Options */}
          <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Scan or Upload</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => cameraInputRef.current?.click()}
                className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-border rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition"
              >
                <Camera className="w-8 h-8 text-emerald-600" />
                <span className="font-medium text-foreground">Take Photo</span>
                <span className="text-xs text-muted-foreground">Use device camera</span>
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleCameraCapture}
                  className="hidden"
                />
              </button>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-border rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition"
              >
                <Upload className="w-8 h-8 text-emerald-600" />
                <span className="font-medium text-foreground">Upload Image</span>
                <span className="text-xs text-muted-foreground">Choose from gallery</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </button>
            </div>
            
            {isProcessing && (
              <div className="mt-4 flex items-center justify-center gap-2 text-emerald-600">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Scanning and extracting text...</span>
              </div>
            )}
          </div>

          {/* Scans List */}
          <div className="bg-white rounded-2xl shadow-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Scanned Documents ({scans.length})
            </h2>
            
            {scans.length === 0 ? (
              <div className="text-center py-12">
                <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No scans yet. Take a photo or upload an image.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {scans.map((scan) => (
                  <div
                    key={scan.id}
                    className="flex items-center gap-4 p-4 border border-border rounded-xl hover:bg-neutral-50 transition"
                  >
                    {getFileIcon(scan.fileType)}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">{scan.fileName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(scan.uploadedAt).toLocaleDateString()} • {scan.scanMethod === 'camera' ? 'Camera' : 'Upload'}
                      </p>
                      <p className="text-sm text-emerald-600 mt-1">{scan.extractedData.summary}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedScan(scan)}
                        className="p-2 text-muted-foreground hover:text-emerald-600 transition"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(scan.id)}
                        className="p-2 text-muted-foreground hover:text-red-600 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Confirmation Modal */}
      {pendingScan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Confirm Scan</h3>
            <p className="text-muted-foreground mb-4">
              File: {pendingScan.file.name}
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              This will extract text from the document using OCR.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setPendingScan(null)}
                className="flex-1 py-3 border border-border rounded-lg hover:bg-neutral-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmScan}
                disabled={isProcessing}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Scan Document'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Viewer Modal */}
      {selectedScan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">{selectedScan.fileName}</h3>
              <button
                onClick={() => setSelectedScan(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-4">
              <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                {selectedScan.extractedData.type}
              </span>
              <span className="inline-block px-2 py-1 bg-neutral-100 text-muted-foreground text-xs rounded-full ml-2">
                {selectedScan.scanMethod === 'camera' ? 'Camera' : 'Upload'}
              </span>
            </div>
            
            <div className="bg-emerald-50 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-emerald-900 mb-2">Extracted Summary</h4>
              <p className="text-emerald-900">{selectedScan.extractedData.summary}</p>
            </div>
            
            <div className="bg-neutral-100 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-foreground mb-2">OCR Text</h4>
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap">{selectedScan.extractedData.rawText}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
