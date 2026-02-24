'use client'

import { useState, useEffect } from 'react'
import { Users, Plus, Building2, Linkedin, Mail, Search, Loader2, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Contact {
    id: string
    name: string
    company: string
    role: string
    event: string
    linkedin: string
}

export function NetworkingCRM({ userId }: { userId: string }) {
    const supabase = createClient()
    const [contacts, setContacts] = useState<Contact[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isAdding, setIsAdding] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    // Form state
    const [formData, setFormData] = useState({
        name: '', company: '', role: '', event: '', linkedin: ''
    })

    useEffect(() => {
        if (!userId) {
            setIsLoading(false)
            return
        }

        const fetchContacts = async () => {
            const { data } = await supabase
                .from('networking_contacts')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })

            if (data) setContacts(data)
            setIsLoading(false)
        }
        fetchContacts()
    }, [userId])

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name) return

        setIsSaving(true)
        const { data, error } = await supabase
            .from('networking_contacts')
            .insert({ user_id: userId, ...formData })
            .select()
            .single()

        if (!error && data) {
            setContacts([data, ...contacts])
            setIsAdding(false)
            setFormData({ name: '', company: '', role: '', event: '', linkedin: '' })
        }
        setIsSaving(false)
    }

    const handleDelete = async (id: string) => {
        setContacts(contacts.filter(c => c.id !== id))
        await supabase.from('networking_contacts').delete().eq('id', id)
    }

    const filteredContacts = contacts.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.company?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="card rounded-2xl p-6 flex-1 flex flex-col bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-raised)] border border-[var(--border)] overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-indigo-500" />
                    </div>
                    <h2 className="font-bold text-[var(--text)]">Networking Hub</h2>
                </div>
                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--accent)]/10 text-[var(--accent)] rounded-lg text-xs font-bold hover:bg-[var(--accent)] hover:text-white transition-all"
                    >
                        <Plus className="w-3.5 h-3.5" /> Add
                    </button>
                )}
            </div>

            {isAdding ? (
                <form onSubmit={handleAdd} className="flex-1 overflow-y-auto space-y-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 pr-2">
                    <input
                        required placeholder="Name *" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-lg px-3 py-2 text-xs focus:border-[var(--accent)] outline-none"
                    />
                    <div className="grid grid-cols-2 gap-2">
                        <input placeholder="Company" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-lg px-3 py-2 text-xs focus:border-[var(--accent)] outline-none" />
                        <input placeholder="Role" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-lg px-3 py-2 text-xs focus:border-[var(--accent)] outline-none" />
                    </div>
                    <input placeholder="Event Met (e.g. Spring Fair)" value={formData.event} onChange={e => setFormData({ ...formData, event: e.target.value })} className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-lg px-3 py-2 text-xs focus:border-[var(--accent)] outline-none" />
                    <input placeholder="LinkedIn Path (e.g. sarah-jenkins)" value={formData.linkedin} onChange={e => setFormData({ ...formData, linkedin: e.target.value })} className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-lg px-3 py-2 text-xs focus:border-[var(--accent)] outline-none" />

                    <div className="flex items-center gap-2 pt-2">
                        <button type="button" onClick={() => setIsAdding(false)} className="flex-1 px-3 py-2 rounded-lg border border-[var(--border)] text-xs font-bold hover:bg-[var(--bg-raised)] transition-all">Cancel</button>
                        <button type="submit" disabled={isSaving || !formData.name} className="flex-1 px-3 py-2 rounded-lg bg-[var(--accent)] text-white text-xs font-bold hover:opacity-90 transition-all disabled:opacity-50">
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Save'}
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <div className="relative mb-4">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                        <input
                            type="text"
                            placeholder="Search contacts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-xl pl-9 pr-4 py-2 text-xs focus:border-[var(--accent)] outline-none"
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                        {isLoading ? (
                            <div className="flex items-center justify-center p-6"><Loader2 className="w-6 h-6 text-[var(--accent)] animate-spin" /></div>
                        ) : filteredContacts.length === 0 ? (
                            <div className="text-center p-6 border-2 border-dashed border-[var(--border)] rounded-xl bg-[var(--bg-input)]/50">
                                <Users className="w-8 h-8 text-[var(--text-muted)] mb-2 opacity-50 mx-auto" />
                                <h4 className="text-[12px] font-bold text-[var(--text)] mb-1">No Contacts Yet</h4>
                                <p className="text-[10px] text-[var(--text-sub)]">Add your first networking connection.</p>
                            </div>
                        ) : (
                            filteredContacts.map(c => (
                                <div key={c.id} className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] flex justify-between items-center group hover:border-[var(--accent)] transition-colors">
                                    <div className="min-w-0 pr-2">
                                        <h4 className="text-sm font-bold text-[var(--text)] leading-tight truncate">{c.name}</h4>
                                        <div className="flex items-center gap-1 mt-0.5 opacity-80 truncate">
                                            {c.company && <Building2 className="w-3 h-3 text-[var(--text-muted)] shrink-0" />}
                                            <span className="text-[10px] font-medium text-[var(--text-sub)] truncate">
                                                {c.role && c.company ? `${c.role} at ${c.company}` : c.role || c.company || 'Unknown Role'}
                                            </span>
                                        </div>
                                        {c.event && (
                                            <div className="text-[10px] text-[var(--text-muted)] mt-1.5 italic flex items-center gap-1 truncate">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 shrink-0" /> Met at {c.event}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                        {c.linkedin && (
                                            <a href={`https://linkedin.com/in/${c.linkedin}`} target="_blank" className="p-2 bg-[var(--bg-raised)] border border-[var(--border)] rounded-lg hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-500 transition-colors">
                                                <Linkedin className="w-4 h-4" />
                                            </a>
                                        )}
                                        <button onClick={() => handleDelete(c.id)} className="p-2 bg-[var(--bg-raised)] border border-[var(--border)] rounded-lg hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-500 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}

            <p className="text-[10px] text-center text-[var(--text-muted)] mt-4 pt-4 border-t border-[var(--border)]">
                UK applications are highly network-driven. Send follow-ups within 24 hours of meeting!
            </p>
        </div>
    )
}
