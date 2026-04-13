import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  FileText, Upload, Trash2, ChevronLeft, X, Loader2,
  File, FileImage, FileSpreadsheet, Eye
} from 'lucide-react'
import { getDocuments, addDocument, deleteDocument } from '../../services/storage'
import type { Document } from '../../types'

const MOCK_EXTRACTIONS = [
  { type: 'lab', summary: 'HbA1c 7.2%, LDL 110 mg/dL', rawText: 'Laboratory Report\nDate: 2026-03-15\nHbA1c: 7.2%\nLDL Cholesterol: 110 mg/dL\nHDL Cholesterol: 45 mg/dL' },
  { type: 'prescription', summary: 'Metformin 500mg, 30 days', rawText: 'Prescription\nPatient: John Doe\nMedication: Metformin 500mg\nQuantity: 30 tablets\nRefills: 2' },
  { type: 'report', summary: 'Annual physical, normal findings', rawText: 'Medical Report\nAnnual Physical Examination\nDate: 2026-01-20\nFindings: All systems normal. Continue current medications.' }
]

export function DocumentsPage() {
  const navigate = useNavigate()
  const [documents, setDocuments] = useState<Document[]>(getDocuments())
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsProcessing(true)
    
    for (const file of Array.from(files)) {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockExtraction = MOCK_EXTRACTIONS[Math.floor(Math.random() * MOCK_EXTRACTIONS.length)]
      
      addDocument({
        fileName: file.name,
        fileType: file.type || 'application/octet-stream',
        uploadedAt: new Date().toISOString(),
        extractedData: mockExtraction
      })
    }
    
    setDocuments(getDocuments())
    setIsProcessing(false)
    
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this document?')) {
      deleteDocument(id)
      setDocuments(getDocuments())
    }
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('image')) return <FileImage className="w-8 h-8 text-orange-500" />
    if (fileType.includes('spreadsheet') || fileType.includes('excel')) return <FileSpreadsheet className="w-8 h-8 text-green-500" />
    return <FileText className="w-8 h-8 text-blue-500" />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Black */}
      <header className="bg-black px-5 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/data-sources')}
              className="flex items-center text-white hover:text-emerald-400 transition"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back
            </button>
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
                <img src="/logo-white.png" alt="Medavize" className="w-8 h-8 object-contain" />
                <span className="text-xl font-bold text-white">medavize</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="bg-neutral-100 px-5 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-emerald-500 rounded-xl p-3">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Documents</h1>
              <p className="text-muted-foreground">Upload and analyze health documents</p>
            </div>
          </div>

          {/* Upload Area */}
          <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-emerald-500 hover:bg-emerald-50 transition cursor-pointer"
            >
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {isProcessing ? 'Processing...' : 'Upload Documents'}
              </h3>
              <p className="text-muted-foreground mb-2">
                Drag & drop or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supports PDF, Word, Excel, JPG, PNG
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
            
            {isProcessing && (
              <div className="mt-4 flex items-center justify-center gap-2 text-emerald-600">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Extracting data with OCR...</span>
              </div>
            )}
          </div>

          {/* Document List */}
          <div className="bg-white rounded-2xl shadow-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Uploaded Documents ({documents.length})
            </h2>
            
            {documents.length === 0 ? (
              <div className="text-center py-12">
                <File className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No documents uploaded yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center gap-4 p-4 border border-border rounded-xl hover:bg-neutral-50 transition"
                  >
                    {getFileIcon(doc.fileType)}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">{doc.fileName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(doc.uploadedAt).toLocaleDateString()} • {doc.extractedData.type}
                      </p>
                      <p className="text-sm text-emerald-600 mt-1">{doc.extractedData.summary}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedDoc(doc)}
                        className="p-2 text-muted-foreground hover:text-emerald-600 transition"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id)}
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

      {/* Document Viewer Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">{selectedDoc.fileName}</h3>
              <button
                onClick={() => setSelectedDoc(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-4">
              <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                {selectedDoc.extractedData.type}
              </span>
            </div>
            
            <div className="bg-neutral-50 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-foreground mb-2">Extracted Summary</h4>
              <p className="text-foreground">{selectedDoc.extractedData.summary}</p>
            </div>
            
            <div className="bg-neutral-100 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-foreground mb-2">OCR Raw Text</h4>
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap">{selectedDoc.extractedData.rawText}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
