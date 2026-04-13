import { useNavigate } from 'react-router-dom'
import { Plus, FileText, Mic, Calendar, ChevronLeft } from 'lucide-react'

// Action Card Component
interface ActionCardProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function ActionCard({ icon, label, onClick }: ActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl p-6 border border-[#d0dce8] flex flex-col items-center gap-3 hover:border-[#0077cc] hover:shadow-md transition-all"
    >
      <div className="w-12 h-12 rounded-full bg-[#e8f4fd] flex items-center justify-center text-[#0077cc]">
        {icon}
      </div>
      <span className="text-sm font-medium text-[#0d1b2a]">{label}</span>
    </button>
  );
}

export function QuickActions() {
  const navigate = useNavigate()

  const actions = [
    {
      icon: <Plus className="w-6 h-6" />,
      label: 'Add Vital',
      onClick: () => navigate('/add-vital'),
    },
    {
      icon: <FileText className="w-6 h-6" />,
      label: 'Upload Data',
      onClick: () => navigate('/upload-data'),
    },
    {
      icon: <Mic className="w-6 h-6" />,
      label: 'Record Visit',
      onClick: () => navigate('/record-visit'),
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      label: 'Prep Visit',
      onClick: () => navigate('/add-visit'),
    },
  ]

  return (
    <div className="h-full flex flex-col bg-[#f4f8fb] relative">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 border-b border-[#d0dce8] flex items-center gap-3">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 -ml-2 hover:bg-[#f4f8fb] rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-[#0d1b2a]" />
        </button>
        <h1 className="text-xl font-bold text-[#0d1b2a]">Quick Actions</h1>
      </div>

      {/* Action Cards Grid */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-6">
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action, idx) => (
            <ActionCard
              key={idx}
              icon={action.icon}
              label={action.label}
              onClick={action.onClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
