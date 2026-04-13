import { useState } from 'react'
import { ChevronLeft, Plus } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'

// Input Field Component
interface InputFieldProps {
  label: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}

function InputField({ label, placeholder, required, value, onChange }: InputFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-foreground mb-2">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-white border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
      />
    </div>
  );
}

// Add Item Row Component
interface AddItemRowProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

function AddItemRow({ placeholder, value, onChange, onAdd }: AddItemRowProps) {
  return (
    <div className="flex gap-3 mb-3">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-3 bg-white border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
      />
      <button
        onClick={onAdd}
        className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 hover:bg-emerald-700 transition-colors"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}

export function AddVisit() {
  const navigate = useNavigate()
  const [doctorName, setDoctorName] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [date, setDate] = useState('')
  const [questionInput, setQuestionInput] = useState('')
  const [medicationInput, setMedicationInput] = useState('')
  const [notes, setNotes] = useState('')
  const [questions, setQuestions] = useState<string[]>([])
  const [medications, setMedications] = useState<string[]>([])

  const handleAddQuestion = () => {
    if (questionInput.trim()) {
      setQuestions([...questions, questionInput.trim()])
      setQuestionInput('')
    }
  }

  const handleAddMedication = () => {
    if (medicationInput.trim()) {
      setMedications([...medications, medicationInput.trim()])
      setMedicationInput('')
    }
  }

  return (
    <div className="min-h-full flex flex-col bg-white relative">
      {/* Header - Black */}
      <header className="bg-black px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <img src="/logo-white.png" alt="Medavize" className="w-8 h-8 object-contain" />
              <h1 className="text-xl font-bold text-white">Add Visit</h1>
            </Link>
          </div>
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto bg-neutral-100 px-5 pt-4 pb-28">
        {/* Doctor Info */}
        <InputField
          label="Doctor Name"
          placeholder="Dr. Jane Smith"
          required
          value={doctorName}
          onChange={setDoctorName}
        />
        <InputField
          label="Specialty"
          placeholder="e.g. Cardiology"
          value={specialty}
          onChange={setSpecialty}
        />
        <InputField
          label="Date"
          placeholder="YYYY-MM-DD"
          required
          value={date}
          onChange={setDate}
        />

        {/* Questions for Doctor */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-2">
            Questions for Doctor
          </label>
          <AddItemRow
            placeholder="Add a question..."
            value={questionInput}
            onChange={setQuestionInput}
            onAdd={handleAddQuestion}
          />
          {/* Added questions list */}
          {questions.map((q, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-2 px-4 py-2 bg-white rounded-lg border border-border">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center flex-shrink-0">
                {idx + 1}
              </span>
              <span className="text-sm text-foreground">{q}</span>
            </div>
          ))}
        </div>

        {/* Current Medications */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-2">
            Current Medications
          </label>
          <AddItemRow
            placeholder="Add medication..."
            value={medicationInput}
            onChange={setMedicationInput}
            onAdd={handleAddMedication}
          />
          {/* Added medications list */}
          {medications.map((med, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-2 px-4 py-2 bg-white rounded-lg border border-border">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-sm text-foreground">{med}</span>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any notes or symptoms to discuss..."
            rows={4}
            className="w-full px-4 py-3 bg-white border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 resize-none"
          />
        </div>

        {/* Save Button */}
        <button className="w-full bg-emerald-600 text-white font-semibold py-4 rounded-xl hover:bg-emerald-700 transition-colors">
          Save Visit
        </button>
      </div>
    </div>
  );
}
