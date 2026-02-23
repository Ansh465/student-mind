'use client'

import { useState } from 'react'
import { Landmark, CheckCircle2, ChevronRight, FileText, Info, AlertCircle, Copy, Download } from 'lucide-react'

type Step = 'start' | 'check' | 'eligible' | 'not-eligible' | 'letter'

export function CouncilTaxHelper() {
    const [step, setStep] = useState<Step>('start')
    const [isFullTime, setIsFullTime] = useState<boolean | null>(null)
    const [livingSituation, setLivingSituation] = useState<'alone' | 'students-only' | 'mixed' | null>(null)

    const reset = () => {
        setStep('start')
        setIsFullTime(null)
        setLivingSituation(null)
    }

    const generateLetter = () => {
        const date = new Date().toLocaleDateString('en-GB')
        return `
To: Council Tax Department,

Date: ${date}

Subject: Request for Council Tax Exemption / Discount - Student Status

I am writing to formally request a Council Tax exemption or discount for my property.

I am a full-time student registered at my university. According to UK law, full-time students are exempt from paying Council Tax or are eligible for a significant discount.

Property Address: [INSERT YOUR FULL ADDRESS HERE]
Student ID: [INSERT YOUR STUDENT ID]
University: [INSERT UNIVERSITY NAME]

I have attached my "Student Status Letter" as proof of my enrollment.

${livingSituation === 'alone' ? 'As I live alone, I believe I am entitled to a 100% exemption.' : ''}
${livingSituation === 'students-only' ? 'As everyone in this property is a full-time student, we believe we are entitled to a 100% exemption.' : ''}
${livingSituation === 'mixed' ? 'As I live with non-students, I believe our household is entitled to a 25% single person discount (if only one adult is non-student) or other applicable reductions.' : ''}

Please update your records and send a revised bill.

Yours faithfully,

[YOUR NAME]
        `.trim()
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generateLetter())
        alert('Letter copied to clipboard! You can now paste it into an email or document.')
    }

    return (
        <div className="card rounded-2xl p-6 h-full flex flex-col bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-raised)] border border-[var(--border)] overflow-hidden">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <Landmark className="w-5 h-5 text-emerald-500" />
                </div>
                <h2 className="font-bold text-[var(--text)]">Council Tax Helper</h2>
            </div>

            <div className="flex-1 flex flex-col justify-center">
                {step === 'start' && (
                    <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/5 flex items-center justify-center mx-auto mb-2">
                            <Info className="w-8 h-8 text-emerald-500/40" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[var(--text)]">Save £1,000+ Per Year</h3>
                            <p className="text-xs text-[var(--text-muted)] mt-1 max-w-[200px] mx-auto">
                                Most international students don't need to pay Council Tax. Let's check your status.
                            </p>
                        </div>
                        <button
                            onClick={() => setStep('check')}
                            className="btn-accent w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-[var(--accent)]/20"
                        >
                            Start Eligibility Check
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {step === 'check' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Are you a full-time student?</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setIsFullTime(true)}
                                    className={`py-3 rounded-xl border font-bold transition-all ${isFullTime === true ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg' : 'bg-[var(--bg-raised)] border-[var(--border)] text-[var(--text-sub)] hover:border-[var(--accent)]'}`}
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={() => setIsFullTime(false)}
                                    className={`py-3 rounded-xl border font-bold transition-all ${isFullTime === false ? 'bg-rose-500 border-rose-500 text-white shadow-lg' : 'bg-[var(--bg-raised)] border-[var(--border)] text-[var(--text-sub)] hover:border-rose-500'}`}
                                >
                                    No
                                </button>
                            </div>
                        </div>

                        {isFullTime === true && (
                            <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                                <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Who do you live with?</label>
                                <div className="space-y-2">
                                    {[
                                        { id: 'alone', label: 'I live alone' },
                                        { id: 'students-only', label: 'Only with other students' },
                                        { id: 'mixed', label: 'With non-students' }
                                    ].map(opt => (
                                        <button
                                            key={opt.id}
                                            onClick={() => setLivingSituation(opt.id as any)}
                                            className={`w-full py-3 px-4 rounded-xl border text-left font-bold transition-all ${livingSituation === opt.id ? 'bg-[var(--accent)] border-[var(--accent)] text-white shadow-lg' : 'bg-[var(--bg-raised)] border-[var(--border)] text-[var(--text-sub)] hover:border-[var(--accent)]'}`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {isFullTime === false && isFullTime !== null && (
                            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex gap-3 text-rose-500">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <p className="text-xs font-medium">Unfortunately, only full-time students are usually exempt from Council Tax.</p>
                            </div>
                        )}

                        <div className="pt-2">
                            <button
                                disabled={isFullTime === null || (isFullTime && !livingSituation)}
                                onClick={() => setStep(isFullTime ? 'eligible' : 'not-eligible')}
                                className="btn-accent w-full py-3 rounded-xl font-bold shadow-lg shadow-[var(--accent)]/20 disabled:opacity-50 disabled:grayscale transition-all"
                            >
                                {isFullTime === false ? 'Finish' : 'See My Savings'}
                            </button>
                            <button onClick={reset} className="w-full mt-2 text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">Start Over</button>
                        </div>
                    </div>
                )}

                {step === 'eligible' && (
                    <div className="text-center space-y-4 animate-in zoom-in-95 duration-500">
                        <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-2 text-emerald-500">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-[var(--text)]">You're Eligible!</h3>
                            <p className="text-xs text-[var(--text-muted)] mt-1">
                                {livingSituation === 'mixed'
                                    ? "You can likely get a 25% discount on your bill."
                                    : "You are likely entitled to a 100% EXEMPTION!"}
                            </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-left space-y-3">
                            <div className="flex items-center gap-2 text-emerald-500">
                                <FileText className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Next Steps</span>
                            </div>
                            <ul className="text-[11px] text-[var(--text-sub)] space-y-2">
                                <li className="flex items-start gap-2">
                                    <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[8px] font-bold shrink-0 mt-0.5">1</div>
                                    <span>Get your <b>Student Status Letter</b> from your university.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[8px] font-bold shrink-0 mt-0.5">2</div>
                                    <span>Submit the letter via your <b>Local Council's website</b>.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <button
                                onClick={() => setStep('letter')}
                                className="btn-accent w-full py-3 rounded-xl font-bold shadow-lg shadow-[var(--accent)]/20"
                            >
                                Generate Exemption Letter
                            </button>
                            <button onClick={reset} className="w-full text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">Back</button>
                        </div>
                    </div>
                )}

                {step === 'not-eligible' && (
                    <div className="text-center space-y-6">
                        <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto text-rose-500">
                            <AlertCircle className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[var(--text)]">Not Eligible?</h3>
                            <p className="text-xs text-[var(--text-muted)] mt-1 px-4">
                                Council Tax rules are strict. If you are not a full-time student, you usually have to pay. However, check if you qualify for "Single Person Discount" if you live alone.
                            </p>
                        </div>
                        <button onClick={reset} className="btn-accent w-full py-3 rounded-xl font-bold">Try Again</button>
                    </div>
                )}

                {step === 'letter' && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Your Draft Letter</label>
                            <button onClick={copyToClipboard} className="text-[10px] font-black text-[var(--accent)] flex items-center gap-1 hover:underline">
                                <Copy className="w-3 h-3" /> Copy Text
                            </button>
                        </div>
                        <div className="bg-[var(--bg-raised)] border border-[var(--border)] rounded-2xl p-4 max-h-[250px] overflow-y-auto text-[10px] font-mono text-[var(--text-sub)] whitespace-pre-wrap leading-relaxed">
                            {generateLetter()}
                        </div>
                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-3 text-amber-500">
                            <Info className="w-4 h-4 shrink-0 mt-0.5" />
                            <p className="text-[10px] font-medium leading-relaxed">Remember to replace the <span className="font-bold underline">[BRACKETED]</span> text with your actual details before sending!</p>
                        </div>
                        <button
                            onClick={reset}
                            className="w-full py-3 rounded-xl border border-[var(--border)] text-xs font-bold text-[var(--text-sub)] hover:bg-[var(--bg-raised)] transition-all"
                        >
                            Done
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
