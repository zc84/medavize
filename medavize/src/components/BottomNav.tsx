import { Link } from 'react-router-dom';
import { Heart, Database, Stethoscope, User } from 'lucide-react';

interface BottomNavProps {
  activeTab?: 'health' | 'data' | 'doctor' | 'profile';
}

export function BottomNav({ activeTab = 'health' }: BottomNavProps) {
  const tabs = [
    { id: 'health', label: 'Health', icon: Heart, path: '/dashboard' },
    { id: 'data', label: 'Data', icon: Database, path: '/data' },
    { id: 'doctor', label: 'Doctor', icon: Stethoscope, path: '/quick-actions' },
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
            className="flex flex-col items-center gap-1 py-1 px-3"
          >
            <Icon
              className={`w-6 h-6 ${
                isActive ? 'text-emerald-400' : 'text-neutral-400'
              }`}
              strokeWidth={isActive ? 2.5 : 2}
            />
            <span
              className={`text-xs font-medium ${
                isActive ? 'text-emerald-400' : 'text-neutral-400'
              }`}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
