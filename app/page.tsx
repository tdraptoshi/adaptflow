export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Your Training Plan that Adapts to Changes
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Voice and Video journals. AI analyzes. Adapts plan with your end goal in mind.
          </p>
          
          {/* Email Signup */}
          <div className="flex gap-4 max-w-md mx-auto mb-12">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
              Join Waitlist
            </button>
          </div>

          <p className="text-sm text-gray-500">
            Coming February 2026 • Built for and by runners
          </p>
        </div>

        {/* Features Section */}
        <div className="max-w-5xl mx-auto mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl mb-4">🎙️</div>
            <h3 className="text-xl font-semibold mb-2">Voice Journaling</h3>
            <p className="text-gray-600">
              After each workout, just talk. No typing while sweaty. 
              Capture how you felt, energy levels, aches, mood.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Strava Integration</h3>
            <p className="text-gray-600">
              Pulls your pace, heart rate, elevation, relative effort. 
              Combines objective data with subjective feel.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl mb-4">🧠</div>
            <h3 className="text-xl font-semibold mb-2">AI Adaptation</h3>
            <p className="text-gray-600">
              Missed workouts? High fatigue? Plan adjusts automatically. 
              Knows when to push, when to rest.
            </p>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="max-w-2xl mx-auto mt-20 bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-3xl font-bold text-center mb-4">Simple Pricing</h2>
          <div className="text-center">
            <p className="text-5xl font-bold text-blue-600 mb-2">$15<span className="text-2xl text-gray-500">/month</span></p>
            <ul className="text-left max-w-sm mx-auto mt-6 space-y-3">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Unlimited voice notes
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Strava integration
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                AI plan adaptation
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Training partner sharing
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
