'use client'

import { ShoppingBag, Tag, ShoppingCart, ExternalLink, TrendingDown } from 'lucide-react'

export function DiscountTracker() {
    const providers = [
        { name: 'UNiDAYS', status: 'Active', color: 'bg-emerald-500', link: 'https://myunidays.com' },
        { name: 'Student Beans', status: 'Active', color: 'bg-emerald-500', link: 'https://studentbeans.com' },
        { name: 'Amazon Prime', status: 'Trial Ends Soon', color: 'bg-amber-500', link: 'https://amazon.co.uk/student' }
    ]

    const supermarkets = [
        { tier: 'Value', names: 'Aldi, Lidl', tip: 'Best for weekly fresh produce.' },
        { tier: 'Mid', names: 'Tesco, Sainsbury\'s', tip: 'Get a Clubcard / Nectar card immediately!' },
        { tier: 'Premium', names: 'M&S, Waitrose', tip: 'Good for treat days/' }
    ]

    return (
        <div className="card rounded-2xl p-6 flex-1 flex flex-col bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-raised)] border border-[var(--border)] overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
                        <Tag className="w-5 h-5 text-pink-500" />
                    </div>
                    <h2 className="font-bold text-[var(--text)]">Discounts & Groceries</h2>
                </div>
            </div>

            <div className="space-y-6 flex-1 overflow-y-auto pr-1">
                {/* ID Providers */}
                <div className="space-y-2">
                    <h3 className="text-[10px] font-bold text-[var(--text-sub)] uppercase tracking-wider">Digital IDs</h3>
                    <div className="grid grid-cols-1 gap-2">
                        {providers.map(p => (
                            <a key={p.name} href={p.link} target="_blank" className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-pink-500/30 transition-colors group">
                                <span className="text-sm font-bold text-[var(--text)] group-hover:text-pink-500 transition-colors">{p.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${p.color}`} />
                                    <span className="text-[10px] text-[var(--text-muted)]">{p.status}</span>
                                    <ExternalLink className="w-3 h-3 text-[var(--text-muted)] ml-1" />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Grocery Index */}
                <div className="space-y-2">
                    <h3 className="text-[10px] font-bold text-[var(--text-sub)] uppercase tracking-wider flex items-center gap-1">
                        <ShoppingCart className="w-3 h-3" /> Grocery Tier List
                    </h3>
                    <div className="space-y-2">
                        {supermarkets.map(s => (
                            <div key={s.tier} className="p-3 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] flex items-start gap-3">
                                <div className="mt-1 flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-black uppercase text-pink-500 bg-pink-500/10 px-1.5 py-0.5 rounded">{s.tier}</span>
                                        <span className="text-sm font-bold text-[var(--text)]">{s.names}</span>
                                    </div>
                                    <p className="text-[10px] text-[var(--text-muted)]"><strong className="text-[var(--text-sub)]">Tip:</strong> {s.tip}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <a href="https://www.totum.com/" target="_blank" className="mt-4 p-3 rounded-xl bg-[var(--bg-input)] border border-[var(--border)] flex items-center justify-between hover:bg-[var(--bg-raised)] transition-colors">
                <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[var(--text-sub)]" />
                    <span className="text-[11px] font-bold text-[var(--text)]">Get a TOTUM Card</span>
                </div>
                <ExternalLink className="w-3 h-3 text-[var(--text-sub)]" />
            </a>
        </div>
    )
}
