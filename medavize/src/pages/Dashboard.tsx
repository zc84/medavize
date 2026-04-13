import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LogOut, Heart, Moon, AlertTriangle, X, Sparkles, Activity, Upload, Calendar, FileText } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import {
  INSIGHT_CARDS,
  FEEDBACK_MESSAGES,
  type InsightCard
} from '../constants/mockDashboardData'

export function Dashboard() {
  const { logout } = useAuth()
  const [insightCards, setInsightCards] = useState<InsightCard[]>([])
  const [feedbackBanner, setFeedbackBanner] = useState<string | null>(null)
  const [connectedSources, setConnectedSources] = useState<string[]>([])
  const [showAITip, setShowAITip] = useState(true)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)

  // Scroll to top on mount
  useEffect(() => {
    document.getElementById('app-content')?.scrollTo(0, 0)
  }, [])

  // Load connected sources from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('medavize_connected_sources')
    if (stored) {
      setConnectedSources(JSON.parse(stored))
    }
  }, [])

  // Check for recent data feedback
  useEffect(() => {
    const recentData = localStorage.getItem('medavize_recent_data')
    if (recentData) {
      // Show static message first, then random
      setFeedbackBanner(FEEDBACK_MESSAGES[0])
      localStorage.removeItem('medavize_recent_data')
      
      // Auto-dismiss after 4 seconds
      setTimeout(() => {
        setFeedbackBanner(null)
      }, 4000)
    }
  }, [])

  // Initialize insight cards
  useEffect(() => {
    // Always show static cards (first 3) regardless of connected sources
    const staticCards = INSIGHT_CARDS.slice(0, 3)
    
    if (connectedSources.length === 0) {
      // Show only static cards when no sources connected
      setInsightCards(staticCards)
    } else {
      // Filter cards based on connected sources
      const availableCards = INSIGHT_CARDS.filter(card => {
        if (!card.requiredSource) return true
        return connectedSources.includes(card.requiredSource)
      })
      
      // Prioritize static cards (first 3), then shuffle remaining and select 3-4 total
      const remainingCards = availableCards.slice(3)
      const shuffledRemaining = [...remainingCards].sort(() => Math.random() - 0.5)
      
      // Combine: static cards first, then random from remaining
      const selected = [...staticCards, ...shuffledRemaining].slice(0, Math.min(4, Math.max(3, availableCards.length)))
      setInsightCards(selected)
    }
  }, [connectedSources])

  return (
    <div className="min-h-full flex flex-col bg-neutral-100 pb-20">
      {/* Header - Black */}
      <header className="bg-black text-white px-5 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <img src="/logo-white.png" alt="Medavize" className="w-8 h-8 object-contain" />
            <h1 className="text-xl font-bold">medavize</h1>
          </Link>
          <button 
            onClick={logout}
            className="p-2 hover:bg-white/10 rounded-lg transition"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Premium Reminder - Yellow */}
      <div className="bg-yellow-50 border-b border-yellow-200 px-5 py-2 animate-pulse">
        <div className="flex items-center justify-between">
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

      {/* Welcome Message */}
      <div className="bg-white px-5 py-4 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-foreground">Hello, John!</h1>
        <p className="text-sm text-muted-foreground mt-1">Ready to take charge of your health today?</p>
      </div>

      {/* Recent Data Feedback Banner */}
      {feedbackBanner && (
        <div className="bg-emerald-50 border-b border-emerald-200 px-5 py-3">
          <p className="text-sm text-emerald-800">{feedbackBanner}</p>
        </div>
      )}

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-4">
        {/* Insight Cards - Single Card with Pagination Dots */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-foreground mb-3">Insights</h2>
          <div className="relative">
            {insightCards.map((card, index) => {
              const getIcon = () => {
                if (card.id === 'hrv-improvement') return <Heart className="w-5 h-5 text-rose-500" />
                if (card.id === 'sleep-quality') return <Moon className="w-5 h-5 text-indigo-500" />
                if (card.id === 'metabolic-glucose') return <AlertTriangle className="w-5 h-5 text-amber-500" />
                return null
              }
              
              return (
                <div
                  key={card.id}
                  className={`bg-white rounded-xl p-4 shadow-card h-40 flex flex-col transition-opacity duration-300 ${
                    index === currentCardIndex ? 'opacity-100' : 'hidden'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    {getIcon()}
                    <h3 className="font-semibold text-foreground">{card.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-3 flex-1">{card.body}</p>
                  {card.action && (
                    <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700 transition">
                      {card.action} →
                    </button>
                  )}
                </div>
              )
            })}
            
            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-3">
              {insightCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCardIndex(index)}
                  className={`w-2 h-2 rounded-full transition ${
                    index === currentCardIndex ? 'bg-emerald-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* AI Daily Tips Card */}
        {showAITip && (
          <div className="mb-6 relative">
            <button
              onClick={() => setShowAITip(false)}
              className="absolute top-2 right-2 p-1 hover:bg-white/50 rounded-lg transition"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-5 border border-violet-200">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-violet-100 rounded-lg">
                  <Sparkles className="w-5 h-5 text-violet-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">Heart Rate Looks Healthy</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Your average resting heart rate this week is 68 bpm, which falls within the ideal range of 60–100 bpm for adults. Consistent readings suggest stable heart function.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/add-vital"
              className="bg-white rounded-xl p-4 shadow-card hover:shadow-md transition flex flex-col items-center gap-2"
            >
              <Activity className="w-6 h-6 text-rose-500" />
              <span className="text-sm font-medium text-foreground">Add Vital</span>
            </Link>
            <Link
              to="/data"
              className="bg-white rounded-xl p-4 shadow-card hover:shadow-md transition flex flex-col items-center gap-2"
            >
              <Upload className="w-6 h-6 text-blue-500" />
              <span className="text-sm font-medium text-foreground">Upload Data</span>
            </Link>
            <Link
              to="/add-visit"
              className="bg-white rounded-xl p-4 shadow-card hover:shadow-md transition flex flex-col items-center gap-2"
            >
              <Calendar className="w-6 h-6 text-emerald-500" />
              <span className="text-sm font-medium text-foreground">Record Visit</span>
            </Link>
            <Link
              to="/quick-actions"
              className="bg-white rounded-xl p-4 shadow-card hover:shadow-md transition flex flex-col items-center gap-2"
            >
              <FileText className="w-6 h-6 text-purple-500" />
              <span className="text-sm font-medium text-foreground">Prep Visit</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
