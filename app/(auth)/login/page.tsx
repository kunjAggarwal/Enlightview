'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const supabase = createClient()

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/callback` },
    })
  }

  async function signInWithEmail(e: React.FormEvent) {
    e.preventDefault()
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/callback` },
    })
    setSent(true)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-sm space-y-6 p-8">
        <h1 className="text-2xl font-semibold text-white">Sign in to EnlightView</h1>

        <button
          onClick={signInWithGoogle}
          className="w-full rounded-md bg-white py-2 font-medium text-black"
        >
          Continue with Google
        </button>

        <div className="text-center text-sm text-gray-400">or</div>

        {sent ? (
          <p className="text-sm text-gray-300">
            Check your email — we sent you a login link.
          </p>
        ) : (
          <form onSubmit={signInWithEmail} className="space-y-3">
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-700 bg-black px-3 py-2 text-white"
            />
            <button
              type="submit"
              className="w-full rounded-md border border-gray-700 py-2 text-white"
            >
              Send magic link
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
