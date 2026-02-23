'use client'

import { useState, useEffect } from 'react'
import { Briefcase, Plus, Trash2, ExternalLink, ChevronRight, Search } from 'lucide-react'

interface Job {
    id: string
    company: string
    role: string
    status: 'Applied' | 'Interview' | 'Rejected' | 'Offer'
    link?: string
    date: string
}

const STATUS_COLORS = {
    'Applied': { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20' },
    'Interview': { bg: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/20' },
    'Rejected': { bg: 'bg-rose-500/10', text: 'text-rose-500', border: 'border-rose-500/20' },
    'Offer': { bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/20' },
}

export function JobTracker() {
    const [jobs, setJobs] = useState<Job[]>([])
    const [company, setCompany] = useState('')
    const [role, setRole] = useState('')
    const [status, setStatus] = useState<Job['status']>('Applied')
    const [link, setLink] = useState('')
    const [showAdd, setShowAdd] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem('student-mind-jobs')
        if (saved) setJobs(JSON.parse(saved))
    }, [])

    const saveJobs = (newJobs: Job[]) => {
        setJobs(newJobs)
        localStorage.setItem('student-mind-jobs', JSON.stringify(newJobs))
    }

    const addJob = (e: React.FormEvent) => {
        e.preventDefault()
        if (!company || !role) return
        const newJob: Job = {
            id: crypto.randomUUID(),
            company,
            role,
            status,
            link: link.trim() || undefined,
            date: new Date().toISOString()
        }
        saveJobs([newJob, ...jobs])
        setCompany('')
        setRole('')
        setStatus('Applied')
        setLink('')
        setShowAdd(false)
    }

    const deleteJob = (id: string) => {
        saveJobs(jobs.filter(j => j.id !== id))
    }

    const updateStatus = (id: string, newStatus: Job['status']) => {
        saveJobs(jobs.map(j => j.id === id ? { ...j, status: newStatus } : j))
    }

    return (
        <div className="card rounded-2xl p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-[var(--accent)]" />
                    <h2 className="font-semibold text-[var(--text)]">Job Tracker</h2>
                </div>
                <button
                    onClick={() => setShowAdd(!showAdd)}
                    className="p-2 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] hover:bg-[var(--bg-input)] transition-colors"
                >
                    <Plus className={`w-4 h-4 transition-transform ${showAdd ? 'rotate-45' : ''}`} />
                </button>
            </div>

            {showAdd && (
                <form onSubmit={addJob} className="mb-6 p-4 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            placeholder="Company"
                            value={company}
                            onChange={e => setCompany(e.target.value)}
                            required
                            className="input-theme w-full px-3 py-2 rounded-lg text-sm"
                        />
                        <input
                            placeholder="Role"
                            value={role}
                            onChange={e => setRole(e.target.value)}
                            required
                            className="input-theme w-full px-3 py-2 rounded-lg text-sm"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <select
                            value={status}
                            onChange={e => setStatus(e.target.value as Job['status'])}
                            className="input-theme w-full px-3 py-2 rounded-lg text-sm appearance-none"
                        >
                            <option value="Applied">Applied</option>
                            <option value="Interview">Interview</option>
                            <option value="Offer">Offer</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                        <input
                            placeholder="URL (optional)"
                            value={link}
                            onChange={e => setLink(e.target.value)}
                            className="input-theme w-full px-3 py-2 rounded-lg text-sm"
                        />
                    </div>
                    <button type="submit" className="btn-accent w-full py-2 rounded-lg text-sm font-bold">
                        Add Application
                    </button>
                </form>
            )}

            <div className="space-y-3 overflow-y-auto pr-1 flex-1 max-h-[400px]">
                {jobs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-12 h-12 rounded-full bg-[var(--bg-raised)] flex items-center justify-center mb-3">
                            <Search className="w-6 h-6 text-[var(--text-muted)]" />
                        </div>
                        <p className="text-sm text-[var(--text-sub)]">No applications yet.<br />Start applying for some roles!</p>
                    </div>
                ) : (
                    jobs.map(job => (
                        <div key={job.id} className="group p-4 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] hover:bg-[var(--bg-input)] transition-all hover:translate-x-1">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-bold text-[var(--text)] text-sm">{job.role}</h3>
                                    <p className="text-xs text-[var(--text-sub)]">{job.company}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {job.link && (
                                        <a href={job.link} target="_blank" rel="noopener noreferrer" className="p-1 rounded hover:bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--accent)]">
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    )}
                                    <button onClick={() => deleteJob(job.id)} className="p-1 rounded hover:bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--red)] opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${STATUS_COLORS[job.status].bg} ${STATUS_COLORS[job.status].text} ${STATUS_COLORS[job.status].border}`}>
                                    {job.status}
                                </span>
                                <div className="flex gap-1">
                                    {(['Applied', 'Interview', 'Offer', 'Rejected'] as const).map(s => (
                                        <button
                                            key={s}
                                            onClick={() => updateStatus(job.id, s)}
                                            className={`w-2 h-2 rounded-full transition-all ${job.status === s ? STATUS_COLORS[s].text.replace('text', 'bg') : 'bg-[var(--border)]'}`}
                                            title={s}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--border)] flex justify-between items-center text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold">
                <span>{jobs.length} Applications</span>
                <span className="text-[var(--accent)]">Next step: Follow up</span>
            </div>
        </div>
    )
}
