import { useState, useEffect } from 'react'
import { RefreshCw, Sparkles } from 'lucide-react'
import {
  HERO_MESSAGES,
  INSIGHT_CARDS,
  FEEDBACK_MESSAGES,
  PREP_QUESTIONS,
  AI_RESPONSES,
  DEFAULT_AI_RESPONSE,
  NO_DATA_HERO,
  NO_DATA_AI_RESPONSE,
  type InsightCard
} from '../constants/mockDashboardData'

export function AIInsights() {
  const [heroMessage, setHeroMessage] = useState('')
  const [insightCards, setInsightCards] = useState<InsightCard[]>([])
  const [feedbackBanner, setFeedbackBanner] = useState<string | null>(null)
  const [aiInput, setAiInput] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [connectedSources, setConnectedSources] = useState<string[]>([])
  const [prepQuestion, setPrepQuestion] = useState('')

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
      const randomFeedback = FEEDBACK_MESSAGES[Math.floor(Math.random() * FEEDBACK_MESSAGES.length)]
      setFeedbackBanner(randomFeedback)
      localStorage.removeItem('medavize_recent_data')
      
      // Auto-dismiss after 4 seconds
      setTimeout(() => {
        setFeedbackBanner(null)
      }, 4000)
    }
  }, [])

  // Initialize hero message
  useEffect(() => {
    if (connectedSources.length === 0) {
      setHeroMessage(NO_DATA_HERO)
    } else {
      const randomMessage = HERO_MESSAGES[Math.floor(Math.random() * HERO_MESSAGES.length)]
      setHeroMessage(randomMessage)
    }
  }, [connectedSources])

  // Initialize insight cards
  useEffect(() => {
    if (connectedSources.length === 0) {
      setInsightCards([{
        id: 'no-data',
        title: 'No data yet',
        body: 'Tap Data Sources to begin',
        category: 'general'
      }])
    } else {
      // Filter cards based on connected sources
      const availableCards = INSIGHT_CARDS.filter(card => {
        if (!card.requiredSource) return true
        return connectedSources.includes(card.requiredSource)
      })
      
      // Shuffle and select 2-4 cards
      const shuffled = [...availableCards].sort(() => Math.random() - 0.5)
      const selected = shuffled.slice(0, Math.min(4, Math.max(2, shuffled.length)))
      setInsightCards(selected)
    }
  }, [connectedSources])

  // Initialize prep question
  useEffect(() => {
    const randomQuestion = PREP_QUESTIONS[Math.floor(Math.random() * PREP_QUESTIONS.length)]
    setPrepQuestion(randomQuestion)
  }, [])

  const handleRefresh = () => {
    const randomMessage = HERO_MESSAGES[Math.floor(Math.random() * HERO_MESSAGES.length)]
    setHeroMessage(randomMessage)
    
    // Shuffle insight cards
    const shuffled = [...insightCards].sort(() => Math.random() - 0.5)
    setInsightCards(shuffled)
  }

  const handleAIResponse = (input: string) => {
    const lowerInput = input.toLowerCase()
    
    // If no data sources connected, return specific message
    if (connectedSources.length === 0) {
      setAiResponse(NO_DATA_AI_RESPONSE)
      return
    }
    
    // Check for keyword matches
    for (const response of AI_RESPONSES) {
      if (response.keywords.some(keyword => lowerInput.includes(keyword))) {
        setAiResponse(response.response)
        return
      }
    }
    
    setAiResponse(DEFAULT_AI_RESPONSE)
  }

  const handleChipClick = (chip: string) => {
    setAiInput(chip)
    handleAIResponse(chip)
  }

  const handleSubmit = () => {
    if (aiInput.trim()) {
      handleAIResponse(aiInput)
    }
  }

  return (
    <div className="min-h-full flex flex-col bg-neutral-100 pb-20">
      {/* Header - Black */}
      <header className="bg-black text-white px-5 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">AI Insights</h1>
        </div>
      </header>

      {/* AI Insight Hero Section */}
      <div className="bg-black text-white px-5 py-6 border-b border-neutral-800">
        <div className="flex items-start gap-4">
          {/* Humanoid Avatar */}
          <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          
          <div className="flex-1">
            {/* Hero Message */}
            <p className="text-base font-medium mb-3">{heroMessage}</p>
            
            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh insights
            </button>
          </div>
        </div>
      </div>

      {/* Recent Data Feedback Banner */}
      {feedbackBanner && (
        <div className="bg-emerald-50 border-b border-emerald-200 px-5 py-3">
          <p className="text-sm text-emerald-800">{feedbackBanner}</p>
        </div>
      )}

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        {/* Insight Cards - Horizontally Scrollable */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-foreground mb-3">Insights</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {insightCards.map((card) => (
              <div key={card.id} className="bg-white rounded-xl p-4 shadow-card min-w-[280px] flex-shrink-0">
                <h3 className="font-semibold text-foreground mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{card.body}</p>
                {card.action && (
                  <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700 transition">
                    {card.action} →
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Visit Prep Teaser */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl p-5 border border-emerald-200">
            <h3 className="font-semibold text-foreground mb-2">Doctor Visit Prep</h3>
            {connectedSources.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-3">You have 2 insights ready for your next doctor visit.</p>
                <p className="text-sm text-foreground mb-3 italic">{prepQuestion}</p>
                <button className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition">
                  Review full document
                </button>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Add health records to prepare for doctor visits.</p>
            )}
          </div>
        </div>

        {/* Ask the AI */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-foreground mb-3">Ask the AI</h2>
          <div className="bg-white rounded-xl p-4 shadow-card">
            <input
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Ask me anything about your health…"
              className="w-full px-4 py-3 bg-neutral-50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-600 mb-3"
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
            
            {/* Suggested Chips */}
            <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
              <button
                onClick={() => handleChipClick('Summarise my last 3 days')}
                className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium whitespace-nowrap hover:bg-emerald-100 transition"
              >
                Summarise my last 3 days
              </button>
              <button
                onClick={() => handleChipClick('What should I ask my cardiologist?')}
                className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium whitespace-nowrap hover:bg-emerald-100 transition"
              >
                What should I ask my cardiologist?
              </button>
              <button
                onClick={() => handleChipClick('Spot any concerning trends?')}
                className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium whitespace-nowrap hover:bg-emerald-100 transition"
              >
                Spot any concerning trends?
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
            >
              <RefreshCw className="w-4 h-4" />
              Ask
            </button>

            {/* AI Response */}
            {aiResponse && (
              <div className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="text-sm text-emerald-800">{aiResponse}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
