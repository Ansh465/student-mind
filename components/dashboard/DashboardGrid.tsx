'use client'

import { useState, useEffect } from 'react'
import type { TileConfig } from './DashboardSettings'
import { VisaCountdown } from './VisaCountdown'
import { WorkHourLog } from './WorkHourLog'
import { BudgetPlanner } from './BudgetPlanner'
import { AcademicTracker } from './AcademicTracker'
import { JobTracker } from './JobTracker'
import { AdminChecklist } from './AdminChecklist'
import { LocalResources } from './LocalResources'
import { DocumentVault } from './DocumentVault'
import { CultureGuide } from './CultureGuide'
import { CVPrep } from './CVPrep'
import { AccommodationManager } from './AccommodationManager'
import { ResumeScanner } from './ResumeScanner'
import { DashboardSettings } from './DashboardSettings'
import { AIWriter } from './AIWriter'
import { AIAssistant } from './AIAssistant'
import { PremiumFeatureWrapper } from '../PremiumFeatureWrapper'
import { CouncilTaxHelper } from './CouncilTaxHelper'
import { SafeSpendBudget } from './SafeSpendBudget'
import { InterviewCoach } from './InterviewCoach'
import { NHSNavigator } from './NHSNavigator'

interface DashboardGridProps {
    userId: string
    profile: any
    weeklyHours: number
    weeklyLimit: number
    recentLogs: any[]
    budget: any
    currentMonth: string
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
    const tier = profile?.subscription_tier ?? 'free'

    useEffect(() => {
        const saved = localStorage.getItem('student-mind-layout-v4')
        if (saved) {
            try {
                const savedTiles = JSON.parse(saved)
                setLayout(savedTiles)
            } catch (e) {
                console.error("Failed to load layout", e)
            }
        }
    }, [])

    const renderTile = (id: string) => {
        switch (id) {
            case 'visa':
                return <VisaCountdown visaExpiryDate={profile?.visa_expiry_date ?? null} userId={userId} />
            case 'work':
                return <WorkHourLog userId={userId} weeklyHours={weeklyHours} weeklyLimit={weeklyLimit} recentLogs={recentLogs} />
            case 'budget':
                return <BudgetPlanner userId={userId} currentMonth={currentMonth} budget={budget} />
            case 'ai-assistant':
                return (
                    <PremiumFeatureWrapper tier={tier} featureName="Survival AI" description="Chat with your private UK survival assistant.">
                        <AIAssistant />
                    </PremiumFeatureWrapper>
                )
            case 'ai-writer':
                return (
                    <PremiumFeatureWrapper tier={tier} featureName="AI CV Writer" description="Get AI-generated draft cover letters tailored for UK jobs.">
                        <AIWriter />
                    </PremiumFeatureWrapper>
                )
            case 'scanner':
                return (
                    <PremiumFeatureWrapper tier={tier} featureName="AI ATS Scanner" description="Deep-scan your resume against UK job descriptions.">
                        <ResumeScanner />
                    </PremiumFeatureWrapper>
                )
            case 'academic': return <AcademicTracker />
            case 'jobs': return <JobTracker />
            case 'checklist': return <AdminChecklist />
            case 'resources': return <LocalResources />
            case 'docs': return <DocumentVault />
            case 'culture': return <CultureGuide />
            case 'cv': return <CVPrep />
            case 'accommodation': return <AccommodationManager />
            case 'council-tax': return <CouncilTaxHelper />
            case 'safe-spend': return <SafeSpendBudget budget={budget} weeklyHours={weeklyHours} />
            case 'interview-coach':
                return (
                    <PremiumFeatureWrapper tier={tier} featureName="AI Interview Coach" description="Practice for UK jobs with a simulated recruiter.">
                        <InterviewCoach />
                    </PremiumFeatureWrapper>
                )
            case 'nhs-navigator': return <NHSNavigator />
            default: return null
        }
    }

    const colSpans: Record<number, string> = { 1: 'xl:col-span-1', 2: 'xl:col-span-2', 3: 'xl:col-span-3' }
    const rowSpans: Record<number, string> = { 1: 'xl:row-span-1', 2: 'xl:row-span-2', 3: 'xl:row-span-3' }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)]">
                        Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''} 👋
                    </h1>
                    <p className="text-[var(--text-sub)] mt-1">Here's your survival overview for today.</p>
                </div>
                <DashboardSettings onLayoutChange={setLayout} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 auto-rows-min grid-flow-row-dense">
                {layout.filter(t => t.visible).map((tile) => (
                    <div
                        key={tile.id}
                        className={`${colSpans[tile.colSpan || 1]} ${rowSpans[tile.rowSpan || 1]}`}
                    >
                        {renderTile(tile.id)}
                    </div>
                ))}
            </div>
        </div>
    )
}
