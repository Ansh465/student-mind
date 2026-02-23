'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { format } from 'date-fns'
import { Clock, Plus, Loader2, Trash2, AlertCircle } from 'lucide-react'

interface WorkLog {
    id: string
    work_date: string
    hours: number
    notes?: string
}

interface WorkHourLogProps {
    userId: string
    weeklyHours: number
    weeklyLimit: number
    recentLogs: WorkLog[]
}

export function WorkHourLog({ userId, weeklyHours, weeklyLimit, recentLogs }: WorkHourLogProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])
    const [hours, setHours] = useState('')
    const [notes, setNotes] = useState('')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const pct = Math.min((weeklyHours / weeklyLimit) * 100, 100)
    const barGradient = pct >= 100
        ? 'linear-gradient(90deg, var(--red) 0%, #ff6b6b 100%)'
        : pct >= 75
            ? 'linear-gradient(90deg, var(--amber) 0%, #fbbf24 100%)'
            : 'linear-gradient(90deg, #10b981 0%, #34d399 100%)'

    const glowClass = pct >= 100 ? 'glow-rose' : pct >= 75 ? 'glow-amber' : 'glow-emerald'
    const remaining = Math.max(weeklyLimit - weeklyHours, 0)
    const remainingColor = pct >= 100 ? 'text-[var(--red)]' : pct >= 75 ? 'text-[var(--amber)]' : 'text-[var(--emerald)]'

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSubmitting(true)

        const supabase = createClient()
        const { error } = await supabase.from('work_logs').insert({
            user_id: userId,
            work_date: date,
            hours: parseFloat(hours),
            notes: notes.trim() || null,
        })

        if (error) { setError(error.message); setSubmitting(false); return }
        setHours('')
        setNotes('')
        setSubmitting(false)
        startTransition(() => router.refresh())
    }

    const handleDelete = async (id: string) => {
        const supabase = createClient()
        await supabase.from('work_logs').delete().eq('id', id)
        startTransition(() => router.refresh())
    }

    return (
        <div className="card rounded-2xl p-6 h-full">
            <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                <h2 className="font-semibold text-[var(--text)]">Work Hour Log</h2>
            </div>

            {/* Weekly summary */}
            <div className={`rounded-xl p-5 mb-6 bg-[var(--bg-raised)] border border-[var(--border)] transition-all duration-500 ${glowClass}`}>
                <div className="flex justify-between items-end mb-3">
                    <div>
                        <span className="text-4xl font-black text-[var(--text)] tracking-tighter">{weeklyHours.toFixed(1)}</span>
                        <span className="text-[var(--text-muted)] text-sm ml-1.5 font-medium">/ {weeklyLimit}h logged</span>
                    </div>
                    <div className="text-right">
                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-[var(--bg-card)] border border-[var(--border)] ${remainingColor}`}>
                            {remaining.toFixed(1)}h left
                        </span>
                    </div>
                </div>
                <div className="w-full h-4 rounded-full overflow-hidden bg-[var(--bg-input)] shadow-inner">
                    <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${pct}%`, background: barGradient }}
                    />
                </div>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Resets Monday</p>
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < Math.floor(weeklyHours / 4) ? 'bg-[var(--accent)]' : 'bg-[var(--bg-input)]'}`} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Add form */}
            <form onSubmit={handleAdd} className="space-y-3 mb-6">
                {error && (
                    <div className="flex items-center gap-2 p-2.5 rounded-lg border text-xs"
                        style={{ background: 'var(--red-soft)', borderColor: 'var(--red)', color: 'var(--red)' }}>
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <label className="text-xs text-[var(--text-sub)] font-medium">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            required
                            className="input-theme w-full px-3 py-2.5 rounded-xl text-sm"
                            style={{ colorScheme: 'light dark' }}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs text-[var(--text-sub)] font-medium">Hours</label>
                        <input
                            type="number"
                            value={hours}
                            onChange={e => setHours(e.target.value)}
                            required
                            step="0.5"
                            min="0.5"
                            max="24"
                            placeholder="e.g. 4.5"
                            className="input-theme w-full px-3 py-2.5 rounded-xl text-sm"
                        />
                    </div>
                </div>
                <input
                    type="text"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Notes (optional, e.g. 'Library shift')"
                    className="input-theme w-full px-3 py-2.5 rounded-xl text-sm"
                />
                <button
                    type="submit"
                    disabled={submitting || isPending}
                    className="btn-accent w-full py-3 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-[var(--accent-soft)]"
                >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                    <span className="font-bold">Log Shift</span>
                </button>
            </form>

            {/* Recent entries */}
            {recentLogs.length > 0 && (
                <div className="space-y-2">
                    <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Recent Entries</h3>
                    <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                        {recentLogs.map(log => (
                            <div key={log.id} className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-raised)] hover:bg-[var(--bg-input)] group transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                                        style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                                        {log.hours}
                                    </div>
                                    <div>
                                        <p className="text-sm text-[var(--text)] font-semibold">
                                            {format(new Date(log.work_date + 'T12:00:00'), 'EEE, dd MMM')}
                                        </p>
                                        {log.notes && <p className="text-xs text-[var(--text-muted)] line-clamp-1">{log.notes}</p>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-[var(--text-muted)]">{log.hours}h</span>
                                    <button
                                        onClick={() => handleDelete(log.id)}
                                        className="opacity-0 group-hover:opacity-100 p-1 rounded text-[var(--text-muted)] hover:text-[var(--red)] transition-all"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
