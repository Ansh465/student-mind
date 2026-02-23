'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle({ className = '' }: { className?: string }) {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    if (!mounted) {
        return (
            <div className={`w-9 h-9 rounded-lg animate-pulse bg-black/10 dark:bg-white/10 ${className}`} />
        )
    }

    const isDark = resolvedTheme === 'dark'

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all
        border border-[var(--border)] bg-[var(--bg-raised)]
        text-[var(--text-sub)] hover:text-[var(--text)]
        hover:border-[var(--border-md)] hover:bg-[var(--bg-input)]
        ${className}`}
        >
            {isDark
                ? <Sun className="w-4 h-4" />
                : <Moon className="w-4 h-4" />
            }
        </button>
    )
}
