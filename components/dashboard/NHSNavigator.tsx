'use client'

import { useState } from 'react'
import { Plus, Search, MapPin, Phone, ExternalLink, Activity, Info, AlertTriangle, Stethoscope, HeartPulse, ChevronRight } from 'lucide-react'

interface GPSurgery {
    name: string
    address: string
    phone: string
    distance: string
}

export function NHSNavigator() {
    const [postcode, setPostcode] = useState('')
    const [searching, setSearching] = useState(false)
    const [results, setResults] = useState<GPSurgery[]>([])

    const searchGP = (e: React.FormEvent) => {
        e.preventDefault()
        if (!postcode) return
        setSearching(true)

        // Mock search results for UK GP surgeries
        setTimeout(() => {
            setResults([
                { name: 'City Central Health Centre', address: '12-14 Market St, City Centre', phone: '0161 123 4567', distance: '0.3 miles' },
                { name: 'University Medical Practice', address: 'Student Union Building, Oxford Rd', phone: '0161 765 4321', distance: '0.5 miles' },
                { name: 'Parkside Surgery', address: '45 Park Lane, Suburbia', phone: '0161 999 8888', distance: '1.2 miles' }
            ])
            setSearching(false)
        }, 1200)
    }

    return (
        <div className="card rounded-2xl p-6 h-full flex flex-col bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-raised)] border border-[var(--border)] overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-blue-500" />
                    </div>
                    <h2 className="font-bold text-[var(--text)]">NHS & GP Navigator</h2>
                </div>
                <div className="flex items-center gap-1 bg-blue-500/10 px-2 py-0.5 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-tighter">IHS Covered</span>
                </div>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <a href="https://www.nhs.uk/nhs-services/gps/how-to-register-with-a-gp-surgery/" target="_blank" className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 hover:border-blue-500/30 transition-all flex flex-col items-center text-center group">
                        <Stethoscope className="w-5 h-5 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold text-[var(--text)]">Register with GP</span>
                    </a>
                    <a href="https://111.nhs.uk" target="_blank" className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/10 hover:border-rose-500/30 transition-all flex flex-col items-center text-center group">
                        <HeartPulse className="w-5 h-5 text-rose-500 mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold text-[var(--text)]">Call 111 (SOS)</span>
                    </a>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--bg-raised)] border border-[var(--border)] space-y-3">
                    <h3 className="text-xs font-black text-[var(--text)] flex items-center gap-2">
                        <Search className="w-4 h-4 text-[var(--accent)]" />
                        Find Surgery Near You
                    </h3>
                    <form onSubmit={searchGP} className="flex gap-2">
                        <input
                            placeholder="Enter Postcode"
                            value={postcode}
                            onChange={e => setPostcode(e.target.value)}
                            className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:border-[var(--accent)] outline-none"
                        />
                        <button type="submit" className="p-2 rounded-xl bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/20">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </form>
                </div>

                {searching ? (
                    <div className="py-8 flex flex-col items-center justify-center space-y-3 animate-pulse">
                        <Search className="w-8 h-8 text-[var(--text-muted)] animate-bounce" />
                        <p className="text-[10px] font-bold text-[var(--text-muted)]">Scanning postcodes...</p>
                    </div>
                ) : results.length > 0 ? (
                    <div className="space-y-2 overflow-y-auto max-h-[250px] pr-1">
                        {results.map((r, i) => (
                            <div key={i} className="p-3 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] hover:border-[var(--accent)] transition-all group">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="text-[11px] font-black text-[var(--text)]">{r.name}</h4>
                                    <span className="text-[10px] font-bold text-[var(--accent)]">{r.distance}</span>
                                </div>
                                <p className="text-[10px] text-[var(--text-muted)] flex items-center gap-1 mb-2">
                                    <MapPin className="w-3 h-3" /> {r.address}
                                </p>
                                <div className="flex gap-2">
                                    <a href={`tel:${r.phone}`} className="flex-1 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 text-[10px] font-black text-center flex items-center justify-center gap-1">
                                        <Phone className="w-3 h-3" /> Call
                                    </a>
                                    <button className="p-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--accent)]">
                                        <ExternalLink className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex gap-3 text-amber-500">
                        <AlertTriangle className="w-5 h-5 shrink-0" />
                        <p className="text-[10px] font-medium leading-relaxed">
                            Always register with a GP <b>before</b> you get sick. It's free and essential for uni extensions!
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
