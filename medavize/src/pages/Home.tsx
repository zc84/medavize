import { Link } from 'react-router-dom'
import { Brain, ClipboardList, FolderOpen, Shield, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

export function Home() {
  const [expanded, setExpanded] = useState<number | null>(null)

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index)
  }

  const cards = [
    {
      icon: Brain,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      title: 'AI Health Insights',
      desc: 'AI-powered analysis turns your health data into simple, visual findings – with drill-down details.'
    },
    {
      icon: ClipboardList,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      title: 'Doctor Visit Preparation',
      desc: 'Auto-generates a shareable summary, question list, and current meds – then listens to the visit to create a post-appointment recap.'
    },
    {
      icon: FolderOpen,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      title: 'Smart Intake',
      desc: 'Ingest anything: EHRs, Apple/Google Health, vitals, documents, audio, photos, or scans – all structured into a usable database.'
    },
    {
      icon: Shield,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      title: 'Secure Sharing',
      desc: 'HIPAA-compliant environment. Share visit prep docs and summaries with your doctor or caregiver – you stay in control.'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header - Black */}
      <header className="bg-black px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo-white.png" alt="Medavize" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold text-white">medavize</span>
          </div>
          <Link
            to="/login"
            className="text-white font-medium hover:text-emerald-400 transition text-sm"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        {/* Hero Section - Darker Background */}
        <div className="bg-neutral-100 px-5 py-10 border-b border-neutral-200">
          <p className="text-sm text-muted-foreground font-medium mb-3 uppercase tracking-wide">
            Your companion in caregiving
          </p>
          <h1 className="text-[28px] leading-tight font-bold text-foreground mb-3">
            Less time managing care.
            <span className="text-emerald-600 block mt-1">More time being there.</span>
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            We see you. We know the hours you give. Simplify care, manage health records, and get insights—all in one secure place.
          </p>
        </div>

        {/* Feature Cards Section - White Background */}
        <div className="bg-white px-5 py-10 border-b border-neutral-200">
          <div className="grid grid-cols-1 gap-2 mb-8">
          {cards.map((card, index) => {
            const Icon = card.icon
            const isExpanded = expanded === index
            return (
              <div key={index} className="bg-card rounded-xl shadow-card p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${card.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-4 h-4 ${card.iconColor}`} />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm">{card.title}</h3>
                  </div>
                  <button
                    onClick={() => toggleExpand(index)}
                    className="text-xs text-emerald-600 font-medium flex items-center gap-0.5 hover:text-emerald-700 transition"
                  >
                    {isExpanded ? (
                      <>
                        Less <ChevronUp className="w-3 h-3" />
                      </>
                    ) : (
                      <>
                        More <ChevronDown className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>
                {isExpanded && (
                  <div className="mt-2 pl-11">
                    <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        </div>

        {/* CTA Section - Darker Background */}
        <div className="bg-neutral-100 px-5 py-10">
          <div className="flex flex-col gap-3">
          <Link
            to="/signup"
            className="w-full bg-emerald-600 text-white py-4 rounded-full font-semibold text-lg hover:bg-emerald-700 transition text-center shadow-lg"
          >
            Get Started
          </Link>
          <p className="text-center text-sm text-neutral-500">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-600 font-medium hover:underline">
              Sign In
            </Link>
          </p>
          </div>
        </div>
      </main>

      {/* Footer - Black */}
      <footer className="bg-black py-6 px-5 mt-auto">
        <div className="text-center">
          <p className="text-sm text-neutral-400">© 2026 Medavize. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2 text-sm">
            <Link to="/terms" className="text-neutral-400 hover:text-emerald-400 transition">Terms</Link>
            <Link to="/privacy" className="text-neutral-400 hover:text-emerald-400 transition">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
