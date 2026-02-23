'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { GraduationCap, Mail, Lock, User, AlertCircle, Loader2, CheckSquare, Square, ArrowLeft } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function SignupPage() {
    const router = useRouter()
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [consentLegal, setConsentLegal] = useState(false)
    const [consentTerms, setConsentTerms] = useState(false)
    const [consentAnalytics, setConsentAnalytics] = useState(false)

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        if (!consentLegal || !consentTerms) {
            setError('Please tick all required checkboxes to continue.')
            return
        }
        setLoading(true)

        const supabase = createClient()
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: fullName } },
        })

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }

        router.push('/onboarding')
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

            {/* Theme toggle */}
            <div className="fixed top-4 right-4 z-10">
                <ThemeToggle />
            </div>

            {/* Colorful Background Blobs */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="blob w-[600px] h-[600px] -top-40 -left-60" style={{ background: 'var(--accent)', opacity: 0.15 }} />
                <div className="blob w-[500px] h-[500px] bottom-0 -right-20" style={{ background: 'var(--violet)', opacity: 0.12 }} />
                <div className="blob w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ background: 'var(--sky)', opacity: 0.08 }} />
            </div>

            <div className="w-full max-w-md animate-fade-in-up">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 animate-pulse-ring"
                        style={{ background: 'var(--accent)' }}>
                        <GraduationCap className="w-8 h-8" style={{ color: 'var(--accent-fg)' }} />
                    </div>
                    <h1 className="text-3xl font-bold text-[var(--text)]">Get started</h1>
                    <p className="text-[var(--text-sub)] mt-2">Create your Student Mind account</p>
                </div>

                <div className="card rounded-2xl p-8">
                    <form onSubmit={handleSignup} className="space-y-5">
                        {error && (
                            <div className="flex items-center gap-2 p-3 rounded-lg text-sm border"
                                style={{ background: 'var(--red-soft)', borderColor: 'var(--red)', color: 'var(--red)' }}>
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[var(--text-sub)]">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                                <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                                    required placeholder="Your full name"
                                    className="input-theme w-full pl-10 pr-4 py-3 rounded-xl" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[var(--text-sub)]">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                                    required placeholder="you@university.ac.uk"
                                    className="input-theme w-full pl-10 pr-4 py-3 rounded-xl" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[var(--text-sub)]">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                                    required minLength={6} placeholder="Min. 6 characters"
                                    className="input-theme w-full pl-10 pr-4 py-3 rounded-xl" />
                            </div>
                        </div>

                        {/* ── CONSENT CHECKBOXES ─────────────────────── */}
                        <div className="space-y-3 pt-1">
                            {/* Mandatory: no legal advice */}
                            <label className="flex items-start gap-3 cursor-pointer">
                                <button type="button" onClick={() => setConsentLegal(v => !v)}
                                    className="flex-shrink-0 mt-0.5 w-5 h-5 rounded transition-colors"
                                    style={{ color: consentLegal ? 'var(--accent)' : 'var(--text-muted)' }}>
                                    {consentLegal ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                                </button>
                                <span className="text-xs text-[var(--text-sub)] leading-snug">
                                    I understand that Student Mind is <strong className="text-[var(--text)]">not a legal service</strong>. I am responsible for verifying my visa compliance with official UK Government sources and a qualified immigration adviser. <span className="text-[var(--red)]">*</span>
                                </span>
                            </label>

                            {/* Mandatory: ToS + Privacy */}
                            <label className="flex items-start gap-3 cursor-pointer">
                                <button type="button" onClick={() => setConsentTerms(v => !v)}
                                    className="flex-shrink-0 mt-0.5 w-5 h-5 rounded transition-colors"
                                    style={{ color: consentTerms ? 'var(--accent)' : 'var(--text-muted)' }}>
                                    {consentTerms ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                                </button>
                                <span className="text-xs text-[var(--text-sub)] leading-snug">
                                    I agree to the{' '}
                                    <Link href="/terms" target="_blank" className="hover:underline" style={{ color: 'var(--indigo)' }}>Terms of Service</Link>
                                    {' '}and{' '}
                                    <Link href="/privacy" target="_blank" className="hover:underline" style={{ color: 'var(--indigo)' }}>Privacy Policy</Link>. <span className="text-[var(--red)]">*</span>
                                </span>
                            </label>

                            {/* Optional: analytics */}
                            <label className="flex items-start gap-3 cursor-pointer">
                                <button type="button" onClick={() => setConsentAnalytics(v => !v)}
                                    className="flex-shrink-0 mt-0.5 w-5 h-5 rounded transition-colors"
                                    style={{ color: consentAnalytics ? 'var(--accent)' : 'var(--text-muted)' }}>
                                    {consentAnalytics ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                                </button>
                                <span className="text-xs text-[var(--text-sub)] leading-snug">
                                    I consent to anonymous, aggregated usage data collection to help improve the app. <span className="text-[var(--text-muted)]">(Optional)</span>
                                </span>
                            </label>

                            <p className="text-[11px] text-[var(--text-muted)]"><span className="text-[var(--red)]">*</span> Required to create an account.</p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !consentLegal || !consentTerms}
                            className="btn-accent w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed glow-accent"
                        >
                            {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Creating account...</>) : 'Create Account'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-[var(--text-muted)] mt-6">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium hover:underline" style={{ color: 'var(--indigo)' }}>
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
