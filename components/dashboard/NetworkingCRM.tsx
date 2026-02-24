'use client'

import { useState } from 'react'
import { Users, Plus, Building2, Linkedin, Mail, Search } from 'lucide-react'

// Simple mock implementation
interface Contact {
    id: string
    name: string
    company: string
    role: string
    event: string
    linkedin: string
}

const mockContacts: Contact[] = [
    { id: '1', name: 'Sarah Jenkins', company: 'Deloitte', role: 'Campus Recruiter', event: 'Spring Careers Fair', linkedin: 'sarah-jenkins' },
    { id: '2', name: 'David Chen', company: 'Barclays', role: 'Software Engineer', event: 'Tech Society Mixer', linkedin: '' }
]

export function NetworkingCRM() {
    const [contacts, setContacts] = useState(mockContacts)

    return (
        <div className="card rounded-2xl p-6 flex-1 flex flex-col bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-raised)] border border-[var(--border)] overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-indigo-500" />
                    </div>
                    <h2 className="font-bold text-[var(--text)]">Networking Hub</h2>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--accent)]/10 text-[var(--accent)] rounded-lg text-xs font-bold hover:bg-[var(--accent)] hover:text-white transition-all">
                    <Plus className="w-3.5 h-3.5" /> Add
                </button>
            </div>

            <div className="relative mb-4">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                    type="text"
                    placeholder="Search contacts..."
                    className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-xl pl-9 pr-4 py-2 text-xs focus:border-[var(--accent)] outline-none"
                />
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                {contacts.map(c => (
                    <div key={c.id} className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] flex justify-between items-center group hover:border-[var(--accent)] transition-colors">
                        <div>
                            <h4 className="text-sm font-bold text-[var(--text)] leading-tight">{c.name}</h4>
                            <div className="flex items-center gap-1 mt-0.5 opacity-80">
                                <Building2 className="w-3 h-3 text-[var(--text-muted)]" />
                                <span className="text-[10px] font-medium text-[var(--text-sub)]">{c.role} at {c.company}</span>
                            </div>
                            <div className="text-[10px] text-[var(--text-muted)] mt-1.5 italic flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" /> Met at {c.event}
                            </div>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {c.linkedin && (
                                <a href={`https://linkedin.com/in/${c.linkedin}`} target="_blank" className="p-2 bg-[var(--bg-raised)] border border-[var(--border)] rounded-lg hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-500 transition-colors">
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            )}
                            <button className="p-2 bg-[var(--bg-raised)] border border-[var(--border)] rounded-lg hover:bg-[var(--accent)]/10 hover:border-[var(--accent)]/30 hover:text-[var(--accent)] transition-colors">
                                <Mail className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-[10px] text-center text-[var(--text-muted)] mt-4 pt-4 border-t border-[var(--border)]">
                UK applications are highly network-driven. Send follow-ups within 24 hours of meeting!
            </p>
        </div>
    )
}
