'use client'

import { useState } from 'react'
import { MapPin, Search, Navigation } from 'lucide-react'

export function TasteOfHome() {
    const [location, setLocation] = useState('')
    const [searching, setSearching] = useState(false)
    const [results, setResults] = useState<{ name: string, type: string, dist: string }[]>([])

    const searchStores = (e: React.FormEvent) => {
        e.preventDefault()
        if (!location) return
        setSearching(true)
        setTimeout(() => {
            setResults([
                { name: 'Oseyo', type: 'Korean/Asian', dist: '0.8 miles' },
                { name: 'Hang Won Hong', type: 'Chinese Supermarket', dist: '1.2 miles' },
                { name: 'Worldwide Foods', type: 'Halal/South Asian', dist: '1.5 miles' }
            ])
            setSearching(false)
        }, 1000)
    }

    return (
        <div className="card rounded-2xl p-6 flex-1 flex flex-col bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-raised)] border border-[var(--border)] overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-orange-500" />
                    </div>
                    <h2 className="font-bold text-[var(--text)]">Taste of Home</h2>
                </div>
            </div>

            <p className="text-xs text-[var(--text-sub)] mb-4">Find authentic ethnic supermarkets and specialty grocers near you.</p>

            <form onSubmit={searchStores} className="mb-4 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                    type="text"
                    placeholder="Enter City or Postcode..."
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-xl pl-9 pr-4 py-2 text-xs focus:border-[var(--accent)] outline-none"
                />
            </form>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {searching ? (
                    <div className="py-8 flex flex-col items-center justify-center space-y-3 animate-pulse">
                        <Search className="w-8 h-8 text-[var(--text-muted)] animate-bounce" />
                        <p className="text-[10px] font-bold text-[var(--text-muted)]">Finding local gems...</p>
                    </div>
                ) : results.length > 0 ? (
                    results.map((r, i) => (
                        <div key={i} className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] flex justify-between items-center group hover:border-orange-500/30 transition-colors cursor-pointer">
                            <div>
                                <h4 className="text-sm font-bold text-[var(--text)] group-hover:text-orange-500 transition-colors">{r.name}</h4>
                                <p className="text-[10px] text-[var(--text-sub)]">{r.type}</p>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="text-[10px] font-bold text-[var(--text-muted)]">{r.dist}</span>
                                <Navigation className="w-3 h-3 text-[var(--text-muted)] group-hover:text-orange-500 transition-colors" />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-4">
                        <MapPin className="w-8 h-8 text-[var(--text-muted)] mb-2 opacity-50" />
                        <p className="text-xs text-[var(--text-muted)]">Enter your area to discover nearby international supermarkets.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
