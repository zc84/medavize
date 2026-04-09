import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Terms } from './pages/Terms'
import { Privacy } from './pages/Privacy'
import { useAuth } from './context/AuthContext'

// Onboarding steps
import { WelcomeStep } from './pages/onboarding/Welcome'
import { DataSourcesStep } from './pages/onboarding/DataSources'
import { AppleHealthStep } from './pages/onboarding/AppleHealth'
import { GoogleHealthStep } from './pages/onboarding/GoogleHealth'
import { VitalsStep } from './pages/onboarding/Vitals'
import { NotificationsStep } from './pages/onboarding/Notifications'
import { SubscriptionStep } from './pages/onboarding/Subscription'

// Dashboard (placeholder)
import { Dashboard } from './pages/Dashboard'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-neutral-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          
          {/* Onboarding Routes (Private) */}
          <Route path="/onboarding/welcome" element={<PrivateRoute><WelcomeStep /></PrivateRoute>} />
          <Route path="/onboarding/data-sources" element={<PrivateRoute><DataSourcesStep /></PrivateRoute>} />
          <Route path="/onboarding/apple-health" element={<PrivateRoute><AppleHealthStep /></PrivateRoute>} />
          <Route path="/onboarding/google-health" element={<PrivateRoute><GoogleHealthStep /></PrivateRoute>} />
          <Route path="/onboarding/vitals" element={<PrivateRoute><VitalsStep /></PrivateRoute>} />
          <Route path="/onboarding/notifications" element={<PrivateRoute><NotificationsStep /></PrivateRoute>} />
          <Route path="/onboarding/subscription" element={<PrivateRoute><SubscriptionStep /></PrivateRoute>} />
          
          {/* Dashboard (Private) */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
