'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Lock, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function ResetPasswordPage() {
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setStatus('error')
            setMessage('Passwords do not match')
            return
        }

        if (password.length < 6) {
            setStatus('error')
            setMessage('Password must be at least 6 characters')
            return
        }

        setStatus('loading')
        setMessage('')

        const supabase = createClient()
        const { error } = await supabase.auth.updateUser({
            password: password
        })

        if (error) {
            setStatus('error')
            setMessage(error.message)
            return
        }

        setStatus('success')

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
            router.push('/dashboard')
            router.refresh()
        }, 2000)
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[var(--bg)]">
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
                    <h1 className="text-3xl font-bold text-[var(--text)]">New Password</h1>
                    <p className="text-[var(--text-sub)] mt-2">Enter a new secure password</p>
                </div>

                <div className="card rounded-2xl p-8 glow-accent">
                    {status === 'success' ? (
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h3 className="text-xl font-bold text-[var(--text)]">Password Updated</h3>
                            <p className="text-[var(--text-sub)] text-sm pb-2">Redirecting you to dashboard...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleUpdatePassword} className="space-y-5">
                            {status === 'error' && (
                                <div className="flex items-center gap-2 p-3 rounded-lg text-sm border bg-red-500/10 border-red-500/20 text-red-500">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    <span>{message}</span>
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-[var(--text-sub)]">New Password</label>
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

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-[var(--text-sub)]">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        required
                                        placeholder="••••••••"
                                        className="input-theme w-full pl-10 pr-4 py-3 rounded-xl"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading' || !password || !confirmPassword}
                                className="btn-accent w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                            >
                                {status === 'loading' ? (<><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>) : 'Update Password'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
