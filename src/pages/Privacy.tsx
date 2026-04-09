import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function Privacy() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-navy-900 px-6 py-6">
        <Link to="/" className="inline-flex items-center text-white hover:text-teal-300 transition">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-white mt-4">Privacy Policy</h1>
      </div>
      
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">1. Information We Collect</h2>
            <p className="text-neutral-600 leading-relaxed">
              Medavize collects information you provide directly, including your name, email address, phone number, and health data such as blood pressure, heart rate, weight, and other vitals.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">2. How We Use Your Information</h2>
            <p className="text-neutral-600 leading-relaxed">
              We use your information to provide, maintain, and improve our services, to process your requests, and to send you technical notices and support messages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">3. Data Storage and Security</h2>
            <p className="text-neutral-600 leading-relaxed">
              Your health data is stored locally on your device using browser storage (localStorage). In this demonstration version, no data is transmitted to external servers. All data remains under your control.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">4. Data Sharing</h2>
            <p className="text-neutral-600 leading-relaxed">
              We do not sell, trade, or rent your personal health information to third parties. We may share data only when required by law or to protect our rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">5. Apple Health and Google Health Connect</h2>
            <p className="text-neutral-600 leading-relaxed">
              When you connect Apple Health or Google Health Connect, we request access to specific health data types. This data is used solely to provide you with health insights and tracking features within the application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">6. Your Rights</h2>
            <p className="text-neutral-600 leading-relaxed">
              You have the right to access, correct, or delete your personal health data at any time. You can also choose to disconnect any health data sources you have connected.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">7. Children's Privacy</h2>
            <p className="text-neutral-600 leading-relaxed">
              Our service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">8. Changes to This Policy</h2>
            <p className="text-neutral-600 leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">9. Contact Us</h2>
            <p className="text-neutral-600 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at privacy@medavize.com
            </p>
          </section>

          <div className="pt-6 border-t border-neutral-200">
            <p className="text-sm text-neutral-400 text-center">
              Last updated: April 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
