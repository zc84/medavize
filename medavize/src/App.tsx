import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { MobileFrame } from './components/MobileFrame'
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

// Dashboard
import { Dashboard } from './pages/Dashboard'

// New Mobile UI Pages
import { Profile } from './pages/Profile'
import { Data } from './pages/Data'
import { AddVisit } from './pages/AddVisit'
import { QuickActions } from './pages/QuickActions'

// Data Sources
import { DataSources } from './pages/DataSources'
import { EHRPage } from './pages/data-sources/EHR'
import { AppleHealthPage } from './pages/data-sources/AppleHealth'
import { GoogleHealthPage } from './pages/data-sources/GoogleHealth'
import { ManualVitalsPage } from './pages/data-sources/ManualVitals'
import { DocumentsPage } from './pages/data-sources/Documents'
import { AudioPage } from './pages/data-sources/Audio'
import { TextNotesPage } from './pages/data-sources/TextNotes'
import { ScansPage } from './pages/data-sources/Scans'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" />
}

function AppContent() {
  return (
    <div className="min-h-screen bg-background">
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
        
        {/* New Mobile UI Routes (Private) */}
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/data" element={<PrivateRoute><Data /></PrivateRoute>} />
        <Route path="/add-visit" element={<PrivateRoute><AddVisit /></PrivateRoute>} />
        <Route path="/quick-actions" element={<PrivateRoute><QuickActions /></PrivateRoute>} />
        
        {/* Data Sources Routes (Private) */}
        <Route path="/data-sources" element={<PrivateRoute><DataSources /></PrivateRoute>} />
        <Route path="/data-sources/ehr" element={<PrivateRoute><EHRPage /></PrivateRoute>} />
        <Route path="/data-sources/apple-health" element={<PrivateRoute><AppleHealthPage /></PrivateRoute>} />
        <Route path="/data-sources/google-health" element={<PrivateRoute><GoogleHealthPage /></PrivateRoute>} />
        <Route path="/data-sources/manual-vitals" element={<PrivateRoute><ManualVitalsPage /></PrivateRoute>} />
        <Route path="/data-sources/documents" element={<PrivateRoute><DocumentsPage /></PrivateRoute>} />
        <Route path="/data-sources/audio" element={<PrivateRoute><AudioPage /></PrivateRoute>} />
        <Route path="/data-sources/text-notes" element={<PrivateRoute><TextNotesPage /></PrivateRoute>} />
        <Route path="/data-sources/scans" element={<PrivateRoute><ScansPage /></PrivateRoute>} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <MobileFrame>
        <AppContent />
      </MobileFrame>
    </AuthProvider>
  )
}

export default App
