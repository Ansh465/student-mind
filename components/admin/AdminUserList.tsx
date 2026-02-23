'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Search, User, ShieldCheck, Zap, Loader2, Check, X, Shield, Star } from 'lucide-react'

interface UserProfile {
    id: string
    full_name: string | null
    subscription_tier: string
    is_admin: boolean
    created_at: string
}

export function AdminUserList() {
    const [users, setUsers] = useState<UserProfile[]>([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [updatingId, setUpdatingId] = useState<string | null>(null)
    const supabase = createClient()

    useEffect(() => {
        fetchUsers()
    }, [])

    async function fetchUsers() {
        setLoading(true)
        const { data, error } = await supabase
            .from('profiles')
            .select('id, full_name, subscription_tier, is_admin, created_at')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching users:', error)
        } else {
            setUsers(data || [])
        }
        setLoading(false)
    }

    async function toggleTier(userId: string, currentTier: string) {
        setUpdatingId(userId + '-tier')
        const newTier = currentTier === 'pro' ? 'free' : 'pro'

        const { error } = await supabase
            .from('profiles')
            .update({ subscription_tier: newTier })
            .eq('id', userId)

        if (error) {
            alert('Failed to update user tier: ' + error.message)
        } else {
            setUsers(users.map(u => u.id === userId ? { ...u, subscription_tier: newTier } : u))
        }
        setUpdatingId(null)
    }

    async function toggleAdmin(userId: string, currentIsAdmin: boolean) {
        if (!confirm(`Are you sure you want to ${currentIsAdmin ? 'remove' : 'grant'} admin privileges for this user?`)) return

        setUpdatingId(userId + '-admin')
        const { error } = await supabase
            .from('profiles')
            .update({ is_admin: !currentIsAdmin })
            .eq('id', userId)

        if (error) {
            alert('Failed to update admin status: ' + error.message)
        } else {
            setUsers(users.map(u => u.id === userId ? { ...u, is_admin: !currentIsAdmin } : u))
        }
        setUpdatingId(null)
    }

    const filteredUsers = users.filter(u =>
    (u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        u.id.toLowerCase().includes(search.toLowerCase()))
    )

    return (
        <div className="space-y-6">
            {/* Search & Stats */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[var(--bg-card)] p-6 rounded-[2rem] border border-[var(--border)] shadow-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                    <input
                        type="text"
                        placeholder="Search by name or User ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input-theme w-full pl-11 pr-4 py-3 rounded-2xl bg-[var(--bg-input)]"
                    />
                </div>
                <div className="flex gap-6">
                    <div className="text-center">
                        <div className="text-2xl font-black text-[var(--text)]">{users.length}</div>
                        <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Total Users</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-black text-[var(--accent)]">{users.filter(u => u.subscription_tier === 'pro').length}</div>
                        <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Pro Members</div>
                    </div>
                </div>
            </div>

            {/* User Table */}
            <div className="bg-[var(--bg-card)] rounded-[2.5rem] border border-[var(--border)] overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[var(--bg-raised)]/50">
                                <th className="px-8 py-5 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">User</th>
                                <th className="px-8 py-5 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Joined</th>
                                <th className="px-8 py-5 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-8 py-20 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin mx-auto text-[var(--accent)] mb-4" />
                                        <span className="text-sm font-bold text-[var(--text-muted)]">Loading user directory...</span>
                                    </td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-8 py-20 text-center">
                                        <div className="text-sm font-bold text-[var(--text-muted)]">No users found matching your search.</div>
                                    </td>
                                </tr>
                            ) : filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-[var(--bg-raised)]/30 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-2xl ${user.is_admin ? 'bg-amber-500/10 text-amber-500' : 'bg-[var(--indigo)]/10 text-[var(--indigo)]'}`}>
                                                {user.is_admin ? <Shield className="w-5 h-5" /> : <User className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <div className="font-bold text-[var(--text)] flex items-center gap-2">
                                                    {user.full_name || 'Anonymous User'}
                                                    {user.is_admin && <span className="text-[8px] bg-amber-500 text-white px-1.5 py-0.5 rounded-full uppercase tracking-tighter">Admin</span>}
                                                </div>
                                                <div className="text-[10px] text-[var(--text-muted)] font-mono truncate max-w-[150px]">{user.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        {user.subscription_tier === 'pro' ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                                                <Star className="w-3 h-3 fill-current" /> Professional
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-raised)] text-[var(--text-muted)] text-[10px] font-black uppercase tracking-widest border border-[var(--border)]">
                                                Free Tier
                                            </span>
                                        )
                                        }
                                    </td>
                                    <td className="px-8 py-6 text-xs text-[var(--text-sub)] font-medium">
                                        {new Date(user.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td className="px-8 py-6 text-right space-x-2">
                                        <button
                                            onClick={() => toggleAdmin(user.id, user.is_admin)}
                                            disabled={updatingId === user.id + '-admin'}
                                            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${user.is_admin
                                                    ? 'bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white'
                                                    : 'bg-[var(--bg-raised)] text-[var(--text-sub)] hover:bg-amber-500 hover:text-white border border-[var(--border)]'
                                                } disabled:opacity-50`}
                                            title={user.is_admin ? "Remove Admin" : "Make Admin"}
                                        >
                                            {updatingId === user.id + '-admin' ? (
                                                <Loader2 className="w-3 h-3 animate-spin" />
                                            ) : user.is_admin ? (
                                                <> <Shield className="w-3 h-3" /> Revoke</>
                                            ) : (
                                                <> <Shield className="w-3 h-3" /> Promote</>
                                            )}
                                        </button>

                                        <button
                                            onClick={() => toggleTier(user.id, user.subscription_tier)}
                                            disabled={updatingId === user.id + '-tier'}
                                            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${user.subscription_tier === 'pro'
                                                ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white'
                                                : 'bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/20 hover:scale-105 active:scale-95'
                                                } disabled:opacity-50`}
                                        >
                                            {updatingId === user.id + '-tier' ? (
                                                <Loader2 className="w-3 h-3 animate-spin" />
                                            ) : user.subscription_tier === 'pro' ? (
                                                <> <X className="w-3 h-3" /> Downgrade</>
                                            ) : (
                                                <> <Zap className="w-3 h-3 fill-current" /> Upgrade to Pro</>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
