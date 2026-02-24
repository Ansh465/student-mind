'use client'

import { Lock, Sparkles } from 'lucide-react'
import Link from 'next/link'

interface PremiumFeatureWrapperProps {
    tier: string
    children: React.ReactNode
    featureName: string
    description?: string
}

export function PremiumFeatureWrapper({
    tier,
    children,
    featureName,
    description = "Unlocking this tool requires a Professional subscription."
}: PremiumFeatureWrapperProps) {
    if (tier === 'pro') return <>{children}</>

    return (
        <div className="relative group overflow-hidden rounded-2xl h-full flex flex-col">
            {/* Blurred Content Overlay */}
            <div className="absolute inset-0 z-10 bg-[var(--bg-card)]/40 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500 rounded-2xl">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[#ffa43a] flex items-center justify-center mb-4 shadow-xl shadow-[var(--accent)]/30">
                    <Lock className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-bold text-[var(--text)] mb-2 flex items-center gap-2">
                    {featureName} <span className="text-[10px] bg-[var(--accent)] text-white px-2 py-0.5 rounded-full font-black">PRO</span>
                </h3>

                <p className="text-sm text-[var(--text-sub)] max-w-[200px] mb-6 leading-relaxed">
                    {description}
                </p>

                <Link
                    href="/pricing"
                    className="flex items-center gap-2 px-6 py-2.5 bg-[var(--accent)] text-white rounded-xl text-sm font-bold shadow-lg shadow-[var(--accent)]/20 hover:scale-[1.05] transition-all active:scale-95"
                >
                    <Sparkles className="w-4 h-4" />
                    Upgrade to Pro
                </Link>
            </div>

            {/* Non-interactive Content Preview */}
            <div className="opacity-40 grayscale blur-[1px] pointer-events-none select-none flex-1 min-h-0 flex flex-col">
                {children}
            </div>
        </div>
    )
}
