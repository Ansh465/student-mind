'use client'

import { useState, useEffect } from 'react'
import { FileCheck, CheckCircle2, Circle, Trophy, Lightbulb, AlertCircle } from 'lucide-react'

interface CVTask {
    id: string
    text: string
    description: string
    completed: boolean
}

const CV_RULES: CVTask[] = [
    { id: 'no-photo', text: 'Remove Photo', description: 'UK CVs should not include a photo of the applicant.', completed: false },
    { id: 'no-personal', text: 'No Personal Info', description: 'Remove Date of Birth, Gender, Marital Status - unnecessary for UK.', completed: false },
    { id: 'contact', text: 'Professional Contact', description: 'Check email & phone are correct. Add LinkedIn profile.', completed: false },
    { id: 'skills', text: 'Skills-First Approach', description: 'Highlight technical and soft skills clearly at the top.', completed: false },
    { id: 'spell-check', text: 'British Spell-Check', description: 'Use UK English (e.g., -ise instead of -ize).', completed: false },
    { id: 'formatting', text: 'Clean Formatting', description: 'Max 2 pages. Use clear headings and bullet points.', completed: false },
]

export function CVPrep() {
    const [tasks, setTasks] = useState<CVTask[]>(CV_RULES)

    useEffect(() => {
        const saved = localStorage.getItem('student-mind-cv-prep')
        if (saved) {
            const savedTasks = JSON.parse(saved)
            const merged = CV_RULES.map(def => {
                const s = savedTasks.find((t: CVTask) => t.id === def.id)
                return s ? { ...def, completed: s.completed } : def
            })
            setTasks(merged)
        }
    }, [])

    const toggleTask = (id: string) => {
        const newTasks = tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        )
        setTasks(newTasks)
        localStorage.setItem('student-mind-cv-prep', JSON.stringify(newTasks))
    }

    const completedCount = tasks.filter(t => t.completed).length
    const isDone = completedCount === tasks.length

    return (
        <div className="card rounded-2xl p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6 text-[var(--orange)]">
                <FileCheck className="w-5 h-5" />
                <h2 className="font-semibold text-[var(--text)]">CV & Job Prep</h2>
            </div>

            {/* Motivation Banner */}
            <div className={`mb-6 p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${isDone
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                    : 'bg-[var(--bg-raised)] border-[var(--border)] text-[var(--text-muted)]'
                }`}>
                {isDone ? <Trophy className="w-5 h-5 shrink-0" /> : <Lightbulb className="w-5 h-5 shrink-0" />}
                <p className="text-xs font-bold leading-tight">
                    {isDone
                        ? 'Your CV is UK-ready! Time to start applying.'
                        : `${tasks.length - completedCount} steps left to a perfect UK CV.`}
                </p>
            </div>

            {/* Task list */}
            <div className="space-y-2 overflow-y-auto flex-1 max-h-[400px] pr-1">
                {tasks.map(task => (
                    <button
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 group ${task.completed
                                ? 'bg-[var(--bg-card)] border-[var(--border)] opacity-60'
                                : 'bg-[var(--bg-raised)] border-[var(--border)] hover:border-[var(--accent-soft)]'
                            }`}
                    >
                        <div className="shrink-0">
                            {task.completed ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                                <Circle className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)]" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className={`text-sm font-bold truncate transition-all ${task.completed ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text)]'}`}>
                                {task.text}
                            </p>
                            <p className="text-[10px] text-[var(--text-muted)] line-clamp-1">
                                {task.description}
                            </p>
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-start gap-2">
                <AlertCircle className="w-3 h-3 text-[var(--accent)] shrink-0 mt-0.5" />
                <p className="text-[10px] text-[var(--text-muted)]">
                    <span className="font-bold text-[var(--text)]">UK Privacy Tip:</span> Don't include your full home address for security until you get an offer. City/Postcode is enough!
                </p>
            </div>
        </div>
    )
}
