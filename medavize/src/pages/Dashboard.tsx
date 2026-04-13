import { Link } from 'react-router-dom'
import { Activity, Calendar, LogOut, User, Database, ChevronRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export function Dashboard() {
  const { logout } = useAuth()

  const quickActions = [
    {
      title: 'Data Sources',
      description: 'Connect EHR, wearables, and import health data',
      icon: Database,
      path: '/data-sources',
      color: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    {
      title: 'Health Vitals',
      description: 'Track your vitals and health metrics',
      icon: Activity,
      path: '/data',
      color: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    {
      title: 'Quick Actions',
      description: 'Add visits, record vitals, upload documents',
      icon: Calendar,
      path: '/quick-actions',
      color: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    {
      title: 'Profile',
      description: 'Manage your account and settings',
      icon: User,
      path: '/profile',
      color: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    }
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header - Black */}
      <header className="bg-black text-white px-5 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <img src="/logo-white.png" alt="Medavize" className="w-8 h-8 object-contain" />
            <h1 className="text-xl font-bold">medavize</h1>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
              <User className="w-5 h-5 text-emerald-400" />
            </div>
            <button 
              onClick={logout}
              className="p-2 hover:bg-white/10 rounded-lg transition"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Premium Reminder - Yellow */}
      <div className="bg-yellow-50 border-b border-yellow-200 px-5 py-2 animate-pulse">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-yellow-800">Free Trial</span>
                <span className="text-xs font-bold text-yellow-700">— 25 days left</span>
              </div>
              <div className="h-1.5 bg-yellow-200 rounded-full overflow-hidden">
                <div className="h-full w-[83%] bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          <Link to="/onboarding/subscription" className="ml-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition shadow-sm">
            Upgrade
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-neutral-100 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-5 py-8 pb-24">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-1">Welcome back, John</h1>
            <p className="text-muted-foreground">Here's an overview of your health journey</p>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link
                  key={action.title}
                  to={action.path}
                  className="bg-white p-5 rounded-xl shadow-card hover:shadow-lg transition group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-lg ${action.color}`}>
                      <Icon className={`w-6 h-6 ${action.iconColor}`} />
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-emerald-600 transition" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </Link>
              )
            })}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-card">
              <div className="text-2xl font-bold text-emerald-600 mb-1">3</div>
              <div className="text-sm text-muted-foreground">Data Sources</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-card">
              <div className="text-2xl font-bold text-emerald-600 mb-1">12</div>
              <div className="text-sm text-muted-foreground">Vitals Recorded</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-card">
              <div className="text-2xl font-bold text-emerald-600 mb-1">5</div>
              <div className="text-sm text-muted-foreground">Documents</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-card">
              <div className="text-2xl font-bold text-emerald-600 mb-1">2</div>
              <div className="text-sm text-muted-foreground">Visits</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black py-6 px-5">
        <div className="max-w-6xl mx-auto text-center text-neutral-400">
          <p className="text-sm">© 2026 Medavize. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2 text-sm">
            <Link to="/terms" className="hover:text-emerald-400 transition">Terms</Link>
            <Link to="/privacy" className="hover:text-emerald-400 transition">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
