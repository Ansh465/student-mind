'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { GraduationCap, Mail, Lock, AlertCircle, Loader2, ArrowLeft } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const supabase = createClient()
        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }

        router.push('/dashboard')
        router.refresh()
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[var(--bg)]">
            {/* Back button — top left */}
            <div className="fixed top-4 left-4 z-10">
                <Link
                    href="/"
                    className="btn-ghost px-4 py-2 text-sm flex items-center gap-2 font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to home
                </Link>
            </div>

            {/* Theme toggle — top right */}
            <div className="fixed top-4 right-4 z-10">
                <ThemeToggle />
            </div>

            {/* Colorful Background Blobs */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="blob w-[500px] h-[500px] -top-20 -right-20" style={{ background: 'var(--accent)', opacity: 0.15 }} />
                <div className="blob w-[400px] h-[400px] bottom-0 -left-20" style={{ background: 'var(--violet)', opacity: 0.12 }} />
                <div className="blob w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ background: 'var(--sky)', opacity: 0.08 }} />
            </div>

            <div className="w-full max-w-md animate-fade-in-up">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 animate-pulse-ring"
                        style={{ background: 'var(--accent)' }}>
                        <GraduationCap className="w-8 h-8" style={{ color: 'var(--accent-fg)' }} />
                    </div>
                    <h1 className="text-3xl font-bold text-[var(--text)]">Welcome back</h1>
                    <p className="text-[var(--text-sub)] mt-2">Sign in to Student Survival OS</p>
                </div>

                {/* Card */}
                <div className="card rounded-2xl p-8 glow-accent">
                    <form onSubmit={handleLogin} className="space-y-5">
                        {error && (
                            <div className="flex items-center gap-2 p-3 rounded-lg text-sm border"
                                style={{ background: 'var(--red-soft)', borderColor: 'var(--red)', color: 'var(--red)' }}>
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[var(--text-sub)]">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    placeholder="you@university.ac.uk"
                                    className="input-theme w-full pl-10 pr-4 py-3 rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[var(--text-sub)]">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="input-theme w-full pl-10 pr-4 py-3 rounded-xl"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-accent w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</>) : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-[var(--text-muted)] mt-6">
                        Don't have an account?{' '}
                        <Link href="/signup" className="font-medium hover:underline" style={{ color: 'var(--indigo)' }}>
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
