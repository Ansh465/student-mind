'use client'

import { useState } from 'react'
import { Wand2, Copy, Check, Loader2, Sparkles, FileText, Send } from 'lucide-react'
import { ProBadge } from '../ProBadge'

export function AIWriter() {
    const [jobTitle, setJobTitle] = useState('')
    const [keyPoints, setKeyPoints] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [result, setResult] = useState('')
    const [copied, setCopied] = useState(false)

    const handleGenerate = () => {
        setIsGenerating(true)
        // Simulate AI generation
        setTimeout(() => {
            const mockCoverLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the ${jobTitle || '[Job Title]'} position. As an international student in the UK, I bring a unique perspective and a dedicated work ethic to your team.

${keyPoints ? `Regarding your requirements, ${keyPoints}. ` : ''}Throughout my academic journey, I have developed strong analytical skills and a proactive approach to problem-solving. My international background has taught me adaptability and effective communication in diverse environments.

I am particularly impressed by your company's commitment to innovation and would welcome the opportunity to contribute my skills to your upcoming projects.

Thank you for your time and consideration.

Sincerely,
[Your Name]`
            setResult(mockCoverLetter)
            setIsGenerating(false)
        }, 2000)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="card rounded-2xl p-6 h-full flex flex-col bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-raised)] border-[var(--border)] overflow-hidden relative">
            {/* Background Accent */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[var(--accent)] opacity-[0.03] blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[#ffa43a] shadow-lg shadow-[var(--accent)]/20">
                        <Wand2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-[var(--text)] leading-tight">AI CV Writer</h2>
                        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-medium">Cover Letter Magic</p>
                    </div>
                </div>
                <ProBadge />
            </div>

            {!result ? (
                <div className="space-y-4 animate-in fade-in duration-500">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[var(--text-sub)] uppercase tracking-tight">Target Job Title</label>
                        <input
                            type="text"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            placeholder="e.g. Software Engineer Intern"
                            className="input-theme w-full px-4 py-3 rounded-xl text-sm"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[var(--text-sub)] uppercase tracking-tight">Key Points to Highlight</label>
                        <textarea
                            value={keyPoints}
                            onChange={(e) => setKeyPoints(e.target.value)}
                            placeholder="e.g. 2 years React exp, fluent in 3 languages..."
                            className="input-theme w-full px-4 py-3 rounded-xl text-sm min-h-[100px] resize-none"
                        />
                    </div>
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !jobTitle}
                        className="btn-accent w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-[var(--accent)]/20"
                    >
                        {isGenerating ? (
                            <><Loader2 className="w-5 h-5 animate-spin" /> Casting Spell...</>
                        ) : (
                            <><Sparkles className="w-5 h-5" /> Generate Professional Draft</>
                        )}
                    </button>
                    <p className="text-[10px] text-[var(--text-muted)] text-center italic">
                        Psst: This draft is optimized for UK recruitment standards.
                    </p>
                </div>
            ) : (
                <div className="flex-1 flex flex-col space-y-4 animate-in zoom-in-95 duration-500">
                    <div className="flex-1 rounded-xl bg-[var(--bg-input)] border border-[var(--border)] p-4 text-xs text-[var(--text-sub)] leading-relaxed relative group overflow-y-auto max-h-[250px]">
                        <pre className="whitespace-pre-wrap font-sans">{result}</pre>
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-input)] via-transparent to-transparent opacity-20 pointer-events-none" />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setResult('')}
                            className="flex-1 py-3 h-12 rounded-xl border border-[var(--border)] text-sm font-bold text-[var(--text-sub)] hover:bg-[var(--bg-raised)] transition-all"
                        >
                            Start Over
                        </button>
                        <button
                            onClick={copyToClipboard}
                            className="flex-[2] py-3 h-12 rounded-xl bg-[var(--accent)] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[var(--accent)]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy to Clipboard</>}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
