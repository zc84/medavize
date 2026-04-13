import { useNavigate, Link } from 'react-router-dom'
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
      className="bg-white rounded-xl p-6 border border-border flex flex-col items-center gap-3 hover:border-emerald-600 hover:shadow-card transition-all"
    >
      <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
        {icon}
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
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
    <div className="min-h-full flex flex-col bg-white relative">
      {/* Header - Black */}
      <header className="bg-black px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <img src="/logo-white.png" alt="Medavize" className="w-8 h-8 object-contain" />
            </Link>
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 -ml-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-xl font-bold text-white">Quick Actions</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 bg-neutral-100 px-5 py-6 overflow-y-auto pb-24">
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
