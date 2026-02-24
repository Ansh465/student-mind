'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { TileConfig } from './DashboardSettings'
import { VisaCountdown } from './VisaCountdown'
import { WorkHourLog } from './WorkHourLog'
import { BudgetPlanner } from './BudgetPlanner'
import { JobTracker } from './JobTracker'
import { DocumentVault } from './DocumentVault'
import { ResumeScanner } from './ResumeScanner'
import { DashboardSettingsPanel, DEFAULT_TILES } from './DashboardSettings'
import { AIWriter } from './AIWriter'
import { AIAssistant } from './AIAssistant'
import { PremiumFeatureWrapper } from '../PremiumFeatureWrapper'
import { SafeSpendBudget } from './SafeSpendBudget'
import { InterviewCoach } from './InterviewCoach'
import { NHSNavigator } from './NHSNavigator'

// V2 Expansion Tiles
import { NetworkingCRM } from './NetworkingCRM'
import { DiscountTracker } from './DiscountTracker'
import { RailcardManager } from './RailcardManager'
import { TasteOfHome } from './TasteOfHome'

interface DashboardGridProps {
    userId: string
    profile: any
    weeklyHours: number
    weeklyLimit: number
    recentLogs: any[]
    budget: any
    currentMonth: string
}

/**
 * Each tile gets a Tailwind col-span class for a 12-column grid.
 * The grid uses `items-stretch` so tiles in the same implicit row
 * always match height. On small screens everything becomes 1 col.
 *
 * Sizing logic (12 cols total):
 *   col-3  = 1/4 width  → compact stat widgets
 *   col-4  = 1/3 width  → narrow helpers
 *   col-6  = 1/2 width  → standard cards
 *   col-8  = 2/3 width  → primary tools
 *   col-12 = full width → wide panels (work log, job tracker)
 */
const SIZE_CLASSES: Record<TileConfig['size'], string> = {
    small: 'col-span-12 sm:col-span-6 lg:col-span-3',
    medium: 'col-span-12 md:col-span-6 lg:col-span-4',
    large: 'col-span-12 lg:col-span-6',
    xlarge: 'col-span-12 lg:col-span-8',
    full: 'col-span-12',
}

