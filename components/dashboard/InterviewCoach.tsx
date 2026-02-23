'use client'

import { useState, useRef, useEffect } from 'react'
import { Mic, Send, Bot, User, Sparkles, RefreshCcw, CheckCircle, ChevronRight, MessageSquare, Briefcase } from 'lucide-react'

interface Message {
    role: 'user' | 'model'
    content: string
}

export function InterviewCoach() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', content: "Hi! I'm your AI Interview Coach. I'll help you practice for UK job interviews. Ready to start a mock session?" } as Message
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [jobTitle, setJobTitle] = useState('')
    const [isStarted, setIsStarted] = useState(false)
    const [interviewActive, setInterviewActive] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const startInterview = async () => {
        if (!jobTitle) return
        setIsStarted(true)
        setIsLoading(true)
        setInterviewActive(true)

        const initialPrompt = `Let's start the mock interview for a ${jobTitle} position. Please introduce yourself and ask me the first question.`

        try {
            const res = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: initialPrompt,
                    history: [],
                    context: { mode: 'interview', jobTitle }
                })
            })
            const data = await res.json()
            if (data.response) {
                const modelMsg: Message = { role: 'model', content: data.response }
                setMessages([modelMsg] as Message[])
            }
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }

    const sendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!input.trim() || isLoading) return

        const userMsg = input.trim()
        setInput('')
        const newUserMsg: Message = { role: 'user', content: userMsg }
        const newMessages: Message[] = [...messages, newUserMsg]
        setMessages(newMessages)
        setIsLoading(true)

        try {
            const res = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg,
                    history: messages,
                    context: { mode: 'interview', jobTitle }
                })
            })
            const data = await res.json()
            if (data.response) {
                const modelMsg: Message = { role: 'model', content: data.response }
                setMessages([...newMessages, modelMsg] as Message[])
            }
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }

    const resetInterview = () => {
        setIsStarted(false)
        setInterviewActive(false)
        setJobTitle('')
        setMessages([{ role: 'model' as const, content: "Hi! I'm your AI Interview Coach. I'll help you practice for UK job interviews. Ready to start a mock session?" }])
    }

    return (
        <div className="card rounded-2xl h-full flex flex-col bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-raised)] border border-[var(--border)] overflow-hidden">
            <div className="p-6 border-b border-[var(--border)] bg-[var(--bg-raised)]/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                            <Bot className="w-5 h-5 text-[var(--accent)]" />
                        </div>
                        <div>
                            <h2 className="font-bold text-[var(--text)] text-sm">AI Interview Coach</h2>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-widest">Active Sim</span>
                            </div>
                        </div>
                    </div>
                    {interviewActive && (
                        <button onClick={resetInterview} className="p-2 rounded-lg hover:bg-rose-500/10 text-[var(--text-muted)] hover:text-rose-500 transition-colors">
                            <RefreshCcw className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col p-4">
                {!isStarted ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-500">
                        <div className="w-20 h-20 rounded-3xl bg-[var(--accent)]/5 flex items-center justify-center">
                            <Mic className="w-10 h-10 text-[var(--accent)]/40" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-black text-[var(--text)]">Master Your STAR Method</h3>
                            <p className="text-xs text-[var(--text-muted)] max-w-[220px] mx-auto leading-relaxed">
                                Roleplay with a simulated UK HR manager and get instant feedback on your answers.
                            </p>
                        </div>
                        <div className="w-full space-y-3">
                            <div className="relative">
                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                                <input
                                    placeholder="e.g. Software Engineer, Sales Assistant"
                                    value={jobTitle}
                                    onChange={e => setJobTitle(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] text-sm focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all outline-none"
                                />
                            </div>
                            <button
                                onClick={startInterview}
                                disabled={!jobTitle}
                                className="btn-accent w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-[var(--accent)]/20 disabled:opacity-50 disabled:grayscale transition-all"
                            >
                                Start Mock Interview
                                <Sparkles className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar pb-4">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3.5 rounded-2xl text-[11px] leading-relaxed shadow-sm ${m.role === 'user'
                                        ? 'bg-[var(--accent)] text-white font-bold rounded-tr-none'
                                        : 'bg-[var(--bg-raised)] border border-[var(--border)] text-[var(--text)] rounded-tl-none'
                                        }`}>
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-[var(--bg-raised)] border border-[var(--border)] p-4 rounded-2xl rounded-tl-none animate-pulse">
                                        <div className="flex gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <form onSubmit={sendMessage} className="mt-2 flex gap-2">
                            <input
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder="Type your answer..."
                                className="flex-1 bg-[var(--bg-raised)] border border-[var(--border)] rounded-xl px-4 py-3 text-xs focus:border-[var(--accent)] outline-none"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="w-11 h-11 rounded-xl bg-[var(--accent)] text-white flex items-center justify-center shadow-lg shadow-[var(--accent)]/20 disabled:opacity-50"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}
