import { Link } from 'react-router-dom';
import { Database, Stethoscope, User, Sparkles, Home as HomeIcon } from 'lucide-react';

interface BottomNavProps {
  activeTab?: 'dashboard' | 'data-sources' | 'doctor-prep' | 'profile' | 'ai-insights';
}

export function BottomNav({ activeTab = 'dashboard' }: BottomNavProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
    { id: 'data-sources', label: 'Data Sources', icon: Database, path: '/data-sources' },
    { id: 'ai-insights', label: 'AI Insights', icon: Sparkles, path: '/ai-insights' },
    { id: 'doctor-prep', label: 'Doctor Prep', icon: Stethoscope, path: '/quick-actions' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ] as const;

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black px-4 py-2 flex justify-around items-center z-40">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <Link
            key={tab.id}
            to={tab.path}
            className="flex items-center justify-center py-2 px-3"
          >
            <Icon
              className={`w-6 h-6 ${
                isActive ? 'text-emerald-400' : 'text-neutral-400'
              }`}
              strokeWidth={isActive ? 2.5 : 2}
            />
          </Link>
        );
      })}
    </div>
  );
}
