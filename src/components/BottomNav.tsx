import { Heart, Database, Stethoscope, User } from 'lucide-react';

interface BottomNavProps {
  activeTab?: 'health' | 'data' | 'doctor' | 'profile';
}

export function BottomNav({ activeTab = 'health' }: BottomNavProps) {
  const tabs = [
    { id: 'health', label: 'Health', icon: Heart },
    { id: 'data', label: 'Data', icon: Database },
    { id: 'doctor', label: 'Doctor', icon: Stethoscope },
    { id: 'profile', label: 'Profile', icon: User },
  ] as const;

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#d0dce8] px-4 py-2 flex justify-around items-center z-40">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            className="flex flex-col items-center gap-1 py-1 px-3"
          >
            <Icon
              className={`w-6 h-6 ${
                isActive ? 'text-[#0077cc]' : 'text-[#6b7c93]'
              }`}
              strokeWidth={isActive ? 2.5 : 2}
            />
            <span
              className={`text-xs font-medium ${
                isActive ? 'text-[#0077cc]' : 'text-[#6b7c93]'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
