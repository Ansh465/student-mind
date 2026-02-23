import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { DashboardCustomizer } from '@/components/settings/DashboardCustomizer'
import { User, Shield, Layout, Bell, AlertCircle } from 'lucide-react'
import { ProfileEditor } from '@/components/settings/ProfileEditor'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (profileError) {
        console.error('Settings Profile Error:', profileError)
    }

    return (
        <div className="min-h-screen bg-[var(--bg)]">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12">
                    <h1 className="text-3xl font-extrabold text-[var(--text)] tracking-tight">Settings</h1>
                    <p className="text-[var(--text-sub)] mt-2">Manage your account and personalize your dashboard.</p>
                </div>

                <div className="space-y-12">
                    {/* Profile Section */}
                    <section className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[2.5rem] overflow-hidden shadow-sm">
                        <div className="px-8 py-6 border-b border-[var(--border)] bg-[var(--bg-raised)] flex items-center gap-3">
                            <User className="w-5 h-5 text-[var(--accent)]" />
                            <h2 className="text-xl font-bold text-[var(--text)]">Profile Details</h2>
                        </div>
                        <div className="p-8">
                            <ProfileEditor profile={profile} />
                        </div>
                    </section>

                    {/* Customization Section */}
                    <section className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[2.5rem] overflow-hidden shadow-sm">
                        <div className="px-8 py-6 border-b border-[var(--border)] bg-[var(--bg-raised)] flex items-center gap-3">
                            <Layout className="w-5 h-5 text-[var(--accent)]" />
                            <h2 className="text-xl font-bold text-[var(--text)]">Dashboard Customization</h2>
                        </div>
                        <div className="p-8">
                            <DashboardCustomizer />
                        </div>
                    </section>

                    {/* System Settings */}
                    <section className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[2.5rem] overflow-hidden shadow-sm opacity-60">
                        <div className="px-8 py-6 border-b border-[var(--border)] bg-[var(--bg-raised)] flex items-center gap-3">
                            <Shield className="w-5 h-5 text-[var(--text-muted)]" />
                            <h2 className="text-xl font-bold text-[var(--text)] uppercase tracking-widest text-sm italic">Advanced (Coming Soon)</h2>
                        </div>
                        <div className="p-8 space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--bg-raised)] border border-dashed border-[var(--border)]">
                                <div className="flex items-center gap-3">
                                    <Bell className="w-5 h-5 text-[var(--text-muted)]" />
                                    <span className="text-sm font-medium text-[var(--text-muted)]">Push Notifications</span>
                                </div>
                                <div className="w-10 h-6 bg-[var(--border)] rounded-full" />
                            </div>
                        </div>
                    </section>
                </div>

                <footer className="mt-16 pt-8 border-t border-[var(--border)] text-center">
                    <p className="text-xs text-[var(--text-muted)]">Version 1.2.0 • Build 2026.02.23</p>
                </footer>
            </div>
        </div>
    )
}