export function DashboardGrid({
    userId,
    profile,
    weeklyHours,
    weeklyLimit,
    recentLogs,
    budget,
    currentMonth
}: DashboardGridProps) {
    const [layout, setLayout] = useState<TileConfig[]>([])
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [greeting, setGreeting] = useState({ emoji: '👋', message: "Here's your survival overview for today." })
    const [isVerifying, setIsVerifying] = useState(false)
    const tier = profile?.subscription_tier ?? 'free'
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        const sessionId = searchParams.get('session_id')
        if (sessionId && tier !== 'pro' && !isVerifying) {
            setIsVerifying(true)
            fetch('/api/stripe/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId })
            }).then(res => res.json())
                .then(data => {
                    if (data.success) {
                        // Pro tip: router.refresh() triggers a new Server Server request
                        router.replace('/dashboard')
                        router.refresh()
                    } else {
                        setIsVerifying(false)
                    }
                })
                .catch(() => setIsVerifying(false))
        }
    }, [searchParams, tier])

    useEffect(() => {
        const hour = new Date().getHours()
        const remaining = Math.max(weeklyLimit - weeklyHours, 0)
        const day = new Date().getDay()
        let emoji = '👋', message = "Here's your survival overview for today."
        if (weeklyHours >= weeklyLimit) {
            emoji = '🛑'; message = "Visa work limit hit — rest up, you've earned it!"
        } else if (remaining <= 2 && weeklyHours > 0) {
            emoji = '⚠️'; message = `Only ${remaining.toFixed(1)}h left this week — keep an eye on it!`
        } else if (hour >= 5 && hour < 12) {
            const m = ['Morning! Ready to conquer today? ☕', 'Good morning — let\'s make today count! 🌅', 'Rise and grind! 💪']
            emoji = '🌅'; message = m[new Date().getDate() % m.length]
        } else if (hour >= 12 && hour < 17) {
            const m = ['Keep pushing — afternoon shift time! 💼', 'Staying on track? 🎯', 'Lunch done, back to it! 📚']
            emoji = '☀️'; message = m[new Date().getDate() % m.length]
        } else if (hour >= 17 && hour < 21) {
            emoji = '🌆'; message = 'Evening hustle! Log your shifts before you forget.'
        } else {
            emoji = '🌙'; message = 'Late night? Make sure you\'re getting enough sleep! 😴'
        }
        if (day === 6 || day === 0) { emoji = '🎉'; message = 'Weekend! Don\'t forget to log any shifts worked.' }
        setGreeting({ emoji, message })
    }, [weeklyHours, weeklyLimit])

    useEffect(() => {
        if (profile?.dashboard_layout && Array.isArray(profile.dashboard_layout) && profile.dashboard_layout.length > 0) {
            setLayout(profile.dashboard_layout)
        } else {
            setLayout(DEFAULT_TILES)
        }
    }, [profile?.dashboard_layout])

    const renderContent = (id: string) => {
        switch (id) {
            case 'visa': return <VisaCountdown visaExpiryDate={profile?.visa_expiry_date ?? null} userId={userId} />
            case 'work': return <WorkHourLog userId={userId} weeklyHours={weeklyHours} weeklyLimit={weeklyLimit} recentLogs={recentLogs} />
            case 'budget': return <BudgetPlanner userId={userId} currentMonth={currentMonth} budget={budget} />
            case 'safe-spend': return <SafeSpendBudget budget={budget} weeklyHours={weeklyHours} />
            case 'jobs': return <JobTracker />
            case 'docs': return <DocumentVault userId={userId} tier={tier} />
            case 'nhs-navigator': return <NHSNavigator />

            // V2 Expansion Tiles
            case 'networking': return <NetworkingCRM />
            case 'discounts': return <DiscountTracker />
            case 'railcard': return <RailcardManager />
            case 'tasteofhome': return <TasteOfHome />

            case 'ai-assistant': return <PremiumFeatureWrapper tier={tier} featureName="Survival AI" description="Chat with your private UK survival assistant."><AIAssistant /></PremiumFeatureWrapper>
            case 'ai-writer': return <PremiumFeatureWrapper tier={tier} featureName="AI Cover Letter Writer" description="Get AI-generated cover letters for UK jobs."><AIWriter /></PremiumFeatureWrapper>
            case 'scanner': return <PremiumFeatureWrapper tier={tier} featureName="AI ATS Scanner" description="Deep-scan your resume against UK job descriptions."><ResumeScanner /></PremiumFeatureWrapper>
            case 'interview-coach': return <PremiumFeatureWrapper tier={tier} featureName="AI Interview Coach" description="Practice for UK jobs with a simulated recruiter."><InterviewCoach /></PremiumFeatureWrapper>
            default: return null
        }
    }

    const visible = layout.filter(t => t.visible)

    return (
        <div className="space-y-6">
            {/* ── Header ─────────────────────────────────────────── */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[var(--text)] tracking-tight">
                        {greeting.emoji} Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}!
                    </h1>
                    <p className="text-[var(--text-sub)] mt-1 text-sm">
                        {isVerifying ? (
                            <span className="flex items-center gap-2 text-[var(--accent)] font-bold animate-pulse">
                                Verifying payment status...
                            </span>
                        ) : (
                            greeting.message
                        )}
                    </p>
                </div>
                <div className="shrink-0 mt-1">
                    <button
                        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all text-sm font-bold ${isSettingsOpen
                            ? 'bg-[var(--accent)] border-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/20'
                            : 'bg-[var(--bg-raised)] border-[var(--border)] text-[var(--text-sub)] hover:text-[var(--text)]'
                            }`}
                    >
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                        {isSettingsOpen ? 'Done' : 'Customize'}
                    </button>
                </div>
            </div>

            {/* ── Inline Settings Panel ── */}
            {isSettingsOpen && (
                <div className="mb-6 relative z-50">
                    <DashboardSettingsPanel
                        onClose={() => setIsSettingsOpen(false)}
                        onLayoutChange={setLayout}
                        userId={userId}
                        initialLayout={profile?.dashboard_layout ?? null}
                    />
                </div>
            )}

            {/* ── 12-column grid — tiles stretch to match row-mates ── */}
            <div className="grid grid-cols-12 gap-5 items-stretch">
                {visible.map(tile => {
                    const colClass = SIZE_CLASSES[tile.size] || SIZE_CLASSES['large']
                    return (
                        <div key={tile.id} className={`${colClass} flex flex-col`}>
                            <div className="flex-1 flex flex-col">
                                {renderContent(tile.id)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
