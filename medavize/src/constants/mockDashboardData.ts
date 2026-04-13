// Mock data for prototype dashboard

export const HERO_MESSAGES = [
  "Your sleep & heart rate are improving together. Keep it up!",
  "Your activity levels are trending up this week. Great progress!",
  "Your blood pressure readings are stable. Keep monitoring.",
  "Your morning routine is helping your energy levels stay consistent.",
  "Your heart rate variability shows good recovery after workouts.",
  "Your stress levels have decreased since last month. Excellent!",
  "Your step count is on track for your weekly goal.",
  "Your sleep quality improved by 15% this week."
]

export interface InsightCard {
  id: string
  title: string
  body: string
  action?: string
  category: 'heart' | 'lab' | 'audio' | 'general'
  requiredSource?: 'apple-health' | 'google-health' | 'manual-vitals' | 'documents' | 'audio'
}

export const INSIGHT_CARDS: InsightCard[] = [
  {
    id: 'hrv-improvement',
    title: 'Heart rate variability',
    body: 'Your HRV has improved by 12% this week',
    action: 'See trend',
    category: 'heart'
  },
  {
    id: 'sleep-quality',
    title: 'Sleep quality',
    body: 'Average 7.5 hours, up from 6.8 hours last week',
    action: 'See analysis',
    category: 'heart'
  },
  {
    id: 'metabolic-glucose',
    title: 'Metabolic',
    body: 'Blood glucose slightly elevated after meals.',
    action: 'View details',
    category: 'general'
  },
  {
    id: 'heart-trend',
    title: 'Heart trend',
    body: 'Your resting heart rate has decreased by 3 bpm this month.',
    action: 'See trend',
    category: 'heart',
    requiredSource: 'apple-health'
  },
  {
    id: 'lab-reminder',
    title: 'Lab reminder',
    body: 'Your cholesterol levels are within healthy range.',
    action: 'Add to visit prep',
    category: 'lab',
    requiredSource: 'documents'
  },
  {
    id: 'audio-insight',
    title: 'From your audio note',
    body: 'You mentioned feeling more energetic in the mornings.',
    action: 'Log meal',
    category: 'audio',
    requiredSource: 'audio'
  },
  {
    id: 'activity-spike',
    title: 'Activity spike',
    body: 'You had a 20% increase in steps yesterday.',
    action: 'View details',
    category: 'general',
    requiredSource: 'apple-health'
  },
  {
    id: 'sleep-pattern',
    title: 'Sleep pattern',
    body: 'Your deep sleep increased by 30 minutes last night.',
    action: 'See analysis',
    category: 'heart',
    requiredSource: 'apple-health'
  },
  {
    id: 'vitals-stable',
    title: 'Vitals stable',
    body: 'Your blood pressure readings are consistent this week.',
    action: 'View history',
    category: 'general',
    requiredSource: 'manual-vitals'
  }
]

export const FEEDBACK_MESSAGES = [
  "✅ Data synced successfully",
  "✅ Your uploaded lab report is processed. LDL is higher than last time.",
  "✅ Apple Health connected. Your heart rate data is now being analysed.",
  "✅ Your uploaded lab report shows Vitamin D low.",
  "✅ Audio note saved. New insights generated from your recording."
]

export const PREP_QUESTIONS = [
  "Have you noticed any changes in your sleep patterns?",
  "Should I adjust my blood pressure meds based on evening readings?",
  "Is my recent weight gain related to my medication?",
  "What should I discuss about my sleep patterns?",
  "Are there any concerns with my latest lab results?",
  "How can I improve my energy levels during the day?"
]

export interface AIResponse {
  keywords: string[]
  response: string
}

export const AI_RESPONSES: AIResponse[] = [
  {
    keywords: ['summarise', 'summarize', 'summary'],
    response: "Based on your recent data: Your heart rate is stable, sleep quality has improved, and activity levels are trending up. Overall positive health trajectory."
  },
  {
    keywords: ['cardiologist', 'heart', 'doctor'],
    response: "Consider asking about: your blood pressure trends, any medication side effects, and whether your current activity level is appropriate for your condition."
  },
  {
    keywords: ['trends', 'trend', 'pattern'],
    response: "I notice your resting heart rate has decreased by 3 bpm this month, which suggests improved cardiovascular fitness. Your sleep quality has also improved."
  }
]

export const DEFAULT_AI_RESPONSE = "This is a prototype. Connect real health data to receive personalised answers."

export const NO_DATA_HERO = "Connect your first data source to see health insights."
export const NO_DATA_AI_RESPONSE = "Please connect health data first."
