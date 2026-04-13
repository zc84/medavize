import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function Terms() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header - Black */}
      <header className="bg-black px-5 py-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center text-white hover:text-emerald-400 transition">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-white mt-4">Terms of Service</h1>
        </div>
      </header>
      
      <div className="max-w-3xl mx-auto px-5 py-8">
        <div className="bg-neutral-100 rounded-xl shadow-card p-8 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using Medavize, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              Medavize is a personal health management application designed to help caregivers track health metrics, manage medical records, and receive health insights. The service is provided on an "as is" basis for demonstration and testing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. User Responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed">
              Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. Users agree to notify Medavize immediately of any unauthorized use of their account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Health Data Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              Medavize is not a medical device and should not be used for medical diagnosis or treatment. Always consult with a qualified healthcare professional for medical advice. The health data provided by this application is for informational purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">5. Privacy and Data Protection</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">6. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              In no event shall Medavize be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">7. Modifications to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              Medavize reserves the right to modify these terms at any time. Continued use of the service after such modifications constitutes your acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">8. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms of Service, please contact us at support@medavize.com
            </p>
          </section>

          <div className="pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              Last updated: April 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
