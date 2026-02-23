'use client'

import { useState } from 'react'
import { FileSearch, CheckCircle2, AlertCircle, TrendingUp, Search, Info, Trash2, Loader2, Sparkles, Download } from 'lucide-react'
import { jsPDF } from 'jspdf'

interface AnalysisResult {
    score: number
    keywordsFound: string[]
    missingKeywords: string[]
    bulletIssues: { line: string; issue: string }[]
    hasQuantification: boolean
    improvementTips: string[]
    overallVerdict: string
}

export function ResumeScanner() {
    const [jdText, setJdText] = useState('')
    const [resumeText, setResumeText] = useState('')
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)

    const handleAnalyze = async () => {
        if (!jdText.trim() || !resumeText.trim()) return

        setIsAnalyzing(true)
        try {
            const res = await fetch('/api/ai/analyze-resume', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jd: jdText, resume: resumeText })
            })
            const data = await res.json()
            if (data.error) throw new Error(data.error)
            setAnalysis(data)
        } catch (e) {
            console.error(e)
            alert("Failed to analyze resume. Please check your API key.")
        } finally {
            setIsAnalyzing(false)
        }
    }

    const downloadReport = () => {
        if (!analysis) return
        const doc = new jsPDF()

        doc.setFontSize(22)
        doc.text("AI ATS Survival Report", 20, 20)

        doc.setFontSize(14)
        doc.text(`Match Score: ${analysis.score}%`, 20, 35)
        doc.text(`Verdict: ${analysis.overallVerdict}`, 20, 45)

        doc.setFontSize(16)
        doc.text("Missing Keywords:", 20, 60)
        doc.setFontSize(12)
        analysis.missingKeywords.slice(0, 10).forEach((kw, i) => {
            doc.text(`• ${kw}`, 25, 70 + (i * 7))
        })

        doc.setFontSize(16)
        doc.text("Improvement Tips:", 20, 150)
        doc.setFontSize(12)
        analysis.improvementTips.slice(0, 5).forEach((tip, i) => {
            doc.text(`• ${tip}`, 25, 160 + (i * 7))
        })

        doc.save("Student_Mind_AI_Report.pdf")
    }

    const reset = () => {
        setJdText('')
        setResumeText('')
        setAnalysis(null)
    }

    return (
        <div className="card rounded-2xl p-6 h-full flex flex-col bg-[var(--bg-card)] border-[var(--border)] relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[var(--indigo)] opacity-[0.03] blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-[var(--indigo)]">
                    <FileSearch className="w-5 h-5" />
                    <h2 className="font-bold text-[var(--text)]">AI Resume Scanner</h2>
                </div>
                {(jdText || resumeText || analysis) && (
                    <button onClick={reset} className="p-1.5 rounded-lg hover:bg-[var(--bg-raised)] text-[var(--text-muted)] hover:text-rose-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest pl-1">Job Description</label>
                    <textarea
                        placeholder="Paste the job requirements here..."
                        value={jdText}
                        onChange={(e) => setJdText(e.target.value)}
                        className="input-theme w-full h-32 p-3 text-xs resize-none rounded-xl bg-[var(--bg-input)]"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest pl-1">Your Resume</label>
                    <textarea
                        placeholder="Paste your resume text here..."
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                        className="input-theme w-full h-32 p-3 text-xs resize-none rounded-xl bg-[var(--bg-input)]"
                    />
                </div>
            </div>

            {!analysis && !isAnalyzing ? (
                <button
                    onClick={handleAnalyze}
                    disabled={!jdText || !resumeText}
                    className="btn-accent py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-[var(--accent)]/20 disabled:opacity-50 disabled:grayscale transition-all"
                >
                    <Sparkles className="w-5 h-5" />
                    Run AI Deep Scan
                </button>
            ) : isAnalyzing ? (
                <div className="flex-1 flex flex-col items-center justify-center py-8 text-center bg-[var(--bg-raised)] rounded-2xl border border-dashed border-[var(--border)]">
                    <Loader2 className="w-8 h-8 mb-3 text-[var(--indigo)] animate-spin" />
                    <p className="text-sm font-bold text-[var(--text)]">AI is Analyzing...</p>
                    <p className="text-xs text-[var(--text-muted)] px-8 mt-1">Cross-referencing your experience with UK recruitment standards.</p>
                </div>
            ) : (
                <div className="flex-1 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-br from-[var(--indigo)] to-[#818cf8] text-white shadow-xl">
                        <div>
                            <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">AI Match Score</div>
                            <div className="text-4xl font-black">{analysis?.score}%</div>
                        </div>
                        <div className="text-right flex flex-col items-end">
                            <TrendingUp className="w-8 h-8 opacity-40 mb-1" />
                            <div className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                                {analysis?.score! > 70 ? 'Strong Match' : 'Optimization Required'}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold text-[var(--text)] flex items-center gap-2">
                                <Search className="w-3.5 h-3.5 text-[var(--indigo)]" /> Missing Keywords
                            </h3>
                            <div className="flex flex-wrap gap-1.5">
                                {analysis?.missingKeywords.map(kw => (
                                    <span key={kw} className="px-2 py-0.5 rounded-md bg-[var(--bg-raised)] border border-[var(--border)] text-[10px] text-[var(--text-sub)]">
                                        {kw}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xs font-bold text-[var(--text)] flex items-center gap-2">
                                <AlertCircle className="w-3.5 h-3.5 text-amber-500" /> AI Suggestions
                            </h3>
                            <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                                {analysis?.improvementTips.map((tip, i) => (
                                    <div key={i} className="p-2.5 rounded-lg bg-[var(--bg-raised)] border border-[var(--border)] text-[10px] text-[var(--text-sub)] flex gap-2">
                                        <div className="w-1 h-1 rounded-full bg-[var(--indigo)] mt-1 shrink-0" />
                                        {tip}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={downloadReport}
                        className="w-full py-3.5 rounded-xl border-2 border-[var(--indigo)] text-[var(--indigo)] font-bold flex items-center justify-center gap-2 hover:bg-[var(--indigo)] hover:text-white transition-all shadow-lg active:scale-95"
                    >
                        <Download className="w-4 h-4" />
                        Download PDF Report
                    </button>
                </div>
            )}

            <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center gap-2 text-[9px] text-[var(--text-muted)] italic">
                <Info className="w-3 h-3 text-[var(--indigo)]" />
                <span>AI processing via Gemini 2.0. Detailed reports are limited for free users.</span>
            </div>
        </div>
    )
}
