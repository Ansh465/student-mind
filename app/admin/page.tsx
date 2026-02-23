import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AdminUserList } from '@/components/admin/AdminUserList'
import { Navbar } from '@/components/Navbar'
import { ShieldAlert } from 'lucide-react'

export default async function AdminPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Check if user is admin
    const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single()

    if (!profile?.is_admin) {
        return (
            <div className="min-h-screen bg-[var(--bg)]">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                    <div className="inline-flex p-4 rounded-full bg-rose-500/10 text-rose-500 mb-6">
                        <ShieldAlert className="w-12 h-12" />
                    </div>
                    <h1 className="text-3xl font-black text-[var(--text)] mb-4">Access Denied</h1>
                    <p className="text-[var(--text-sub)] max-w-md mx-auto">
                        This area is restricted to Student Mind administrators only. If you believe this is an error, please contact the system owner.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[var(--bg)] pb-20">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="mb-10">
                    <h1 className="text-3xl font-black text-[var(--text)] tracking-tight">Admin Control Panel</h1>
                    <p className="text-[var(--text-sub)] mt-1">Manage user tiers and system-wide overrides.</p>
                </div>

                <AdminUserList />
            </main>
        </div>
    )
}
