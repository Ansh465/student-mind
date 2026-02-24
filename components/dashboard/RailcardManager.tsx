'use client'

import { TrainFront, Map, Clock, ArrowRight, ExternalLink } from 'lucide-react'

export function RailcardManager() {
    return (
        <div className="card rounded-2xl p-6 flex-1 flex flex-col bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-raised)] border border-[var(--border)] overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                <TrainFront className="w-24 h-24 text-[var(--accent)]" />
            </div>

            <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                        <TrainFront className="w-5 h-5 text-[var(--accent)]" />
                    </div>
                    <h2 className="font-bold text-[var(--text)]">Travel & Railcard</h2>
                </div>
                <div className="bg-emerald-500/10 px-2 py-1 rounded-md">
                    <span className="text-[10px] font-black text-emerald-500 uppercase">Save ~33%</span>
                </div>
            </div>

            <div className="flex-1 space-y-4 relative z-10">
                {/* Mock Digital Railcard */}
                <div className="aspect-[1.586/1] w-full rounded-xl bg-gradient-to-br from-[#003366] to-[#0055A4] p-4 flex flex-col justify-between shadow-xl relative overflow-hidden border border-white/10">
                    <div className="absolute inset-0 bg-white/5 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[shine_5s_infinite]" />
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-white font-black text-lg uppercase tracking-tight">16-25 Railcard</h3>
                            <p className="text-white/70 text-[10px] font-medium">Digital Pass</p>
                        </div>
                        <TrainFront className="w-8 h-8 text-white/20" />
                    </div>
                    <div>
                        <p className="text-white/50 text-[10px] uppercase tracking-wider mb-1">Expires</p>
                        <p className="text-white font-mono font-bold tracking-widest">14 DEC 2026</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <a href="https://www.thetrainline.com" target="_blank" className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors flex flex-col items-center justify-center gap-1 group/btn">
                        <Clock className="w-4 h-4 text-[var(--text-sub)] group-hover/btn:text-[var(--accent)] transition-colors" />
                        <span className="text-[10px] font-bold text-[var(--text)]">TheTrainline</span>
                    </a>
                    <a href="https://www.skyscanner.net" target="_blank" className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors flex flex-col items-center justify-center gap-1 group/btn">
                        <Map className="w-4 h-4 text-[var(--text-sub)] group-hover/btn:text-[var(--accent)] transition-colors" />
                        <span className="text-[10px] font-bold text-[var(--text)]">Schengen Flights</span>
                    </a>
                </div>
            </div>

            <p className="text-[10px] text-center text-[var(--text-muted)] mt-4">
                Tip: Link your physical Railcard to your Oyster card at any London Tube station to get 1/3 off off-peak Oyster fares!
            </p>
        </div>
    )
}
