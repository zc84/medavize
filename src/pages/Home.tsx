import { Link } from 'react-router-dom'
import { Activity, Shield, Clock } from 'lucide-react'

export function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-navy-900 text-white px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Medavize</h1>
          <Link 
            to="/login" 
            className="bg-white text-navy-900 px-4 py-2 rounded-lg font-medium hover:bg-neutral-100 transition"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-2xl text-center">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Less time managing care.
          </h2>
          <h2 className="text-4xl font-bold text-teal-600 mb-6">
            More time being there.
          </h2>
          <p className="text-xl text-neutral-600 mb-4">
            Your companion in caregiving. We see you. We know the hours you give.
          </p>
          <p className="text-lg text-neutral-500 mb-10">
            Simplify care, manage health records, and get insights—all in one secure place.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Activity className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-neutral-900 mb-2">Track Vitals</h3>
              <p className="text-sm text-neutral-600">Monitor blood pressure, heart rate, weight with ease</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Shield className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-neutral-900 mb-2">Secure & Private</h3>
              <p className="text-sm text-neutral-600">HIPAA-level data integrity. Your data stays with you.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Clock className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-neutral-900 mb-2">Save Time</h3>
              <p className="text-sm text-neutral-600">Over 27 hours of care per week? Let us help.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup"
              className="inline-block bg-teal-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-teal-700 transition"
            >
              Get Started Free
            </Link>
            <Link 
              to="/login"
              className="inline-block bg-navy-800 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-navy-900 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-100 py-8 px-6">
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
