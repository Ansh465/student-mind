'use client'

import { differenceInDays } from 'date-fns'
import { Shield, Clock, AlertTriangle } from 'lucide-react'

interface ReminderBannerProps {
    visaExpiryDate: string | null
    weeklyHours: number
    weeklyLimit: number
}

export function ReminderBanner({ visaExpiryDate, weeklyHours, weeklyLimit }: ReminderBannerProps) {
    const reminders: { type: 'warning' | 'danger'; icon: React.ReactNode; message: string }[] = []

    if (visaExpiryDate) {
        const daysLeft = differenceInDays(new Date(visaExpiryDate), new Date())
        if (daysLeft <= 30) {
            reminders.push({
                type: 'danger', icon: <Shield className="w-4 h-4 flex-shrink-0" />,
                message: `🚨 Your visa expires in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}! Take immediate action.`
            })
        } else if (daysLeft <= 60) {
            reminders.push({
                type: 'warning', icon: <Shield className="w-4 h-4 flex-shrink-0" />,
                message: `⚠️ Your visa expires in ${daysLeft} days. Start your renewal process soon.`
            })
        } else if (daysLeft <= 90) {
            reminders.push({
                type: 'warning', icon: <Shield className="w-4 h-4 flex-shrink-0" />,
                message: `📋 Your visa expires in ${daysLeft} days. Consider checking renewal requirements.`
            })
        }
    }

    const hoursPercent = weeklyLimit > 0 ? (weeklyHours / weeklyLimit) * 100 : 0
    if (hoursPercent >= 100) {
        reminders.push({
            type: 'danger', icon: <Clock className="w-4 h-4 flex-shrink-0" />,
            message: `🛑 You've exceeded your ${weeklyLimit}h weekly work limit! Working beyond this may violate your visa.`
        })
    } else if (hoursPercent >= 75) {
        reminders.push({
            type: 'warning', icon: <AlertTriangle className="w-4 h-4 flex-shrink-0" />,
            message: `⏰ You've used ${weeklyHours.toFixed(1)}h of your ${weeklyLimit}h weekly limit. Approaching your cap.`
        })
    }

    if (reminders.length === 0) return null

    return (
        <div className="space-y-2 mb-6">
            {reminders.map((r, i) => (
                <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium border"
                    style={r.type === 'danger'
                        ? { background: 'var(--red-soft)', borderColor: 'var(--red)', color: 'var(--red)' }
                        : { background: 'var(--amber-soft)', borderColor: 'var(--amber)', color: 'var(--amber)' }
                    }
                >
                    {r.icon}
                    <span>{r.message}</span>
                </div>
            ))}
        </div>
    )
}
