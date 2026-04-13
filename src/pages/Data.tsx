import { useState } from 'react'
import { BottomNav } from '../components/BottomNav'

// Filter Pill Component
interface FilterPillProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function FilterPill({ label, isActive, onClick }: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
        isActive
          ? 'bg-[#0077cc] text-white'
          : 'bg-white text-[#6b7c93] border border-[#d0dce8] hover:border-[#0077cc]'
      }`}
    >
      {label}
    </button>
  );
}

// Tab Component
interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function Tab({ label, isActive, onClick }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-colors ${
        isActive
          ? 'bg-white/20 text-white'
          : 'text-white/60 hover:text-white/80'
      }`}
    >
      {label}
    </button>
  );
}

// Empty State Component
function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-16 h-16 rounded-full bg-[#e8f4fd] flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-[#0077cc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <p className="text-[#6b7c93] text-center">{message}</p>
    </div>
  );
}

export function Data() {
  const [activeTab, setActiveTab] = useState<'vitals' | 'documents'>('vitals')
  const [activeFilter, setActiveFilter] = useState('All')

  const vitalFilters = ['All', 'Blood Pressure', 'Heart Rate', 'Glucose', 'Weight', 'Temperature']
  const documentFilters = ['All', 'Lab Results', 'Prescriptions', 'Imaging', 'Notes']

  const filters = activeTab === 'vitals' ? vitalFilters : documentFilters

  return (
    <div className="h-full flex flex-col bg-[#f4f8fb] relative">
      {/* Header with Tabs */}
      <div className="bg-gradient-to-b from-[#0a3d62] to-[#0077cc] px-4 pt-12 pb-0">
        <div className="flex gap-2 p-1 bg-white/10 rounded-2xl mb-4">
          <Tab
            label="Vitals"
            isActive={activeTab === 'vitals'}
            onClick={() => {
              setActiveTab('vitals')
              setActiveFilter('All')
            }}
          />
          <Tab
            label="Documents"
            isActive={activeTab === 'documents'}
            onClick={() => {
              setActiveTab('documents')
              setActiveFilter('All')
            }}
          />
        </div>
      </div>

      {/* Filter Pills */}
      <div className="px-4 py-3 bg-white border-b border-[#d0dce8]">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {filters.map((filter) => (
            <FilterPill
              key={filter}
              label={filter}
              isActive={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            />
          ))}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        {activeTab === 'vitals' ? (
          <EmptyState message="No vitals recorded yet. Add your first vital to start tracking." />
        ) : (
          <EmptyState message="No documents uploaded yet. Upload your first document to keep records." />
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab="data" />
    </div>
  );
}
