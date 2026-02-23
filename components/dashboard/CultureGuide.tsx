'use client'

import { useState } from 'react'
import { Languages, HelpCircle, Ruler, Info, Quote } from 'lucide-react'

const CULTURE_DATA = {
    slang: [
        { term: 'Cheers', meaning: 'Thank you (most common) or a toast before drinking.' },
        { term: 'Knackered', meaning: 'Extremely tired/exhausted.' },
        { term: 'Gutted', meaning: 'Extremely disappointed.' },
        { term: 'Quid', meaning: 'One pound sterling (£1).' },
        { term: 'Dodgy', meaning: 'Suspicious, low quality, or unreliable.' },
        { term: 'Innit', meaning: 'Short for "isn\'t it?" - used for agreement.' },
    ],
    etiquette: [
        { title: 'The Queue', detail: 'Queueing is a sacred tradition. Never skip the line.' },
        { title: 'Talking Weather', detail: 'The safest conversation starter if things get awkward.' },
        { title: 'Tipping', detail: 'Usually 10-12.5% in restaurants if service isn\'t included. Not expected in pubs.' },
        { title: 'Sorry', detail: 'British people say "Sorry" even if you step on their toes. It\'s a reflex.' },
    ],
    conversions: [
        { label: '1 Mile', value: '1.61 Kilometers' },
        { label: '1 Kilogram', value: '2.2 Pounds (lbs)' },
        { label: '1 Pint', value: '568 Milliliters' },
        { label: 'Gas Mark 4', value: '180°C / 350°F' },
    ]
}

export function CultureGuide() {
    const [activeTab, setActiveTab] = useState<'slang' | 'etiquette' | 'conversions'>('slang')

    return (
        <div className="card rounded-2xl p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6 text-[var(--accent)]">
                <Languages className="w-5 h-5" />
                <h2 className="font-semibold text-[var(--text)]">Survival Guide</h2>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] mb-6">
                {(['slang', 'etiquette', 'conversions'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === tab
                                ? 'bg-[var(--bg-card)] text-[var(--accent)] shadow-sm'
                                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto pr-1 max-h-[400px]">
                {activeTab === 'slang' && (
                    <div className="grid grid-cols-1 gap-2 animate-in fade-in slide-in-from-right-2 duration-300">
                        {CULTURE_DATA.slang.map((item, i) => (
                            <div key={i} className="p-3 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] group hover:border-[var(--accent-soft)] transition-colors">
                                <div className="flex items-center gap-2 mb-1">
                                    <Quote className="w-3 h-3 text-[var(--accent)] opacity-50" />
                                    <span className="text-sm font-bold text-[var(--text)]">"{item.term}"</span>
                                </div>
                                <p className="text-xs text-[var(--text-muted)] italic">{item.meaning}</p>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'etiquette' && (
                    <div className="space-y-3 animate-in fade-in slide-in-from-right-2 duration-300">
                        {CULTURE_DATA.etiquette.map((item, i) => (
                            <div key={i} className="flex gap-3">
                                <div className="mt-1">
                                    <HelpCircle className="w-4 h-4 text-[var(--accent)]" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-[var(--text)]">{item.title}</h3>
                                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{item.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'conversions' && (
                    <div className="grid grid-cols-1 gap-2 animate-in fade-in slide-in-from-right-2 duration-300">
                        {CULTURE_DATA.conversions.map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)]">
                                <span className="text-xs font-medium text-[var(--text-sub)]">{item.label}</span>
                                <div className="flex items-center gap-2">
                                    <Ruler className="w-3 h-3 text-[var(--accent)] opacity-50" />
                                    <span className="text-sm font-bold text-[var(--text)]">{item.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] flex gap-3">
                <Info className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <p className="text-[10px] text-[var(--text-muted)] leading-normal">
                    <span className="font-bold text-[var(--text)] uppercase">Rule #1:</span> When in doubt, just offer to make a cup of tea. It solves 90% of all UK problems.
                </p>
            </div>
        </div>
    )
}
