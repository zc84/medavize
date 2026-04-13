import { BottomNav } from '../components/BottomNav'
import { Clock, ChevronRight, User, Bell, Shield, Database, Download } from 'lucide-react'

// Menu Item Component
interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

function MenuItem({ icon, label, onClick }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between py-4 px-4 bg-white hover:bg-[#f8fafc] transition-colors border-b border-[#e8f0f7] last:border-b-0"
    >
      <div className="flex items-center gap-3">
        <span className="text-[#0077cc]">{icon}</span>
        <span className="text-[#0d1b2a] font-medium">{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-[#6b7c93]" />
    </button>
  );
}

// Stat Card Component
interface StatCardProps {
  value: number;
  label: string;
}

function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 border border-[#d0dce8] flex flex-col items-center">
      <span className="text-2xl font-bold text-[#0d1b2a]">{value}</span>
      <span className="text-sm text-[#6b7c93]">{label}</span>
    </div>
  );
}

// Menu Section Component
interface MenuSectionProps {
  title: string;
  children: React.ReactNode;
}

function MenuSection({ title, children }: MenuSectionProps) {
  return (
    <div className="mb-6">
      <h3 className="text-xs font-semibold text-[#6b7c93] uppercase tracking-wider mb-2 px-1">
        {title}
      </h3>
      <div className="bg-white rounded-xl border border-[#d0dce8] overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export function Profile() {
  return (
    <div className="h-full flex flex-col bg-[#f4f8fb] relative">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-4 border-b border-[#d0dce8]">
        <h1 className="text-xl font-bold text-[#0d1b2a]">Profile</h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        {/* Trial Banner */}
        <div className="bg-gradient-to-r from-[#e8f4fd] to-[#d0e8fb] rounded-xl p-4 mb-4 border border-[#0077cc]/20 flex items-center justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0077cc]/10 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-[#0077cc]" />
            </div>
            <div>
              <p className="font-semibold text-[#0d1b2a]">Free Trial — 25 days left</p>
              <p className="text-sm text-[#6b7c93]">Upgrade to keep full access to all features</p>
            </div>
          </div>
          <button className="text-[#0077cc] font-semibold text-sm whitespace-nowrap">
            Upgrade
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <StatCard value={0} label="Vitals" />
          <StatCard value={0} label="Documents" />
          <StatCard value={0} label="Visits" />
        </div>

        {/* Account Section */}
        <MenuSection title="Account">
          <MenuItem
            icon={<User className="w-5 h-5" />}
            label="Personal Info"
          />
          <MenuItem
            icon={<Bell className="w-5 h-5" />}
            label="Notifications"
          />
          <MenuItem
            icon={<Shield className="w-5 h-5" />}
            label="Privacy & Security"
          />
        </MenuSection>

        {/* Health Data Section */}
        <MenuSection title="Health Data">
          <MenuItem
            icon={<Database className="w-5 h-5" />}
            label="Connected Sources"
          />
          <MenuItem
            icon={<Download className="w-5 h-5" />}
            label="Export My Data"
          />
        </MenuSection>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab="profile" />
    </div>
  );
}
