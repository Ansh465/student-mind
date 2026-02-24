'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedNumberProps {
    value: number
    duration?: number
    suffix?: string
    prefix?: string
    decimals?: number
    className?: string
}

export function AnimatedNumber({
    value,
    duration = 800,
    suffix = '',
    prefix = '',
    decimals = 0,
    className = ''
}: AnimatedNumberProps) {
    const [display, setDisplay] = useState(0)
    const frameRef = useRef<number | null>(null)
    const startRef = useRef<number | null>(null)
    const prevValueRef = useRef(0)

    useEffect(() => {
        const startValue = prevValueRef.current
        const diff = value - startValue

        if (Math.abs(diff) < 0.01) return

        const animate = (timestamp: number) => {
            if (!startRef.current) startRef.current = timestamp
            const elapsed = timestamp - startRef.current
            const progress = Math.min(elapsed / duration, 1)
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = startValue + diff * eased
            setDisplay(current)

            if (progress < 1) {
                frameRef.current = requestAnimationFrame(animate)
            } else {
                prevValueRef.current = value
                startRef.current = null
            }
        }

        if (frameRef.current) cancelAnimationFrame(frameRef.current)
        frameRef.current = requestAnimationFrame(animate)

        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current)
        }
    }, [value, duration])

    return (
        <span className={className}>
            {prefix}{display.toFixed(decimals)}{suffix}
        </span>
    )
}
