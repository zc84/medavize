import { ChevronRight, User, Bell, Shield, Database, Download, Crown, AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

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
      className="w-full flex items-center justify-between py-4 px-4 bg-white hover:bg-neutral-50 transition-colors border-b border-border last:border-b-0"
    >
      <div className="flex items-center gap-3">
        <span className="text-emerald-600">{icon}</span>
        <span className="text-foreground font-medium">{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
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
    <div className="bg-white rounded-xl p-4 border border-border flex flex-col items-center">
      <span className="text-2xl font-bold text-foreground">{value}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
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
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
        {title}
      </h3>
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export function Profile() {
  const [showPremium, setShowPremium] = useState(true)

  return (
    <div className="min-h-full flex flex-col bg-white relative">
      {/* Header - Black */}
      <header className="bg-black px-5 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <img src="/logo-white.png" alt="Medavize" className="w-8 h-8 object-contain" />
            <h1 className="text-xl font-bold text-white">Profile</h1>
          </Link>
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto bg-neutral-100 px-4 pt-4 pb-24">
        {/* Activate Premium Section */}
        {showPremium && (
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl p-4 mb-6 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Crown className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Activate Premium</p>
                <p className="text-sm text-muted-foreground">Unlock all features and get full access</p>
              </div>
            </div>
            <button 
              onClick={() => setShowPremium(false)}
              className="text-emerald-600 font-semibold text-sm whitespace-nowrap"
            >
              Hide
            </button>
          </div>
        )}

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

        {/* Delete Account Section */}
        <MenuSection title="Danger Zone">
          <button
            className="w-full flex items-center justify-between py-4 px-4 bg-red-50 hover:bg-red-100 transition-colors border-b border-red-200 last:border-b-0 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="text-red-600 font-medium">Delete my account and data</span>
            </div>
            <ChevronRight className="w-5 h-5 text-red-600" />
          </button>
        </MenuSection>
      </div>
    </div>
  );
}
