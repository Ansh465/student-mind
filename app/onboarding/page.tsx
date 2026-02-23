'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { GraduationCap, CalendarDays, CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function OnboardingPage() {
    const router = useRouter()
    const [visaExpiry, setVisaExpiry] = useState('')
    const [weeklyLimit, setWeeklyLimit] = useState('20')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            router.push('/login')
            return
        }

        const { error } = await supabase
            .from('profiles')
            .update({
                visa_expiry_date: visaExpiry,
                weekly_hour_limit: parseInt(weeklyLimit),
                onboarding_complete: true,
                updated_at: new Date().toISOString(),
            })
            .eq('id', user.id)

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }

        router.push('/dashboard')
        router.refresh()
    }

    const steps = [
        'Your visa expiry date will power the countdown timer',
        'Your weekly hour limit helps track work compliance',
        'You can update these anytime from the dashboard',
    ]

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[var(--bg)]">
            {/* Theme toggle — top right */}
            <div className="fixed top-4 right-4 z-10">
                <ThemeToggle />
            </div>

            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-20 w-80 h-80 opacity-15 rounded-full blur-3xl"
                    style={{ background: 'var(--accent)' }} />
                <div className="absolute bottom-20 left-20 w-80 h-80 opacity-15 rounded-full blur-3xl"
                    style={{ background: 'var(--indigo)' }} />
            </div>

            <div className="w-full max-w-lg animate-fade-in-up">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                        style={{ background: 'var(--accent)' }}>
                        <GraduationCap className="w-8 h-8" style={{ color: 'var(--accent-fg)' }} />
                    </div>
                    <h1 className="text-3xl font-bold text-[var(--text)]">Let's get you set up</h1>
                    <p className="text-[var(--text-sub)] mt-2">A few quick details to personalise your dashboard</p>
                </div>

                {/* Info tips */}
                <div className="rounded-xl p-4 mb-6 space-y-2 border border-[var(--border)] bg-[var(--bg-raised)]">
                    {steps.map((tip, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--indigo)' }} />
                            <p className="text-sm text-[var(--text-sub)]">{tip}</p>
                        </div>
                    ))}
                </div>

                <div className="card rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="flex items-center gap-2 p-3 rounded-lg text-sm border"
                                style={{ background: 'var(--red-soft)', borderColor: 'var(--red)', color: 'var(--red)' }}>
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[var(--text-sub)] flex items-center gap-2">
                                <CalendarDays className="w-4 h-4 text-[var(--indigo)]" />
                                Visa Expiry Date
                            </label>
                            <input
                                type="date"
                                value={visaExpiry}
                                onChange={e => setVisaExpiry(e.target.value)}
                                required
                                min={new Date().toISOString().split('T')[0]}
                                className="input-theme w-full px-4 py-3 rounded-xl"
                                style={{ colorScheme: 'light dark' }}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[var(--text-sub)]">
                                Weekly Work Hour Limit
                            </label>
                            <select
                                value={weeklyLimit}
                                onChange={e => setWeeklyLimit(e.target.value)}
                                className="input-theme w-full px-4 py-3 rounded-xl"
                                style={{ colorScheme: 'light dark' }}
                            >
                                <option value="20">20 hours/week (term time — standard)</option>
                                <option value="40">40 hours/week (vacation period)</option>
                                <option value="10">10 hours/week (foundation/below degree)</option>
                            </select>
                            <p className="text-xs text-[var(--text-muted)] mt-1">
                                Check your visa conditions for the exact limit applicable to you.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-accent w-full py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                            ) : 'Go to Dashboard →'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
