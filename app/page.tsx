'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email }])
      
      if (error) {
        if (error.code === '23505') {
          setMessage('Already on the waitlist!')
          setStatus('error')
        } else {
          throw error
        }
      } else {
        setMessage('Thanks! You\'re on the list.')
        setStatus('success')
        setEmail('')
      }
    } catch (error) {
      setMessage('Something went wrong. Try again?')
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Your Training Plan that Adapts to Changes
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Voice and Video journals. AI analyzes. Adapts plan with your end goal in mind.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-4">
            <div className="flex gap-4">
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === 'loading' || status === 'success'}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
              <button 
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
              </button>
            </div>
          </form>
          
          {message && (
            <p className={`text-sm mb-8 ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}

          <p className="text-sm text-gray-500">
            Coming February 2026 • Built for and by runners
          </p>
        </div>

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
