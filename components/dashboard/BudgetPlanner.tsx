'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { format } from 'date-fns'
import { PiggyBank, TrendingUp, TrendingDown, Loader2, Save } from 'lucide-react'

interface Budget {
    id?: string
    income: number
    rent: number
    food: number
    transport: number
    utilities: number
    other: number
}

interface BudgetPlannerProps {
    userId: string
    currentMonth: string
    budget: Budget | null
}

const EXPENSE_FIELDS: { key: keyof Omit<Budget, 'id' | 'income'>; label: string; color: string; gradient: string }[] = [
    { key: 'rent', label: 'Rent / Housing', color: 'var(--sky)', gradient: 'linear-gradient(90deg, var(--sky) 0%, #7dd3fc 100%)' },
    { key: 'food', label: 'Food & Groceries', color: 'var(--mint)', gradient: 'linear-gradient(90deg, var(--mint) 0%, #6ee7b7 100%)' },
    { key: 'transport', label: 'Transport', color: 'var(--amber)', gradient: 'linear-gradient(90deg, var(--amber) 0%, #fbbf24 100%)' },
    { key: 'utilities', label: 'Utilities & Bills', color: 'var(--violet)', gradient: 'linear-gradient(90deg, var(--violet) 0%, #c4b5fd 100%)' },
    { key: 'other', label: 'Other', color: 'var(--rose)', gradient: 'linear-gradient(90deg, var(--rose) 0%, #fda4af 100%)' },
]

export function BudgetPlanner({ userId, currentMonth, budget: initialBudget }: BudgetPlannerProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)

    const [form, setForm] = useState<Budget>({
        income: initialBudget?.income ?? 0,
        rent: initialBudget?.rent ?? 0,
        food: initialBudget?.food ?? 0,
        transport: initialBudget?.transport ?? 0,
        utilities: initialBudget?.utilities ?? 0,
        other: initialBudget?.other ?? 0,
    })

    const totalExpenses = EXPENSE_FIELDS.reduce((sum, f) => sum + (Number(form[f.key]) || 0), 0)
    const remaining = (Number(form.income) || 0) - totalExpenses

    const handleChange = (key: keyof Budget, value: string) => {
        setForm(prev => ({ ...prev, [key]: parseFloat(value) || 0 }))
        setSaved(false)
    }

    const handleSave = async () => {
        setSaving(true)
        const supabase = createClient()
        await supabase.from('budgets').upsert({
            user_id: userId, month: currentMonth,
            income: Number(form.income), rent: Number(form.rent),
            food: Number(form.food), transport: Number(form.transport),
            utilities: Number(form.utilities), other: Number(form.other),
            updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id,month' })
        setSaving(false)
        setSaved(true)
        startTransition(() => router.refresh())
    }

    const monthLabel = format(new Date(currentMonth + '-01'), 'MMMM yyyy')

    return (
        <div className="card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <PiggyBank className="w-5 h-5 text-pink-500" />
                    <h2 className="font-semibold text-[var(--text)]">Budget Planner</h2>
                    <span className="text-xs text-[var(--text-muted)] ml-1">— {monthLabel}</span>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving || isPending}
                    className="btn-accent flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    {saved ? 'Saved!' : 'Save'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Summary Cards */}
                <div className="space-y-3">
                    {/* Income */}
                    <div className="rounded-xl p-4 bg-[var(--bg-raised)] border border-[var(--border)] glow-emerald transition-all duration-300">
                        <div className="flex items-center gap-2 text-xs font-bold mb-2 uppercase tracking-tight" style={{ color: 'var(--emerald)' }}>
                            <TrendingUp className="w-4 h-4" /> Monthly Income
                        </div>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-sub)] text-sm font-bold">£</span>
                            <input
                                type="number"
                                value={form.income || ''}
                                onChange={e => handleChange('income', e.target.value)}
                                min="0" step="0.01" placeholder="0.00"
                                className="input-theme w-full pl-7 pr-3 py-2.5 rounded-xl text-xl font-black"
                            />
                        </div>
                    </div>

                    {/* Total Expenses */}
                    <div className="rounded-xl p-4 bg-[var(--bg-raised)] border border-[var(--border)] glow-rose transition-all duration-300">
                        <div className="flex items-center gap-2 text-xs font-bold mb-1 uppercase tracking-tight" style={{ color: 'var(--rose)' }}>
                            <TrendingDown className="w-4 h-4" /> Total Expenses
                        </div>
                        <p className="text-3xl font-black text-[var(--text)] tracking-tighter">£{totalExpenses.toFixed(2)}</p>
                    </div>

                    {/* Remaining */}
                    <div className={`rounded-xl p-4 border transition-all duration-500 ${remaining >= 0 ? 'bg-[var(--bg-raised)] border-[var(--border)] glow-indigo' : 'bg-[var(--bg-raised)] border-[var(--border)] glow-rose'}`}>
                        <div className={`text-xs font-bold mb-1 uppercase tracking-tight`} style={{ color: remaining >= 0 ? 'var(--indigo)' : 'var(--red)' }}>
                            {remaining >= 0 ? '✅ Net Balance' : '⚠️ Over Budget'}
                        </div>
                        <p className="text-3xl font-black text-[var(--text)] tracking-tighter">
                            £{Math.abs(remaining).toFixed(2)}
                        </p>
                    </div>
                </div>

                {/* Expense Breakdown */}
                <div className="lg:col-span-2 space-y-3">
                    <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Monthly Expenses</h3>
                    <div className="space-y-2.5">
                        {EXPENSE_FIELDS.map(({ key, label, color, gradient }) => {
                            const val = Number(form[key]) || 0
                            const pct = totalExpenses > 0 ? (val / totalExpenses) * 100 : 0
                            return (
                                <div key={key} className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
                                    <span className="text-xs font-bold text-[var(--text-sub)] w-36 flex-shrink-0 uppercase tracking-tight">{label}</span>
                                    <div className="flex-1 h-3 rounded-full overflow-hidden bg-[var(--bg-input)] shadow-inner">
                                        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${pct}%`, background: gradient }} />
                                    </div>
                                    <div className="relative w-28 flex-shrink-0">
                                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-xs">£</span>
                                        <input
                                            type="number"
                                            value={form[key] || ''}
                                            onChange={e => handleChange(key, e.target.value)}
                                            min="0" step="0.01" placeholder="0.00"
                                            className="input-theme w-full pl-6 pr-2 py-1.5 rounded-lg text-sm"
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
