import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { DashboardGrid } from '@/components/dashboard/DashboardGrid'
import { ReminderBanner } from '@/components/ReminderBanner'
import { startOfWeek } from 'date-fns'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    // Fetch profile — auto-create if missing (handles users who signed up before schema was run)
    let { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user!.id)
        .maybeSingle()

    if (!profile) {
        // Profile missing: create it so FK constraints are satisfied
        const { data: newProfile } = await supabase
            .from('profiles')
            .upsert({
                id: user!.id,
                full_name: user!.user_metadata?.full_name ?? null,
                onboarding_complete: false,
            }, { onConflict: 'id' })
            .select()
            .single()
        profile = newProfile
    }

    if (profile && !profile.onboarding_complete) {
        redirect('/onboarding')
    }


    // Fetch work logs for the current week (Mon–Sun)
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 })
        .toISOString()
        .split('T')[0]

    const { data: weekLogs } = await supabase
        .from('work_logs')
        .select('*')
        .eq('user_id', user.id)
        .gte('work_date', weekStart)
        .order('work_date', { ascending: false })

    const { data: recentLogs } = await supabase
        .from('work_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('work_date', { ascending: false })
        .limit(10)

    const weeklyHours = (weekLogs || []).reduce((sum: number, l: any) => sum + Number(l.hours), 0)

    // Fetch budget for current month
    const currentMonth = new Date().toISOString().slice(0, 7)
    const { data: budget } = await supabase
        .from('budgets')
        .select('*')
        .eq('user_id', user.id)
        .eq('month', currentMonth)
        .maybeSingle()

    const weeklyLimit = profile?.weekly_hour_limit ?? 20

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Smart Reminders */}
                <ReminderBanner
                    visaExpiryDate={profile?.visa_expiry_date ?? null}
                    weeklyHours={weeklyHours}
                    weeklyLimit={weeklyLimit}
                />

                <DashboardGrid
                    userId={user.id}
                    profile={profile}
                    weeklyHours={weeklyHours}
                    weeklyLimit={weeklyLimit}
                    recentLogs={recentLogs ?? []}
                    budget={budget}
                    currentMonth={currentMonth}
                />

                {/* Subtle Footer */}
                <footer className="mt-16 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
                    <p>© 2026 Student Mind. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link href="/terms" className="hover:text-[var(--text)] transition-colors">Terms of Service</Link>
                        <Link href="/privacy" className="hover:text-[var(--text)] transition-colors">Privacy Policy</Link>
                    </div>
                </footer>
            </div>
        </div>
    )
}
