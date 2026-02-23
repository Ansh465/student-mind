'use client'

import { Sparkles } from 'lucide-react'

interface ProBadgeProps {
    className?: string
    size?: 'sm' | 'md'
}

export function ProBadge({ className = '', size = 'md' }: ProBadgeProps) {
    return (
        <span className={`inline-flex items-center gap-1 font-black uppercase tracking-widest rounded-full bg-gradient-to-r from-[var(--accent)] to-[#ffa43a] text-white shadow-lg shadow-[var(--accent)]/20 ${size === 'sm' ? 'px-1.5 py-0.5 text-[8px]' : 'px-2.5 py-1 text-[10px]'} ${className}`}>
            <Sparkles className={size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'} />
            PRO
        </span>
    )
}
