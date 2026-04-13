import { useAuth } from '../context/AuthContext'
import { BottomNav } from '../components/BottomNav'
import { CheckCircle2, AlertTriangle, AlertCircle, RefreshCw } from 'lucide-react'

// Health Avatar SVG Component
function HealthAvatar() {
  return (
    <div className="relative w-48 h-48 mx-auto">
      {/* Light blue circle background */}
      <div className="absolute inset-0 bg-[#e8f4fd] rounded-full" />
      
      {/* Body diagram SVG */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full p-4">
        {/* Body outline */}
        <ellipse cx="100" cy="60" rx="25" ry="30" fill="#0d1b2a" opacity="0.9" />
        {/* Neck */}
        <rect x="92" y="85" width="16" height="15" fill="#0d1b2a" opacity="0.9" />
        {/* Torso */}
        <path
          d="M70 100 Q60 140 65 180 L135 180 Q140 140 130 100 Z"
          fill="#0d1b2a"
          opacity="0.9"
        />
        {/* Arms */}
        <path d="M70 105 L40 160" stroke="#0d1b2a" strokeWidth="18" strokeLinecap="round" opacity="0.9" />
        <path d="M130 105 L160 160" stroke="#0d1b2a" strokeWidth="18" strokeLinecap="round" opacity="0.9" />
        {/* Legs */}
        <path d="M75 180 L70 195" stroke="#0d1b2a" strokeWidth="20" strokeLinecap="round" opacity="0.9" />
        <path d="M125 180 L130 195" stroke="#0d1b2a" strokeWidth="20" strokeLinecap="round" opacity="0.9" />
        
        {/* Heart - highlighted */}
        <ellipse cx="95" cy="115" rx="12" ry="10" fill="#e67e22" />
        <ellipse cx="102" cy="112" rx="8" ry="7" fill="#e67e22" />
        
        {/* Brain highlight */}
        <circle cx="100" cy="50" r="15" fill="#00b4d8" opacity="0.8" />
        
        {/* Connection lines - tech overlay style */}
        <line x1="120" y1="70" x2="145" y2="55" stroke="#0077cc" strokeWidth="1" opacity="0.5" />
        <line x1="145" y1="55" x2="155" y2="55" stroke="#0077cc" strokeWidth="1" opacity="0.5" />
        <circle cx="158" cy="55" r="3" fill="#0077cc" />
      </svg>
    </div>
  )
}

// Insight Card Component
interface InsightCardProps {
  category: string;
  title: string;
  description: string;
  severity: 'good' | 'warning' | 'attention';
}

function InsightCard({ category, title, description, severity }: InsightCardProps) {
  const severityConfig = {
    good: { color: '#2ecc71', icon: CheckCircle2, borderColor: '#2ecc71' },
    warning: { color: '#f39c12', icon: AlertTriangle, borderColor: '#f39c12' },
    attention: { color: '#e67e22', icon: AlertCircle, borderColor: '#e67e22' },
  };

  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <div
      className="bg-white rounded-xl p-4 shadow-sm border border-[#d0dce8] mb-3"
      style={{ borderLeftWidth: '4px', borderLeftColor: config.borderColor }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-5 h-5" style={{ color: config.color }} />
        <span className="text-xs font-medium text-[#6b7c93] uppercase tracking-wide">
          {category}
        </span>
      </div>
      <h3 className="font-semibold text-[#0d1b2a] mb-1 leading-tight">{title}</h3>
      <p className="text-sm text-[#6b7c93] leading-relaxed mb-2">{description}</p>
      <button className="text-sm font-semibold text-[#0077cc]">Learn more</button>
    </div>
  );
}

export function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="h-full flex flex-col bg-[#f4f8fb] relative">
      {/* Header with gradient */}
      <div className="bg-gradient-to-b from-[#0a3d62] to-[#0077cc] px-5 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Hello, {user?.fullName?.split(' ')[0] || 'User'}
            </h1>
            <p className="text-[#e8f4fd] text-sm opacity-80">Your health snapshot</p>
          </div>
          <span className="bg-[#00b4d8] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            Caregiver
          </span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        {/* Health Avatar Section */}
        <div className="mb-4">
          <HealthAvatar />
          
          {/* Needs Attention Badge */}
          <div className="flex justify-center -mt-2 mb-4">
            <div className="bg-[#e67e22] text-white text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
              <AlertCircle className="w-4 h-4" />
              Needs Attention
            </div>
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex justify-center gap-3 mb-6">
          <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-full border border-[#d0dce8] shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-[#2ecc71]" />
            <span className="text-sm font-semibold text-[#0d1b2a]">1</span>
            <span className="text-sm text-[#6b7c93]">Good</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-full border border-[#d0dce8] shadow-sm">
            <AlertTriangle className="w-4 h-4 text-[#f39c12]" />
            <span className="text-sm font-semibold text-[#0d1b2a]">1</span>
            <span className="text-sm text-[#6b7c93]">Monitor</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-full border border-[#d0dce8] shadow-sm">
            <AlertCircle className="w-4 h-4 text-[#e67e22]" />
            <span className="text-sm font-semibold text-[#0d1b2a]">1</span>
            <span className="text-sm text-[#6b7c93]">Attention</span>
          </div>
        </div>

        {/* Health Insights Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-[#0d1b2a]">Health Insights</h2>
            <button className="flex items-center gap-1 text-sm text-[#0077cc] font-medium bg-[#e8f4fd] px-3 py-1.5 rounded-full">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {/* Insight Cards */}
          <InsightCard
            category="Cardiovascular"
            title="Blood Pressure Trending Higher"
            description="Your recent readings show a slight upward trend. Worth discussing with your doctor."
            severity="warning"
          />
          <InsightCard
            category="Cardiovascular"
            title="Heart Rate Looks Healthy"
            description="Your resting heart rate is within a great range, indicating good cardiovascular fitness."
            severity="good"
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab="health" />
    </div>
  )
}
