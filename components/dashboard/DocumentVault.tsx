'use client'

import { useState, useEffect } from 'react'
import { FileText, Plus, Calendar, Trash2, AlertCircle, ShieldCheck } from 'lucide-react'
import { format, differenceInDays, parseISO } from 'date-fns'

interface Document {
    id: string
    name: string
    expiryDate: string
    notes: string
}

export function DocumentVault() {
    const [documents, setDocuments] = useState<Document[]>([])
    const [name, setName] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [notes, setNotes] = useState('')
    const [showAdd, setShowAdd] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem('student-mind-docs')
        if (saved) setDocuments(JSON.parse(saved))
    }, [])

    const saveDocs = (newDocs: Document[]) => {
        setDocuments(newDocs)
        localStorage.setItem('student-mind-docs', JSON.stringify(newDocs))
    }

    const addDoc = (e: React.FormEvent) => {
        e.preventDefault()
        if (!name || !expiryDate) return
        const newDoc: Document = {
            id: crypto.randomUUID(),
            name,
            expiryDate,
            notes
        }
        saveDocs([...documents, newDoc])
        setName('')
        setExpiryDate('')
        setNotes('')
        setShowAdd(false)
    }

    const deleteDoc = (id: string) => {
        saveDocs(documents.filter(d => d.id !== id))
    }

    const getStatus = (dateStr: string) => {
        const diff = differenceInDays(parseISO(dateStr), new Date())
        if (diff < 0) return { label: 'Expired', color: 'text-rose-500 bg-rose-500/10' }
        if (diff < 30) return { label: `${diff} days left`, color: 'text-amber-500 bg-amber-500/10' }
        return { label: 'Valid', color: 'text-emerald-500 bg-emerald-500/10' }
    }

    return (
        <div className="card rounded-2xl p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[var(--accent)]" />
                    <h2 className="font-semibold text-[var(--text)]">Document Vault</h2>
                </div>
                <button
                    onClick={() => setShowAdd(!showAdd)}
                    className="p-2 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] hover:bg-[var(--bg-input)] transition-colors"
                >
                    <Plus className={`w-4 h-4 transition-transform ${showAdd ? 'rotate-45' : ''}`} />
                </button>
            </div>

            {showAdd && (
                <form onSubmit={addDoc} className="mb-6 p-4 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] space-y-3">
                    <input
                        placeholder="Document Name (e.g. Passport)"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        className="input-theme w-full px-3 py-2 rounded-lg text-sm"
                    />
                    <div className="grid grid-cols-1 gap-3">
                        <input
                            type="date"
                            value={expiryDate}
                            onChange={e => setExpiryDate(e.target.value)}
                            required
                            className="input-theme w-full px-3 py-2 rounded-lg text-sm"
                            style={{ colorScheme: 'light dark' }}
                        />
                        <input
                            placeholder="Notes (Ref #, Location)"
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            className="input-theme w-full px-3 py-2 rounded-lg text-sm"
                        />
                    </div>
                    <button type="submit" className="btn-accent w-full py-2 rounded-lg text-sm font-bold">
                        Secure Document
                    </button>
                </form>
            )}

            <div className="space-y-3 overflow-y-auto pr-1 flex-1 max-h-[400px]">
                {documents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center opacity-60">
                        <FileText className="w-10 h-10 mb-3 text-[var(--text-muted)]" />
                        <p className="text-sm">No documents tracked.<br />Safe-keep your Passport or BRP details.</p>
                    </div>
                ) : (
                    documents.map(doc => {
                        const status = getStatus(doc.expiryDate)
                        return (
                            <div key={doc.id} className="p-4 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] group">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-[var(--text)] text-sm truncate">{doc.name}</h3>
                                        <p className="text-[10px] text-[var(--text-muted)] truncate">{doc.notes || 'No notes'}</p>
                                    </div>
                                    <button onClick={() => deleteDoc(doc.id)} className="p-1 rounded hover:bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between mt-3">
                                    <div className="flex items-center gap-1.5 text-xs text-[var(--text-sub)]">
                                        <Calendar className="w-3 h-3" />
                                        {format(parseISO(doc.expiryDate), 'dd MMM yyyy')}
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${status.color}`}>
                                        {status.label}
                                    </span>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center gap-2 text-[10px] text-[var(--text-muted)] font-medium italic">
                <AlertCircle className="w-3 h-3" />
                <span>Encrypted locally in your browser</span>
            </div>
        </div>
    )
}
