'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else router.push('/dashboard')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-green-700 mb-1">🌿 Freshly</h1>
        <p className="text-gray-400 text-sm mb-6">Sign in to your pantry</p>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-400"
          />
          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-2.5 rounded-lg text-sm font-semibold transition"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">
          No account?{' '}
          <Link href="/register" className="text-green-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}