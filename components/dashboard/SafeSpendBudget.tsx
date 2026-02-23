'use client'

import { PiggyBank, TrendingUp, Wallet, ArrowRight, Info } from 'lucide-react'

interface Budget {
    income: number
    rent: number
    food: number
    transport: number
    utilities: number
    other: number
}

interface SafeSpendBudgetProps {
    budget: Budget | null
    weeklyHours: number
}

export function SafeSpendBudget({ budget, weeklyHours }: SafeSpendBudgetProps) {
    const income = budget?.income || (weeklyHours * 4 * 11.44) // Estimate if not set
    const expenses = (budget?.rent || 0) + (budget?.food || 0) + (budget?.transport || 0) + (budget?.utilities || 0) + (budget?.other || 0)
    const remainingMonthly = income - expenses
    const dailySafeSpend = Math.max(0, remainingMonthly / 30)

    const percentageSpent = income > 0 ? (expenses / income) * 100 : 0
    const statusColor = percentageSpent > 90 ? 'text-rose-500' : percentageSpent > 70 ? 'text-amber-500' : 'text-emerald-500'

    return (
        <div className="card rounded-2xl p-6 h-full flex flex-col bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-raised)] border border-[var(--border)] overflow-hidden">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                    <PiggyBank className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <h2 className="font-bold text-[var(--text)]">Daily Safe Spend</h2>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center text-center">
                <div className="relative mb-6">
                    {/* Gauge Circle */}
                    <svg className="w-32 h-32 transform -rotate-90">
                        <circle
                            cx="64"
                            cy="64"
                            r="58"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            className="text-[var(--border)]"
                        />
                        <circle
                            cx="64"
                            cy="64"
                            r="58"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            strokeDasharray={364}
                            strokeDashoffset={364 - (364 * Math.min(100, percentageSpent)) / 100}
                            className={`${statusColor} transition-all duration-1000 ease-out`}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-black text-[var(--text)]">£{dailySafeSpend.toFixed(2)}</span>
                        <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Per Day</span>
                    </div>
                </div>

                <div className="w-full space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)]">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                            <span className="text-xs font-bold text-[var(--text-sub)]">Est. Income</span>
                        </div>
                        <span className="text-xs font-black text-[var(--text)]">£{income.toFixed(0)}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)]">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-rose-500/20 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            </div>
                            <span className="text-xs font-bold text-[var(--text-sub)]">Fixed Costs</span>
                        </div>
                        <span className="text-xs font-black text-[var(--text)]">£{expenses.toFixed(0)}</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border)]">
                <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 text-blue-500">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <p className="text-[10px] font-medium leading-relaxed">
                        This is your "Safe Spend" after all fixed bills are paid. It covers food, fun, and emergencies.
                    </p>
                </div>
            </div>
        </div>
    )
}
