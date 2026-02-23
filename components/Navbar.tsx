'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'
import { LayoutDashboard, Newspaper, LogOut, GraduationCap, Settings2, ShieldCheck } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

export function Navbar() {
    const router = useRouter()
    const pathname = usePathname()

    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const checkAdmin = async () => {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data } = await supabase
                    .from('profiles')
                    .select('is_admin')
                    .eq('id', user.id)
                    .single()
                setIsAdmin(!!data?.is_admin)
            }
        }
        checkAdmin()
    }, [])

    const handleSignOut = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    return (
        <nav className="sticky top-0 z-50 navbar-glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/dashboard" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ background: 'var(--accent)' }}>
                            <GraduationCap className="w-5 h-5" style={{ color: 'var(--accent-fg)' }} />
                        </div>
                        <span className="font-bold text-[var(--text)] hidden sm:block font-[Outfit]">Student Mind</span>
                    </Link>

                    {/* Nav Links + Theme Toggle */}
                    <div className="flex items-center gap-1">
                        <Link
                            href="/dashboard"
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === '/dashboard' ? 'text-[var(--accent-fg)] font-semibold' : 'text-[var(--text-sub)] hover:text-[var(--text)] hover:bg-[var(--bg-raised)]'}`}
                            style={pathname === '/dashboard' ? { background: 'var(--accent)' } : {}}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            <span className="hidden sm:block">Dashboard</span>
                        </Link>

                        {isAdmin && (
                            <Link
                                href="/admin"
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === '/admin' ? 'text-white font-semibold' : 'text-amber-500 hover:bg-amber-500/10'}`}
                                style={pathname === '/admin' ? { background: 'var(--amber-600, #d97706)' } : {}}
                            >
                                <ShieldCheck className="w-4 h-4" />
                                <span className="hidden sm:block">Admin</span>
                            </Link>
                        )}

                        <Link
                            href="/resources"
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === '/resources' ? 'text-[var(--accent-fg)] font-semibold' : 'text-[var(--text-sub)] hover:text-[var(--text)] hover:bg-[var(--bg-raised)]'}`}
                            style={pathname === '/resources' ? { background: 'var(--accent)' } : {}}
                        >
                            <Newspaper className="w-4 h-4" />
                            <span className="hidden sm:block">Resources</span>
                        </Link>

                        <Link
                            href="/settings"
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === '/settings' ? 'text-[var(--accent-fg)] font-semibold' : 'text-[var(--text-sub)] hover:text-[var(--text)] hover:bg-[var(--bg-raised)]'}`}
                            style={pathname === '/settings' ? { background: 'var(--accent)' } : {}}
                        >
                            <Settings2 className="w-4 h-4" />
                            <span className="hidden sm:block">Settings</span>
                        </Link>

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
