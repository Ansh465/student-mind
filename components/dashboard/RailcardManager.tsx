'use client'

import { useState, useEffect } from 'react'
import { TrainFront, Map, Clock, Plus, Loader2, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { format, isAfter } from 'date-fns'

interface Railcard {
    id: string
    type: string
    expiry_date: string
}

const RAILCARD_TYPES = [
    '16-25 Railcard',
    '26-30 Railcard',
    'Network Railcard',
    'Two Together Railcard',
    'Disabled Persons Railcard'
]

export function RailcardManager({ userId }: { userId: string }) {
    const supabase = createClient()
    const [railcards, setRailcards] = useState<Railcard[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isAdding, setIsAdding] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [newType, setNewType] = useState(RAILCARD_TYPES[0])
    const [newExpiry, setNewExpiry] = useState('')

    useEffect(() => {
        if (!userId) {
            setIsLoading(false)
            return
        }

        const fetchCards = async () => {
            const { data } = await supabase
                .from('railcards')
                .select('*')
                .eq('user_id', userId)
                .order('expiry_date', { ascending: true })

            if (data) setRailcards(data)
            setIsLoading(false)
        }
        fetchCards()
    }, [userId])

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newExpiry) return

        setIsSaving(true)
        const { data, error } = await supabase
            .from('railcards')
            .insert({ user_id: userId, type: newType, expiry_date: newExpiry })
            .select()
            .single()

        if (!error && data) {
            setRailcards([...railcards, data])
            setIsAdding(false)
            setNewExpiry('')
        }
        setIsSaving(false)
    }

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation()
        setRailcards(railcards.filter(r => r.id !== id))
        await supabase.from('railcards').delete().eq('id', id)
    }

    return (
        <div className="card rounded-2xl p-6 flex-1 flex flex-col bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-raised)] border border-[var(--border)] overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                <TrainFront className="w-24 h-24 text-[var(--accent)]" />
            </div>

            <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                        <TrainFront className="w-5 h-5 text-[var(--accent)]" />
                    </div>
                    <h2 className="font-bold text-[var(--text)]">Travel & Railcard</h2>
                </div>
                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg text-xs font-bold hover:bg-emerald-500 hover:text-white transition-all"
                    >
                        <Plus className="w-3.5 h-3.5" /> Add
                    </button>
                )}
            </div>

            <div className="flex-1 space-y-4 relative z-10 flex flex-col justify-center">

                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 text-[var(--accent)] animate-spin" />
                    </div>
                ) : isAdding ? (
                    <form onSubmit={handleAdd} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 space-y-3">
                        <div>
                            <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1 block">Railcard Type</label>
                            <select
                                value={newType}
                                onChange={e => setNewType(e.target.value)}
                                className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-lg px-3 py-2 text-xs focus:border-[var(--accent)] outline-none text-[var(--text)]"
                            >
                                {RAILCARD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1 block">Expiry Date</label>
                            <input
                                type="date"
                                required
                                value={newExpiry}
                                onChange={e => setNewExpiry(e.target.value)}
                                className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-lg px-3 py-2 text-xs focus:border-[var(--accent)] outline-none text-[var(--text)]"
                            />
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                            <button
                                type="button"
                                onClick={() => setIsAdding(false)}
                                className="flex-1 px-3 py-2 rounded-lg border border-[var(--border)] text-xs font-bold text-[var(--text-sub)] hover:text-[var(--text)] hover:bg-[var(--bg-raised)] transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSaving || !newExpiry}
                                className="flex-1 px-3 py-2 rounded-lg bg-[var(--accent)] text-white text-xs font-bold hover:opacity-90 transition-all disabled:opacity-50"
                            >
                                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Save Card'}
                            </button>
                        </div>
                    </form>
                ) : railcards.length > 0 ? (
                    <div className="relative w-full h-36">
                        {railcards.map((rc, i) => {
                            const isExpired = !isAfter(new Date(rc.expiry_date), new Date())
                            return (
                                <div
                                    key={rc.id}
                                    className={`absolute inset-0 aspect-[1.586/1] w-full rounded-xl p-4 flex flex-col justify-between shadow-xl overflow-hidden border transition-all duration-300 group/card ${isExpired
                                            ? 'bg-gradient-to-br from-slate-700 to-slate-800 border-white/5 opacity-80'
                                            : 'bg-gradient-to-br from-[#003366] to-[#0055A4] border-white/20'
                                        }`}
                                    style={{
                                        transform: `translateY(${i * 8}px) scale(${1 - i * 0.05})`,
                                        zIndex: 10 - i,
                                        opacity: i > 2 ? 0 : 1 - (i * 0.15)
                                    }}
                                >
                                    <div className="absolute inset-0 bg-white/5 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[shine_5s_infinite]" />

                                    <div className="flex justify-between items-start relative z-10">
                                        <div>
                                            <h3 className="text-white font-black text-lg uppercase tracking-tight">{rc.type}</h3>
                                            <p className="text-white/70 text-[10px] font-medium">{isExpired ? 'EXPIRED' : 'Digital Pass'}</p>
                                        </div>
                                        <button
                                            onClick={(e) => handleDelete(rc.id, e)}
                                            className="opacity-0 group-hover/card:opacity-100 p-1.5 bg-red-500/20 text-red-100 rounded-md hover:bg-red-500 hover:text-white transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="relative z-10 flex items-end justify-between">
                                        <div>
                                            <p className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5">Expires</p>
                                            <p className={`font-mono font-bold tracking-widest ${isExpired ? 'text-red-300' : 'text-white'}`}>
                                                {format(new Date(rc.expiry_date), 'dd MMM yyyy').toUpperCase()}
                                            </p>
                                        </div>
                                        <TrainFront className="w-8 h-8 text-white/20" />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-[var(--border)] rounded-xl bg-[var(--bg-input)]/50">
                        <TrainFront className="w-8 h-8 text-[var(--text-muted)] mb-3 opacity-50" />
                        <h4 className="text-[13px] font-bold text-[var(--text)] mb-1">No Active Railcards</h4>
                        <p className="text-[11px] text-[var(--text-sub)]">Add your railcard to track its expiry and save 33% on UK train travel.</p>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                    <a href="https://www.thetrainline.com" target="_blank" className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors flex flex-col items-center justify-center gap-1 group/btn">
                        <Clock className="w-4 h-4 text-[var(--text-sub)] group-hover/btn:text-[var(--accent)] transition-colors" />
                        <span className="text-[10px] font-bold text-[var(--text)]">TheTrainline</span>
                    </a>
                    <a href="https://www.skyscanner.net" target="_blank" className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors flex flex-col items-center justify-center gap-1 group/btn">
                        <Map className="w-4 h-4 text-[var(--text-sub)] group-hover/btn:text-[var(--accent)] transition-colors" />
                        <span className="text-[10px] font-bold text-[var(--text)]">Schengen Flights</span>
                    </a>
                </div>
            </div>

            <p className="text-[10px] text-center text-[var(--text-muted)] mt-4">
                Tip: Link your physical Railcard to your Oyster card at any London Tube station to get 1/3 off off-peak Oyster fares!
            </p>
        </div>
    )
}
