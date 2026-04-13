import { useState } from 'react'
import { ChevronLeft, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

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
      <label className="block text-sm font-medium text-[#0d1b2a] mb-2">
        {label}
        {required && <span className="text-[#e63946]"> *</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-white border border-[#d0dce8] rounded-xl text-[#0d1b2a] placeholder:text-[#6b7c93] focus:outline-none focus:border-[#0077cc] focus:ring-1 focus:ring-[#0077cc]"
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
        className="flex-1 px-4 py-3 bg-white border border-[#d0dce8] rounded-xl text-[#0d1b2a] placeholder:text-[#6b7c93] focus:outline-none focus:border-[#0077cc] focus:ring-1 focus:ring-[#0077cc]"
      />
      <button
        onClick={onAdd}
        className="w-12 h-12 bg-[#0077cc] text-white rounded-xl flex items-center justify-center flex-shrink-0 hover:bg-[#0066b3] transition-colors"
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
    <div className="h-full flex flex-col bg-[#f4f8fb] relative">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 border-b border-[#d0dce8] flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 hover:bg-[#f4f8fb] rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-[#0d1b2a]" />
        </button>
        <h1 className="text-xl font-bold text-[#0d1b2a]">Add Visit</h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6">
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
          <label className="block text-sm font-medium text-[#0d1b2a] mb-2">
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
            <div key={idx} className="flex items-center gap-2 mb-2 px-4 py-2 bg-white rounded-lg border border-[#d0dce8]">
              <span className="w-5 h-5 rounded-full bg-[#0077cc] text-white text-xs flex items-center justify-center flex-shrink-0">
                {idx + 1}
              </span>
              <span className="text-sm text-[#0d1b2a]">{q}</span>
            </div>
          ))}
        </div>

        {/* Current Medications */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#0d1b2a] mb-2">
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
            <div key={idx} className="flex items-center gap-2 mb-2 px-4 py-2 bg-white rounded-lg border border-[#d0dce8]">
              <div className="w-2 h-2 rounded-full bg-[#00b4d8]" />
              <span className="text-sm text-[#0d1b2a]">{med}</span>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#0d1b2a] mb-2">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any notes or symptoms to discuss..."
            rows={4}
            className="w-full px-4 py-3 bg-white border border-[#d0dce8] rounded-xl text-[#0d1b2a] placeholder:text-[#6b7c93] focus:outline-none focus:border-[#0077cc] focus:ring-1 focus:ring-[#0077cc] resize-none"
          />
        </div>

        {/* Save Button */}
        <button className="w-full bg-[#0077cc] text-white font-semibold py-4 rounded-xl hover:bg-[#0066b3] transition-colors">
          Save Visit
        </button>
      </div>
    </div>
  );
}
