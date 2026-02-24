'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Mail, AlertCircle, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        setMessage('')

        const supabase = createClient()
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/api/auth/callback?next=/reset-password`,
        })

        if (error) {
            setStatus('error')
            setMessage(error.message)
            return
        }

        setStatus('success')
        setMessage('Check your email for the password reset link.')
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[var(--bg)]">
            {/* Back button — top left */}
            <div className="fixed top-4 left-4 z-10">
                <Link
                    href="/login"
                    className="btn-ghost px-4 py-2 text-sm flex items-center gap-2 font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to login
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
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[var(--text)]">Reset Password</h1>
                    <p className="text-[var(--text-sub)] mt-2">Enter your email to receive a reset link</p>
                </div>

                <div className="card rounded-2xl p-8 glow-accent">
                    {status === 'success' ? (
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h3 className="text-xl font-bold text-[var(--text)]">Check your email</h3>
                            <p className="text-[var(--text-sub)] text-sm pb-4">{message}</p>
                            <Link href="/login" className="btn-accent w-full py-3 px-4 rounded-xl inline-block mt-4">
                                Return to login
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleReset} className="space-y-5">
                            {status === 'error' && (
                                <div className="flex flex-col gap-1 p-3 rounded-lg text-sm border bg-red-500/10 border-red-500/20 text-red-500">
                                    <div className="flex items-center gap-2 font-bold">
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        <span>Error sending link</span>
                                    </div>
                                    <span className="text-xs opacity-90 pl-6">{message}</span>
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-[var(--text-sub)]">Email Address</label>
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

                            <button
                                type="submit"
                                disabled={status === 'loading' || !email}
                                className="btn-accent w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                            >
                                {status === 'loading' ? (<><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>) : 'Send Reset Link'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
