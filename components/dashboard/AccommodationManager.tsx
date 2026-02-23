'use client'

import { useState, useEffect } from 'react'
import { Home, Wrench, PoundSterling, Calendar, Plus, MessageSquare, Trash2, CheckCircle2 } from 'lucide-react'

interface MaintenanceIssue {
    id: string
    issue: string
    date: string
    resolved: boolean
}

interface AccommodationData {
    landlord: string
    rentAmount: string
    rentDate: string
    maintenance: MaintenanceIssue[]
}

export function AccommodationManager() {
    const [data, setData] = useState<AccommodationData>({
        landlord: '',
        rentAmount: '',
        rentDate: '',
        maintenance: []
    })
    const [newIssue, setNewIssue] = useState('')

    useEffect(() => {
        const saved = localStorage.getItem('student-mind-accommodation')
        if (saved) setData(JSON.parse(saved))
    }, [])

    const save = (newData: AccommodationData) => {
        setData(newData)
        localStorage.setItem('student-mind-accommodation', JSON.stringify(newData))
    }

    const addIssue = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newIssue) return
        const issue: MaintenanceIssue = {
            id: crypto.randomUUID(),
            issue: newIssue,
            date: new Date().toISOString().split('T')[0],
            resolved: false
        }
        save({ ...data, maintenance: [issue, ...data.maintenance] })
        setNewIssue('')
    }

    const toggleIssue = (id: string) => {
        const updated = data.maintenance.map(m =>
            m.id === id ? { ...m, resolved: !m.resolved } : m
        )
        save({ ...data, maintenance: updated })
    }

    const deleteIssue = (id: string) => {
        save({ ...data, maintenance: data.maintenance.filter(m => m.id !== id) })
    }

    return (
        <div className="card rounded-2xl p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6 text-[var(--blue)]">
                <Home className="w-5 h-5" />
                <h2 className="font-semibold text-[var(--text)]">Accommodation</h2>
            </div>

            {/* Rent info */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)]">
                    <div className="flex items-center gap-2 mb-1 text-[var(--text-muted)] uppercase text-[9px] font-bold tracking-widest">
                        <PoundSterling className="w-3 h-3" /> Monthly Rent
                    </div>
                    <input
                        placeholder="£ Amount"
                        value={data.rentAmount}
                        onChange={e => save({ ...data, rentAmount: e.target.value })}
                        className="bg-transparent text-sm font-bold text-[var(--text)] w-full outline-none"
                    />
                </div>
                <div className="p-3 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)]">
                    <div className="flex items-center gap-2 mb-1 text-[var(--text-muted)] uppercase text-[9px] font-bold tracking-widest">
                        <Calendar className="w-3 h-3" /> Rent Day
                    </div>
                    <input
                        type="number"
                        min="1"
                        max="31"
                        placeholder="1st"
                        value={data.rentDate}
                        onChange={e => save({ ...data, rentDate: e.target.value })}
                        className="bg-transparent text-sm font-bold text-[var(--text)] w-full outline-none"
                    />
                </div>
            </div>

            {/* Maintenance Log */}
            <div className="flex-1 flex flex-col min-h-0">
                <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5" /> Maintenance Log
                </h3>

                <form onSubmit={addIssue} className="flex gap-2 mb-4">
                    <input
                        placeholder="Report an issue (e.g. leaky tap)"
                        value={newIssue}
                        onChange={e => setNewIssue(e.target.value)}
                        className="input-theme flex-1 px-3 py-2 rounded-lg text-xs"
                    />
                    <button type="submit" className="p-2 rounded-lg bg-[var(--accent)] text-white hover:opacity-90 transition-opacity">
                        <Plus className="w-4 h-4" />
                    </button>
                </form>

                <div className="space-y-2 overflow-y-auto pr-1 flex-1 max-h-[250px]">
                    {data.maintenance.length === 0 ? (
                        <p className="text-xs text-[var(--text-muted)] text-center py-8 italic">No issues reported yet.</p>
                    ) : (
                        data.maintenance.map(item => (
                            <div key={item.id} className="p-3 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <button onClick={() => toggleIssue(item.id)} className="shrink-0">
                                        {item.resolved ? (
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                        ) : (
                                            <div className="w-4 h-4 rounded-full border-2 border-[var(--border)] group-hover:border-[var(--accent)] transition-colors" />
                                        )}
                                    </button>
                                    <div>
                                        <p className={`text-xs font-bold ${item.resolved ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text)]'}`}>
                                            {item.issue}
                                        </p>
                                        <p className="text-[9px] text-[var(--text-muted)]">{item.date}</p>
                                    </div>
                                </div>
                                <button onClick={() => deleteIssue(item.id)} className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-rose-500 transition-opacity">
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--border)]">
                <div className="flex items-center gap-2 text-[var(--text-muted)] text-[9px] font-bold uppercase tracking-tight">
                    <MessageSquare className="w-3 h-3" />
                    <span>Landlord: </span>
                    <input
                        placeholder="Name/Contact"
                        value={data.landlord}
                        onChange={e => save({ ...data, landlord: e.target.value })}
                        className="bg-transparent outline-none flex-1 font-bold text-[var(--text-sub)]"
                    />
                </div>
            </div>
        </div>
    )
}
