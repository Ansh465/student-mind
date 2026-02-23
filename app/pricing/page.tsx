'use client'

import { Navbar } from '@/components/Navbar'
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap, Bot, Globe, Loader2 } from 'lucide-react'
import { useState } from 'react'

const PLANS = [
    {
        name: 'Essential',
        price: '£0',
        period: '/lifetime',
        description: 'For students who just need the basics to stay compliant.',
        features: [
            'Basic Visa Countdown',
            'Work Hour Log (Single Job)',
            'Standard Budget Planner',
            'Resource Hub Access',
            'Community Support'
        ],
        cta: 'current',
        highlight: false
    },
    {
        name: 'Professional',
        price: '£4.99',
        period: '/month',
        description: 'The ultimate survival toolkit for ambitious internationals.',
        features: [
            'Everything in Essential',
            'AI Cover Letter Generator',
            'AI Resume ATS Scanner',
            'Survival AI Assistant (Chat)',
            'AI Survival Report (PDF)',
            'Priority 24/7 Support'
        ],
        cta: 'upgrade',
        highlight: true,
        tag: 'Recommended'
    }
]

export default function PricingPage() {
    const [isLoading, setIsLoading] = useState(false)

    const handleUpgrade = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/stripe/checkout', { method: 'POST' })
            const data = await res.json()
            if (data.url) {
                window.location.href = data.url
            } else {
                throw new Error(data.error || 'Failed to start checkout')
            }
        } catch (e: any) {
            console.error(e)
            alert(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[var(--bg)]">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <span className="tag-pill bg-[var(--accent-soft)] text-[var(--accent)] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-[var(--accent)]/20 shadow-sm">
                        Pricing Plans
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-black text-[var(--text)] tracking-tight">
                        One price. Total <span className="bg-gradient-to-r from-[var(--accent)] to-[#ffa43a] bg-clip-text text-transparent italic">peace of mind.</span>
                    </h1>
                    <p className="text-[var(--text-sub)] text-lg max-w-2xl mx-auto">
                        Upgrade to Professional and unlock the full power of AI-driven student survival.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-24">
                    {PLANS.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-[2.5rem] p-8 transition-all duration-500 border-2 ${plan.highlight
                                    ? 'bg-[var(--bg-card)] border-[var(--accent)] shadow-2xl shadow-[var(--accent)]/10 scale-[1.02]'
                                    : 'bg-[var(--bg-card)] border-[var(--border)] shadow-sm hover:border-[var(--text-muted)]'
                                }`}
                        >
                            {plan.tag && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[var(--accent)] to-[#ffa43a] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                                    {plan.tag}
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-[var(--text)] mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-5xl font-black text-[var(--text)]">{plan.price}</span>
                                    <span className="text-[var(--text-muted)] font-medium">{plan.period}</span>
                                </div>
                                <p className="text-sm text-[var(--text-sub)] leading-relaxed">
                                    {plan.description}
                                </p>
                            </div>

                            <div className="space-y-4 mb-10">
                                {plan.features.map((feature) => (
                                    <div key={feature} className="flex items-center gap-3">
                                        <div className={`p-1 rounded-full ${plan.highlight ? 'bg-emerald-500/10 text-emerald-500' : 'bg-[var(--bg-raised)] text-[var(--text-muted)]'}`}>
                                            <Check className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="text-sm text-[var(--text-sub)] font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {plan.cta === 'upgrade' ? (
                                <button
                                    onClick={handleUpgrade}
                                    disabled={isLoading}
                                    className="w-full py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all bg-[var(--accent)] text-white shadow-xl shadow-[var(--accent)]/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                                >
                                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>{plan.name === 'Professional' ? 'Upgrade to Pro' : 'Get Started'} <ArrowRight className="w-4 h-4" /></>}
                                </button>
                            ) : (
                                <div className="w-full py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all bg-[var(--bg-raised)] border border-[var(--border)] text-[var(--text-sub)]">
                                    Current Plan
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* FAQ / Trust Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { icon: ShieldCheck, text: 'Cancel Anytime' },
                        { icon: Globe, text: 'UK Wide Support' },
                        { icon: Zap, text: 'Instant Setup' },
                        { icon: Bot, text: 'AI Powered' }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center gap-3 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                            <div className="p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)]">
                                <item.icon className="w-6 h-6 text-[var(--accent)]" />
                            </div>
                            <span className="text-xs font-bold text-[var(--text-sub)] uppercase tracking-tight">{item.text}</span>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}
