'use client'

import confetti from 'canvas-confetti'

export function fireSuccessConfetti() {
    confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#f0c14b', '#6366f1', '#10b981', '#f43f5e', '#ffffff'],
        gravity: 0.9,
        scalar: 0.9,
        ticks: 200,
    })
}

export function fireMilestoneConfetti() {
    // Double blast for big achievements
    const end = Date.now() + 800
    const colors = ['#f0c14b', '#6366f1', '#10b981']

    const frame = () => {
        confetti({
            particleCount: 4,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.8 },
            colors,
        })
        confetti({
            particleCount: 4,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.8 },
            colors,
        })
        if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
}
