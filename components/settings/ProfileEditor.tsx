'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User, CalendarDays, Clock, Check, Loader2, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ProfileEditorProps {
    profile: {
        id: string
        full_name: string | null
        visa_expiry_date: string | null
        weekly_hour_limit: number
    }
}

export function ProfileEditor({ profile }: ProfileEditorProps) {
    const router = useRouter()
    if (!profile) {
        return (
            <div className="text-center py-8 space-y-4">
                <div className="inline-flex p-3 rounded-full bg-amber-500/10 text-amber-500">
                    <AlertCircle className="w-6 h-6" />
                </div>
                <div className="text-[var(--text)] font-bold">Profile not found</div>
                <p className="text-[var(--text-sub)] text-sm max-w-xs mx-auto">
                    We couldn't find your profile record. This usually happens if the database schema isn't fully set up or if you haven't completed onboarding.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="text-[var(--accent)] text-sm font-bold hover:underline"
                >
                    Try Refreshing
                </button>
            </div>
        )
    }

    const [fullName, setFullName] = useState(profile?.full_name || '')
    const [visaExpiry, setVisaExpiry] = useState(profile?.visa_expiry_date || '')
    const [weeklyLimit, setWeeklyLimit] = useState(profile?.weekly_hour_limit?.toString() || '20')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess(false)

        const supabase = createClient()

        const { error } = await supabase
            .from('profiles')
            .update({
                full_name: fullName,
                visa_expiry_date: visaExpiry || null,
                weekly_hour_limit: parseInt(weeklyLimit),
                updated_at: new Date().toISOString(),
            })
            .eq('id', profile.id)

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            setSuccess(true)
            setLoading(false)
            router.refresh()
            setTimeout(() => setSuccess(false), 3000)
        }
    }

    return (
        <form onSubmit={handleUpdate} className="space-y-8">
            {error && (
                <div className="flex items-center gap-2 p-4 rounded-2xl text-sm border bg-red-500/10 border-red-500/20 text-red-500">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Full Name */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest pl-1">Full Name</label>
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)] group-focus-within:text-[var(--accent)] transition-colors" />
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Your full name"
                            className="w-full !pl-14 pr-5 py-4 bg-[var(--bg-raised)] border border-[var(--border)] rounded-2xl text-[var(--text)] font-medium outline-none focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10 transition-all"
                        />
                    </div>
                </div>

                {/* Visa Expiry */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest pl-1">Visa Expiry Date</label>
                    <div className="relative group">
                        <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)] group-focus-within:text-[var(--accent)] transition-colors z-10" />
                        <input
                            type="date"
                            value={visaExpiry}
                            onChange={(e) => setVisaExpiry(e.target.value)}
                            style={{ colorScheme: 'light dark' }}
                            className="w-full !pl-14 pr-5 py-4 bg-[var(--bg-raised)] border border-[var(--border)] rounded-2xl text-[var(--text)] font-medium outline-none focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10 transition-all"
                        />
                    </div>
                </div>

                {/* Weekly Limit */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest pl-1">Weekly Work Hour Limit</label>
                    <div className="relative group">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)] group-focus-within:text-[var(--accent)] transition-colors z-10" />
                        <select
                            value={weeklyLimit}
                            onChange={(e) => setWeeklyLimit(e.target.value)}
                            className="w-full !pl-14 pr-10 py-4 bg-[var(--bg-raised)] border border-[var(--border)] rounded-2xl text-[var(--text)] font-medium outline-none focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10 transition-all appearance-none cursor-pointer"
                        >
                            <option value="20">20 hours/week (Standard)</option>
                            <option value="40">40 hours/week (Vacation)</option>
                            <option value="10">10 hours/week (Foundation)</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className={`flex items-center gap-2 px-8 py-3 rounded-2xl text-sm font-bold shadow-lg transition-all ${success
                        ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                        : 'bg-[var(--accent)] text-white shadow-[var(--accent)]/20 hover:opacity-90'
                        }`}
                >
                    {loading ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                    ) : success ? (
                        <><Check className="w-4 h-4" /> Profile Updated!</>
                    ) : (
                        <><Check className="w-4 h-4" /> Save Profile Details</>
                    )}
                </button>
            </div>
        </form>
    )
}
