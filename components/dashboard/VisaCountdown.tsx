'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { differenceInDays, format } from 'date-fns'
import { Shield, CalendarDays, Loader2, Edit3, Check } from 'lucide-react'

interface VisaCountdownProps {
    visaExpiryDate: string | null
    userId: string
}

export function VisaCountdown({ visaExpiryDate, userId }: VisaCountdownProps) {
    const router = useRouter()
    const [editing, setEditing] = useState(false)
    const [newDate, setNewDate] = useState(visaExpiryDate ?? '')
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    const daysLeft = visaExpiryDate
        ? differenceInDays(new Date(visaExpiryDate), new Date())
        : null

    const getColor = () => {
        if (daysLeft === null) return { ring: 'border-[var(--border-md)]', text: 'text-[var(--text-muted)]', badge: 'text-[var(--text-muted)]', badgeBg: 'bg-[var(--bg-raised)]', ringVar: 'var(--border-md)', glow: '' }
        if (daysLeft <= 30) return { ring: 'border-[var(--red)]', text: 'text-[var(--red)]', badge: 'text-[var(--red)]', badgeBg: 'bg-[var(--red-soft)]', ringVar: 'var(--red)', glow: 'glow-red' }
        if (daysLeft <= 90) return { ring: 'border-[var(--amber)]', text: 'text-[var(--amber)]', badge: 'text-[var(--amber)]', badgeBg: 'bg-[var(--amber-soft)]', ringVar: 'var(--amber)', glow: 'glow-amber' }
        return { ring: 'border-[var(--emerald)]', text: 'text-[var(--emerald)]', badge: 'text-[var(--emerald)]', badgeBg: 'bg-[var(--emerald-soft)]', ringVar: 'var(--emerald)', glow: 'glow-emerald' }
    }

    const colors = getColor()

    const getStatus = () => {
        if (daysLeft === null) return 'No date set'
        if (daysLeft < 0) return 'EXPIRED'
        if (daysLeft <= 30) return 'Urgent — renew now'
        if (daysLeft <= 90) return 'Plan your renewal'
        return 'Valid'
    }

    const handleSave = async () => {
        setSaving(true)
        setError('')
        const supabase = createClient()
        const { error } = await supabase
            .from('profiles')
            .update({ visa_expiry_date: newDate, updated_at: new Date().toISOString() })
            .eq('id', userId)

        if (error) { setError(error.message); setSaving(false); return }
        setEditing(false)
        setSaving(false)
        router.refresh()
    }

    return (
        <div className="card rounded-2xl p-6 h-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Shield className={`w-5 h-5 ${colors.text}`} />
                    <h2 className="font-semibold text-[var(--text)]">Visa Status</h2>
                </div>
                <button
                    onClick={() => setEditing(!editing)}
                    className="p-1.5 rounded-lg hover:bg-[var(--bg-raised)] text-[var(--text-muted)] hover:text-[var(--text-sub)] transition-colors"
                >
                    <Edit3 className="w-4 h-4" />
                </button>
            </div>

            {editing ? (
                <div className="space-y-3">
                    <input
                        type="date"
                        value={newDate}
                        onChange={e => setNewDate(e.target.value)}
                        className="input-theme w-full px-3 py-2 rounded-lg text-sm"
                        style={{ colorScheme: 'light dark' }}
                    />
                    {error && <p className="text-[var(--red)] text-xs">{error}</p>}
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="btn-accent w-full py-2 rounded-lg text-sm flex items-center justify-center gap-2"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        Save
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center text-center py-4">
                    {/* Circular countdown */}
                    <div className={`relative w-40 h-40 rounded-full border-4 ${colors.ring} ${colors.glow} flex items-center justify-center mb-6 animate-float transition-all duration-700`}
                        style={{ background: daysLeft !== null ? `radial-gradient(circle, ${colors.badgeBg} 0%, transparent 70%)` : '' }}>
                        <div className="relative">
                            <div className={`text-5xl font-black ${colors.text} tracking-tighter`}>
                                {daysLeft !== null ? Math.max(0, daysLeft) : '—'}
                            </div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mt-1">days left</div>
                        </div>
                    </div>

                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${colors.badge} ${colors.badgeBg} mb-3`}>
                        {getStatus()}
                    </span>

                    {visaExpiryDate && (
                        <div className="flex items-center gap-1.5 text-sm text-[var(--text-sub)]">
                            <CalendarDays className="w-3.5 h-3.5" />
                            <span>Expires {format(new Date(visaExpiryDate), 'dd MMM yyyy')}</span>
                        </div>
                    )}

                    {!visaExpiryDate && (
                        <p className="text-sm text-[var(--text-muted)]">Click the pencil icon to set your visa expiry date.</p>
                    )}
                </div>
            )}
        </div>
    )
}
