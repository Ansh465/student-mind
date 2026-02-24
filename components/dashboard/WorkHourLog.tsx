'use client'

import { useState, useTransition, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { format } from 'date-fns'
import { Clock, Plus, Loader2, Trash2, AlertCircle, Briefcase, PoundSterling, Settings2, X, Flame } from 'lucide-react'
import { fireSuccessConfetti, fireMilestoneConfetti } from '@/lib/confetti'
import { AnimatedNumber } from '@/components/AnimatedNumber'

interface Job {
    id: string
    name: string
    rate: number
    color: string
}

interface WorkLog {
    id: string
    work_date: string
    hours: number
    notes?: string
}

interface ParsedWorkLog extends WorkLog {
    jobName: string
    jobRate: number
    originalNotes: string
    earnings: number
}

interface WorkHourLogProps {
    userId: string
    weeklyHours: number
    weeklyLimit: number
    recentLogs: WorkLog[]
}

const DEFAULT_JOB: Job = { id: 'default', name: 'Main Job', rate: 11.44, color: 'var(--accent)' }

export function WorkHourLog({ userId, weeklyHours, weeklyLimit, recentLogs }: WorkHourLogProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])
    const [hours, setHours] = useState('')
    const [notes, setNotes] = useState('')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [showJobManager, setShowJobManager] = useState(false)

    // Multi-job state
    const [jobs, setJobs] = useState<Job[]>([DEFAULT_JOB])
    const [selectedJobId, setSelectedJobId] = useState(DEFAULT_JOB.id)
    const [newJobName, setNewJobName] = useState('')
    const [newJobRate, setNewJobRate] = useState('')
    const [streak, setStreak] = useState(0)

    // Load jobs from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('student-mind-jobs-config')
        if (saved) {
            const parsed = JSON.parse(saved)
            if (parsed.length > 0) {
                setJobs(parsed)
                setSelectedJobId(parsed[0].id)
            }
        }
        // Calculate streak from recent logs
        try {
            const today = new Date()
            let currentStreak = 0
            const dates = [...new Set(recentLogs.map(l => l.work_date))].sort().reverse()
            let checkDate = new Date(today)
            for (const dateStr of dates) {
                const d = new Date(dateStr + 'T12:00:00')
                const diff = Math.floor((checkDate.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))
                if (diff <= 1) { currentStreak++; checkDate = d } else break
            }
            setStreak(currentStreak)
        } catch (e) { /* ignore */ }
    }, [recentLogs])

    const saveJobs = (updatedJobs: Job[]) => {
        setJobs(updatedJobs)
        localStorage.setItem('student-mind-jobs-config', JSON.stringify(updatedJobs))
    }

    const addJob = () => {
        if (!newJobName || !newJobRate) return
        const job: Job = {
            id: crypto.randomUUID(),
            name: newJobName,
            rate: parseFloat(newJobRate),
            color: `hsl(${Math.random() * 360}, 70%, 60%)`
        }
        saveJobs([...jobs, job])
        setNewJobName('')
        setNewJobRate('')
    }

    const deleteJob = (id: string) => {
        if (jobs.length <= 1) return
        const updated = jobs.filter(j => j.id !== id)
        saveJobs(updated)
        if (selectedJobId === id) setSelectedJobId(updated[0].id)
    }

    // Helper to parse the structured notes
    const parseLog = (log: WorkLog): ParsedWorkLog => {
        const match = log.notes?.match(/^\[(.*?):(.*?)]\s*(.*)$/)
        if (match) {
            const [_, name, rate, actualNotes] = match
            const r = parseFloat(rate)
            return {
                ...log,
                jobName: name,
                jobRate: r,
                originalNotes: actualNotes,
                earnings: log.hours * r
            }
        }
        // Fallback for old logs or logs without job prefix
        return {
            ...log,
            jobName: 'Work',
            jobRate: 0,
            originalNotes: log.notes || '',
            earnings: 0
        }
    }

    const parsedLogs = useMemo(() => recentLogs.map(parseLog), [recentLogs])
    const weeklyEarnings = useMemo(() => {
        // We only have the recent 10 logs here, but it's a good estimate.
        // For a full weekly total, we'd need all logs for the week.
        // Since we fetch weeklyHours, we'll just sum what we have in parsedLogs that fall in the current week.
        return parsedLogs.reduce((sum, log) => sum + log.earnings, 0)
    }, [parsedLogs])

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

        const job = jobs.find(j => j.id === selectedJobId) || jobs[0]
        const structuredNote = `[${job.name}:${job.rate}] ${notes.trim()}`

        const supabase = createClient()
        const { error } = await supabase.from('work_logs').insert({
            user_id: userId,
            work_date: date,
            hours: parseFloat(hours),
            notes: structuredNote,
        })

        if (error) { setError(error.message); setSubmitting(false); return }
        setHours('')
        setNotes('')
        setSubmitting(false)
        // Confetti! 🎉
        if (pct >= 100) {
            fireMilestoneConfetti() // Big blast for hitting the limit
        } else {
            fireSuccessConfetti()
        }
        startTransition(() => router.refresh())
    }

    const handleDelete = async (id: string) => {
        const supabase = createClient()
        await supabase.from('work_logs').delete().eq('id', id)
        startTransition(() => router.refresh())
    }

    return (
        <div className="card rounded-2xl p-6 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                    <h2 className="font-semibold text-[var(--text)]">Work Hour Log</h2>
                    {streak > 0 && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-500 text-[10px] font-black animate-pulse-ring">
                            <Flame className="w-3 h-3" />{streak}d
                        </span>
                    )}
                </div>
                <button
                    onClick={() => setShowJobManager(!showJobManager)}
                    className="p-2 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] hover:bg-[var(--bg-input)] transition-colors group"
                    title="Manage Jobs & Pay Rates"
                >
                    <Settings2 className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)]" />
                </button>
            </div>

            {/* Job Manager Modal-like view */}
            {showJobManager && (
                <div className="mb-6 p-4 rounded-xl bg-[var(--bg-card)] border-2 border-[var(--accent)] animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-[var(--accent)]" /> Manage Jobs
                        </h3>
                        <button onClick={() => setShowJobManager(false)}><X className="w-4 h-4" /></button>
                    </div>

                    <div className="space-y-3 mb-4">
                        {jobs.map(job => (
                            <div key={job.id} className="flex items-center justify-between p-2 rounded-lg bg-[var(--bg-raised)] border border-[var(--border)]">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: job.color }} />
                                    <span className="text-sm font-medium">{job.name}</span>
                                    <span className="text-xs text-[var(--text-muted)]">£{job.rate.toFixed(2)}/hr</span>
                                </div>
                                {jobs.length > 1 && (
                                    <button onClick={() => deleteJob(job.id)} className="text-[var(--text-muted)] hover:text-rose-500">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-2">
                        <input
                            placeholder="Job Name"
                            value={newJobName}
                            onChange={e => setNewJobName(e.target.value)}
                            className="input-theme px-3 py-2 rounded-lg text-xs"
                        />
                        <input
                            type="number"
                            placeholder="Rate (£/hr)"
                            value={newJobRate}
                            onChange={e => setNewJobRate(e.target.value)}
                            className="input-theme px-3 py-2 rounded-lg text-xs"
                        />
                    </div>
                    <button onClick={addJob} className="btn-accent w-full py-2 rounded-lg text-xs font-bold">
                        Add New Job
                    </button>
                </div>
            )}

            {/* Weekly summary */}
            <div className={`rounded-xl p-5 mb-6 bg-[var(--bg-raised)] border border-[var(--border)] transition-all duration-500 ${glowClass}`}>
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <div className="flex items-baseline gap-1.5">
                            <AnimatedNumber value={weeklyHours} decimals={1} className="text-4xl font-black text-[var(--text)] tracking-tighter" />
                            <span className="text-[var(--text-muted)] text-sm font-medium">/ {weeklyLimit}h logged</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-[var(--emerald)] font-bold">
                            <PoundSterling className="w-3.5 h-3.5" />
                            <span className="text-lg tracking-tight">~{weeklyEarnings.toFixed(2)}</span>
                            <span className="text-[10px] uppercase ml-1 opacity-70">est. earnings</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-[var(--bg-card)] border border-[var(--border)] ${remainingColor}`}>
                            {remaining.toFixed(1)}h left
                        </span>
                    </div>
                </div>
                <div className="w-full h-3 rounded-full overflow-hidden bg-[var(--bg-input)] shadow-inner">
                    <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${pct}%`, background: barGradient }}
                    />
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
                        <label className="text-xs text-[var(--text-sub)] font-medium">Job</label>
                        <select
                            value={selectedJobId}
                            onChange={e => setSelectedJobId(e.target.value)}
                            className="input-theme w-full px-3 py-2.5 rounded-xl text-sm appearance-none"
                        >
                            {jobs.map(j => (
                                <option key={j.id} value={j.id}>{j.name} (£{j.rate}/hr)</option>
                            ))}
                        </select>
                    </div>
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
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <label className="text-xs text-[var(--text-sub)] font-medium">Hours</label>
                        <input
                            type="number"
                            value={hours}
                            onChange={e => setHours(e.target.value)}
                            required
                            step="0.5"
                            min="0.5"
                            placeholder="e.g. 4.5"
                            className="input-theme w-full px-3 py-2.5 rounded-xl text-sm"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs text-[var(--text-sub)] font-medium">Notes</label>
                        <input
                            type="text"
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            placeholder="Optional"
                            className="input-theme w-full px-3 py-2.5 rounded-xl text-sm"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={submitting || isPending}
                    className="btn-accent w-full py-3 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-[var(--accent-soft)]"
                >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                    <span className="font-bold">Log Shift (Est. £{(parseFloat(hours) * (jobs.find(j => j.id === selectedJobId)?.rate || 0) || 0).toFixed(2)})</span>
                </button>
            </form>

            {/* Recent entries */}
            {
                parsedLogs.length > 0 && (
                    <div className="space-y-2 flex-1 flex flex-col min-h-0">
                        <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Recent Entries</h3>
                        <div className="space-y-2 overflow-y-auto pr-1 flex-1">
                            {parsedLogs.map(log => (
                                <div key={log.id} className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-raised)] hover:bg-[var(--bg-input)] group transition-all">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border)] text-[var(--accent)]">
                                                {log.jobName}
                                            </span>
                                            <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase">
                                                {format(new Date(log.work_date + 'T12:00:00'), 'EEE, dd MMM')}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(log.id)}
                                            className="opacity-0 group-hover:opacity-100 p-1 rounded text-[var(--text-muted)] hover:text-[var(--red)] transition-all"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="text-lg font-black text-[var(--text)] tracking-tighter">
                                                {log.hours.toFixed(1)}h
                                            </div>
                                            {log.originalNotes && (
                                                <p className="text-xs text-[var(--text-muted)] italic truncate max-w-[120px]">
                                                    "{log.originalNotes}"
                                                </p>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-[var(--emerald)] flex items-center justify-end gap-0.5">
                                                <PoundSterling className="w-3 h-3" />
                                                {log.earnings.toFixed(2)}
                                            </p>
                                            <p className="text-[9px] text-[var(--text-muted)] uppercase tracking-widest">
                                                £{log.jobRate}/hr
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        </div >
    )
}

