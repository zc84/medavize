import { Link } from 'react-router-dom'
import { Activity, FileText, Calendar, LogOut, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-navy-900 text-white px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Medavize</h1>
            <p className="text-navy-200 text-sm">Welcome back, {user?.fullName || 'User'}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-navy-800 px-4 py-2 rounded-lg">
              <User className="w-5 h-5 text-teal-400" />
              <span className="text-sm">{user?.email || user?.phone}</span>
            </div>
            <button 
              onClick={logout}
              className="p-2 hover:bg-navy-800 rounded-lg transition"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Your Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-100 p-3 rounded-lg">
                <Activity className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="font-semibold text-neutral-900">Health Vitals</h3>
            </div>
            <p className="text-neutral-600 mb-4">Track your vitals and health metrics</p>
            <button className="text-teal-600 font-medium hover:text-teal-700">
              View Vitals →
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-navy-100 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-navy-600" />
              </div>
              <h3 className="font-semibold text-neutral-900">Documents</h3>
            </div>
            <p className="text-neutral-600 mb-4">Manage your medical records</p>
            <button className="text-navy-600 font-medium hover:text-navy-700">
              View Documents →
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-neutral-900">Appointments</h3>
            </div>
            <p className="text-neutral-600 mb-4">Upcoming doctor visits</p>
            <button className="text-purple-600 font-medium hover:text-purple-700">
              View Calendar →
            </button>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-navy-800 to-navy-900 rounded-2xl p-8 text-white">
          <h3 className="text-xl font-bold mb-2">Onboarding Complete!</h3>
          <p className="text-navy-200">
            You're all set up. Start tracking your health and managing care with Medavize.
          </p>
          <p className="text-sm text-navy-300 mt-4">
            Trial Status: Active (expires in 30 days)
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-100 py-6 px-6 mt-8">
        <div className="max-w-6xl mx-auto text-center text-neutral-600">
          <p>© 2026 Medavize. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2 text-sm">
            <Link to="/terms" className="hover:text-teal-600">Terms</Link>
            <Link to="/privacy" className="hover:text-teal-600">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
