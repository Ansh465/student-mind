'use client'

import { useState, useEffect } from 'react'
import { CheckCircle2, Circle, ListTodo, Info } from 'lucide-react'

interface ChecklistItem {
    id: string
    text: string
    description: string
    completed: boolean
}

const DEFAULT_ITEMS: ChecklistItem[] = [
    { id: 'brp', text: 'Collect BRP', description: 'Pick up your Biometric Residence Permit from the post office.', completed: false },
    { id: 'ni', text: 'Apply for NI Number', description: 'Required for working in the UK. Apply online via GOV.UK.', completed: false },
    { id: 'gp', text: 'Register with a GP', description: 'Find your local doctor and register for NHS services.', completed: false },
    { id: 'bank', text: 'Open Bank Account', description: 'Get a UK bank account for salary and expenses.', completed: false },
    { id: 'council', text: 'Council Tax Exemption', description: 'Get your student letter to avoid paying council tax.', completed: false },
    { id: 'railcard', text: 'Get a Railcard', description: 'Apply for a 16-25 Railcard to save 1/3 on train travel.', completed: false },
]

export function AdminChecklist() {
    const [items, setItems] = useState<ChecklistItem[]>(DEFAULT_ITEMS)

    useEffect(() => {
        const saved = localStorage.getItem('student-mind-checklist')
        if (saved) {
            const savedItems = JSON.parse(saved)
            // Merge with default items in case we add more in the future
            const merged = DEFAULT_ITEMS.map(def => {
                const s = savedItems.find((i: ChecklistItem) => i.id === def.id)
                return s ? { ...def, completed: s.completed } : def
            })
            setItems(merged)
        }
    }, [])

    const toggleItem = (id: string) => {
        const newItems = items.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        )
        setItems(newItems)
        localStorage.setItem('student-mind-checklist', JSON.stringify(newItems))
    }

    const completedCount = items.filter(i => i.completed).length
    const progress = (completedCount / items.length) * 100

    return (
        <div className="card rounded-2xl p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
                <ListTodo className="w-5 h-5 text-[var(--accent)]" />
                <h2 className="font-semibold text-[var(--text)]">Landing in UK</h2>
            </div>

            {/* Progress Header */}
            <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-2xl font-black text-[var(--text)] tracking-tighter">
                        {Math.round(progress)}%
                    </span>
                    <span className="text-[var(--text-muted)] text-sm font-medium">
                        {completedCount} of {items.length} done
                    </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[var(--bg-input)] overflow-hidden shadow-inner">
                    <div
                        className="h-full bg-gradient-to-r from-[var(--accent)] to-[#a855f7] transition-all duration-1000 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Checklist items */}
            <div className="space-y-2 overflow-y-auto flex-1 max-h-[400px] pr-1">
                {items.map(item => (
                    <button
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-4 group ${item.completed
                                ? 'bg-[var(--bg-card)] border-[var(--border)] opacity-60'
                                : 'bg-[var(--bg-raised)] border-[var(--border)] hover:border-[var(--accent-soft)] hover:bg-[var(--bg-input)]'
                            }`}
                    >
                        <div className="shrink-0">
                            {item.completed ? (
                                <CheckCircle2 className="w-5 h-5 text-[var(--emerald)]" />
                            ) : (
                                <Circle className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className={`text-sm font-bold transition-all ${item.completed ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text)]'}`}>
                                {item.text}
                            </p>
                            <p className="text-[10px] text-[var(--text-muted)] truncate">
                                {item.description}
                            </p>
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center gap-2 text-[10px] text-[var(--text-muted)] font-medium italic">
                <Info className="w-3 h-3" />
                <span>Essential admin for your UK journey</span>
            </div>
        </div>
    )
}
