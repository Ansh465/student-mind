'use client'

import { useState, useEffect } from 'react'
import { GraduationCap, Plus, Calendar, Trash2, AlertTriangle } from 'lucide-react'
import { format, isBefore, parseISO, differenceInDays } from 'date-fns'

interface Deadline {
    id: string
    title: string
    date: string
    priority: 'Low' | 'Medium' | 'High'
}

const PRIORITY_COLORS = {
    'Low': 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    'Medium': 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    'High': 'text-rose-500 bg-rose-500/10 border-rose-500/20',
}

export function AcademicTracker() {
    const [deadlines, setDeadlines] = useState<Deadline[]>([])
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [priority, setPriority] = useState<Deadline['priority']>('Medium')
    const [showAdd, setShowAdd] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem('student-mind-academic')
        if (saved) setDeadlines(JSON.parse(saved))
    }, [])

    const saveDeadlines = (newDeadlines: Deadline[]) => {
        setDeadlines(newDeadlines)
        localStorage.setItem('student-mind-academic', JSON.stringify(newDeadlines))
    }

    const addDeadline = (e: React.FormEvent) => {
        e.preventDefault()
        if (!title || !date) return
        const newDeadline: Deadline = {
            id: crypto.randomUUID(),
            title,
            date,
            priority
        }
        const updated = [...deadlines, newDeadline].sort((a, b) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        )
        saveDeadlines(updated)
        setTitle('')
        setDate('')
        setPriority('Medium')
        setShowAdd(false)
    }

    const deleteDeadline = (id: string) => {
        saveDeadlines(deadlines.filter(d => d.id !== id))
    }

    const getDaysLeft = (dateStr: string) => {
        const d = parseISO(dateStr)
        const diff = differenceInDays(d, new Date())
        if (diff < 0) return 'Overdue'
        if (diff === 0) return 'Due Today'
        return `${diff} days left`
    }

    return (
        <div className="card rounded-2xl p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-[var(--accent)]" />
                    <h2 className="font-semibold text-[var(--text)]">Academic Goals</h2>
                </div>
                <button
                    onClick={() => setShowAdd(!showAdd)}
                    className="p-2 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] hover:bg-[var(--bg-input)] transition-colors"
                >
                    <Plus className={`w-4 h-4 transition-transform ${showAdd ? 'rotate-45' : ''}`} />
                </button>
            </div>

            {showAdd && (
                <form onSubmit={addDeadline} className="mb-6 p-4 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] space-y-3">
                    <input
                        placeholder="Assignment Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                        className="input-theme w-full px-3 py-2 rounded-lg text-sm"
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            required
                            className="input-theme w-full px-3 py-2 rounded-lg text-sm"
                            style={{ colorScheme: 'light dark' }}
                        />
                        <select
                            value={priority}
                            onChange={e => setPriority(e.target.value as Deadline['priority'])}
                            className="input-theme w-full px-3 py-2 rounded-lg text-sm appearance-none"
                        >
                            <option value="Low">Low Priority</option>
                            <option value="Medium">Medium Priority</option>
                            <option value="High">High Priority</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-accent w-full py-2 rounded-lg text-sm font-bold">
                        Add Deadline
                    </button>
                </form>
            )}

            <div className="space-y-3 overflow-y-auto flex-1 max-h-[400px] pr-1">
                {deadlines.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center opacity-60">
                        <Calendar className="w-10 h-10 mb-3 text-[var(--text-muted)]" />
                        <p className="text-sm">No deadlines set.<br />Enjoy the peace while it lasts!</p>
                    </div>
                ) : (
                    deadlines.map(d => {
                        const daysLeft = getDaysLeft(d.date)
                        const isLate = daysLeft === 'Overdue' || daysLeft === 'Due Today'

                        return (
                            <div key={d.id} className="p-4 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] group flex items-center justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${PRIORITY_COLORS[d.priority]}`}>
                                            {d.priority}
                                        </span>
                                        {isLate && <AlertTriangle className="w-3.5 h-3.5 text-rose-500 animate-pulse" />}
                                    </div>
                                    <h3 className="font-bold text-[var(--text)] text-sm truncate">{d.title}</h3>
                                    <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {format(parseISO(d.date), 'do MMM, yyyy')}
                                    </p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className={`text-xs font-bold mb-2 ${isLate ? 'text-rose-500' : 'text-[var(--text-sub)]'}`}>
                                        {daysLeft}
                                    </p>
                                    <button
                                        onClick={() => deleteDeadline(d.id)}
                                        className="p-1 rounded hover:bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--border)]">
                <div className="flex justify-between items-center text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold">
                    <span>{deadlines.length} Tasks active</span>
                    <span className="text-[var(--accent)] cursor-pointer hover:underline">View Roadmap</span>
                </div>
            </div>
        </div>
    )
}
