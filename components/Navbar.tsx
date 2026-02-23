'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LayoutDashboard, Newspaper, LogOut, GraduationCap } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

export function Navbar() {
    const router = useRouter()
    const pathname = usePathname()

    const handleSignOut = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    const links = [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/resources', label: 'Resources', icon: Newspaper },
    ]

    return (
        <nav className="sticky top-0 z-50 navbar-glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/dashboard" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ background: 'var(--accent)' }}>
                            <GraduationCap className="w-5 h-5" style={{ color: 'var(--accent-fg)' }} />
                        </div>
                        <span className="font-bold text-[var(--text)] hidden sm:block">Student Survival OS</span>
                    </Link>

                    {/* Nav Links + Theme Toggle */}
                    <div className="flex items-center gap-1">
                        {links.map(({ href, label, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === href
                                        ? 'text-[var(--accent-fg)] font-semibold'
                                        : 'text-[var(--text-sub)] hover:text-[var(--text)] hover:bg-[var(--bg-raised)]'
                                    }`}
                                style={pathname === href ? { background: 'var(--accent)' } : {}}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="hidden sm:block">{label}</span>
                            </Link>
                        ))}

                        <ThemeToggle className="ml-1" />

                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2 ml-1 px-3 py-2 rounded-lg text-sm font-medium text-[var(--text-sub)] hover:text-red-500 hover:bg-[var(--red-soft)] transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:block">Sign Out</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
