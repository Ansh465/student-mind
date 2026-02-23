'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader2, Sparkles, MessageSquare, Trash2 } from 'lucide-react'
import { ProBadge } from '../ProBadge'

interface Message {
    role: 'user' | 'model'
    content: string
}

export function AIAssistant() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', content: "Hi! I'm your Student Mind AI. How can I help you with your UK journey today?" }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = async () => {
        if (!input.trim() || isLoading) return

        const userMsg = input.trim()
        setInput('')
        setMessages(prev => [...prev, { role: 'user', content: userMsg }])
        setIsLoading(true)

        try {
            const res = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg,
                    history: messages.slice(-6).map(m => ({
                        role: m.role,
                        parts: [{ text: m.content }]
                    }))
                })
            })
            const data = await res.json()
            if (data.error) throw new Error(data.error)

            setMessages(prev => [...prev, { role: 'model', content: data.response }])
        } catch (e) {
            console.error(e)
            setMessages(prev => [...prev, { role: 'model', content: "Sorry, I'm having trouble connecting right now. Please try again later." }])
        } finally {
            setIsLoading(false)
        }
    }

    const clearChat = () => {
        setMessages([{ role: 'model', content: "Chat cleared. How else can I help?" }])
    }

    return (
        <div className="card rounded-2xl h-full flex flex-col bg-[var(--bg-card)] border-[var(--border)] overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-[var(--border)] bg-[var(--bg-raised)]/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-[var(--accent)] shadow-lg shadow-[var(--accent)]/20 text-white">
                        <Bot className="w-4 h-4" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-[var(--text)]">Survival AI</h2>
                        <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[9px] text-[var(--text-muted)] font-medium uppercase tracking-tight">Active Assistant</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={clearChat} className="p-1.5 rounded-lg hover:bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-rose-500 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <ProBadge size="sm" />
                </div>
            </div>

            {/* Chat Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] scroll-smooth bg-[var(--bg-input)]/20"
            >
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-sm ${msg.role === 'user'
                                ? 'bg-[var(--accent)] text-white rounded-tr-none'
                                : 'bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-sub)] rounded-tl-none'
                            }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl rounded-tl-none px-4 py-3 flex gap-2 items-center text-[var(--text-muted)] shadow-sm">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            <span className="text-[10px] font-medium tracking-tight uppercase">Thinking...</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[var(--bg-card)] border-t border-[var(--border)]">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask about visas, jobs, or culture..."
                        className="input-theme w-full pl-4 pr-12 py-3 rounded-xl text-xs bg-[var(--bg-input)]"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/10 disabled:opacity-50 disabled:grayscale transition-all hover:scale-105 active:scale-95"
                    >
                        <Send className="w-3.5 h-3.5" />
                    </button>
                </div>
                <p className="text-[9px] text-center text-[var(--text-muted)] mt-2 italic px-4">
                    AI can make mistakes. Check official UK gov sites for critical visa info.
                </p>
            </div>
        </div>
    )
}
