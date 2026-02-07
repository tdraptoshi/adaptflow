export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-slate-800 rounded-2xl p-8 border border-slate-700">
        <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-slate-400 mb-8">Last Updated: February 7, 2026</p>

        <div className="space-y-6 text-slate-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-3">1. Introduction</h2>
            <p>AdaptFlow ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share your information when you use our fitness challenge platform.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-white mb-2 mt-4">2.1 Account Information</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Email address</li>
              <li>Display name</li>
              <li>Password (encrypted)</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">2.2 Fitness Data from Connected Services</h3>
            <p className="mb-2">When you connect third-party fitness services, we collect:</p>
            
            <div className="space-y-3 ml-4">
              <div>
                <p className="font-semibold text-blue-300">From Strava:</p>
                <p>Activities (runs, walks, cycles), distance, duration, pace, activity dates</p>
              </div>
              
              <div>
                <p className="font-semibold text-blue-300">From Garmin Connect:</p>
                <p>Activities and workouts, daily step counts, distance, duration, heart rate, activity dates</p>
              </div>
              
              <div>
                <p className="font-semibold text-blue-300">From Apple Health:</p>
                <p>Step counts, active energy burned, walking/running distance, workout data</p>
              </div>
              
              <div>
                <p className="font-semibold text-blue-300">From Fitbit:</p>
                <p>Daily step counts, activities and exercises, distance, duration, calories, heart rate</p>
              </div>
              
              <div>
                <p className="font-semibold text-blue-300">From Coros:</p>
                <p>Training activities, distance, duration, pace, heart rate and GPS data</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">2.3 Challenge Data</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Challenges you create or join</li>
              <li>Your performance metrics in challenges</li>
              <li>Manual activity logs you submit</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">2.4 Usage Information</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Pages visited within AdaptFlow</li>
              <li>Features used</li>
              <li>Browser type and device information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">3. How We Use Your Information</h2>
            <p className="mb-2">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Create and manage your account</li>
              <li>Sync fitness data from connected services</li>
              <li>Calculate challenge rankings and statistics</li>
              <li>Display leaderboards and progress tracking</li>
              <li>Send email notifications (if you opt in)</li>
              <li>Improve our service and user experience</li>
              <li>Prevent fraud and abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">4. Data Sharing and Disclosure</h2>
            
            <h3 className="text-xl font-semibold text-white mb-2 mt-4">4.1 Within AdaptFlow</h3>
            <p className="mb-2">Your challenge performance data is visible to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Other participants in the same challenge</li>
              <li>Challenge creators</li>
              <li>Your display name and metrics appear on leaderboards</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">4.2 Third-Party Services</h3>
            <p className="mb-2">We share data with:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Supabase</strong> - Our database and authentication provider</li>
              <li><strong>Vercel</strong> - Our hosting provider</li>
              <li><strong>Stripe</strong> - Payment processing (for subscriptions)</li>
            </ul>
            <p className="font-semibold text-yellow-300 mt-2">We do NOT sell your data to third parties.</p>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">4.3 Legal Requirements</h3>
            <p>We may disclose your information if required by law or in response to legal process.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">5. Data Retention</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Account Data:</strong> Retained until you delete your account</li>
              <li><strong>Activity Data:</strong> Retained for 90 days after challenge completion</li>
              <li><strong>Deleted Accounts:</strong> All data permanently deleted within 30 days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">6. Your Rights and Choices</h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Access</strong> your data - Contact us for a copy of your data</li>
              <li><strong>Delete</strong> your account - All data will be permanently removed</li>
              <li><strong>Disconnect</strong> services - Unlink Strava, Garmin, etc. at any time</li>
              <li><strong>Opt out</strong> of emails - Unsubscribe from notifications</li>
              <li><strong>Correct</strong> information - Update your profile anytime</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">7. Data Security</h2>
            <p className="mb-2">We implement industry-standard security measures:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Encrypted data transmission (HTTPS/TLS)</li>
              <li>Encrypted password storage (bcrypt)</li>
              <li>Secure token storage for connected services</li>
              <li>Regular security audits</li>
              <li>Access controls and authentication</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">8. Third-Party Service Policies</h2>
            <p className="mb-2">Your use of connected services is also governed by their privacy policies:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Strava: <a href="https://www.strava.com/legal/privacy" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">https://www.strava.com/legal/privacy</a></li>
              <li>Garmin: <a href="https://www.garmin.com/en-US/privacy/" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">https://www.garmin.com/en-US/privacy/</a></li>
              <li>Apple: <a href="https://www.apple.com/legal/privacy/" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">https://www.apple.com/legal/privacy/</a></li>
              <li>Fitbit: <a href="https://www.fitbit.com/global/us/legal/privacy-policy" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">https://www.fitbit.com/global/us/legal/privacy-policy</a></li>
              <li>Coros: <a href="https://www.coros.com/privacy.php" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">https://www.coros.com/privacy.php</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">9. Children's Privacy</h2>
            <p>AdaptFlow is not intended for users under 13 years of age. We do not knowingly collect data from children under 13.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">10. International Users</h2>
            <p>AdaptFlow is operated in the United States. By using our service, you consent to the transfer of your data to the United States.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">11. California Privacy Rights (CCPA)</h2>
            <p className="mb-2">California residents have additional rights:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Right to know what data we collect</li>
              <li>Right to delete your data</li>
              <li>Right to opt-out of data sales (we don't sell data)</li>
              <li>Right to non-discrimination</li>
            </ul>
            <p className="mt-2">To exercise these rights, contact us at: <a href="mailto:privacy@adaptflow.app" className="text-blue-400 hover:underline">privacy@adaptflow.app</a></p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">12. European Privacy Rights (GDPR)</h2>
            <p className="mb-2">EU residents have additional rights:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Right to access your data</li>
              <li>Right to rectification</li>
              <li>Right to erasure</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object</li>
              <li>Right to withdraw consent</li>
            </ul>
            <p className="mt-2">To exercise these rights, contact us at: <a href="mailto:privacy@adaptflow.app" className="text-blue-400 hover:underline">privacy@adaptflow.app</a></p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">13. Changes to This Policy</h2>
            <p className="mb-2">We may update this Privacy Policy from time to time. We will notify you of changes by:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Posting the new policy on this page</li>
              <li>Updating the "Last Updated" date</li>
              <li>Sending an email notification (for material changes)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">14. Contact Us</h2>
            <p className="mb-2">If you have questions about this Privacy Policy:</p>
            <div className="bg-slate-700/50 rounded-lg p-4 mt-3">
              <p><strong>Email:</strong> <a href="mailto:privacy@adaptflow.app" className="text-blue-400 hover:underline">privacy@adaptflow.app</a></p>
              <p><strong>Website:</strong> <a href="https://adaptflow.app" className="text-blue-400 hover:underline">https://adaptflow.app</a></p>
            </div>
          </section>

          <section className="bg-blue-500/10 border-2 border-blue-500/50 rounded-xl p-6 mt-8">
            <p className="text-center text-slate-200 font-semibold">
              Your privacy matters to us. We are committed to being transparent about how we collect and use your fitness data to power our challenge platform while keeping your information secure.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
