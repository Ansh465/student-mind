'use client'

import { ExternalLink, HeartPulse, TrainFront, Percent, MapPin, Info } from 'lucide-react'

const RESOURCES = [
    {
        category: 'Health & Well-being',
        icon: HeartPulse,
        color: 'text-rose-500',
        bg: 'bg-rose-500/10',
        links: [
            { label: 'Find a GP', url: 'https://www.nhs.uk/service-search/find-a-gp' },
            { label: 'NHS 111 Online', url: 'https://111.nhs.uk/' },
            { label: 'Student Space', url: 'https://studentspace.org.uk/' },
        ]
    },
    {
        category: 'Travel & Transport',
        icon: TrainFront,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        links: [
            { label: '16-25 Railcard', url: 'https://www.16-25railcard.co.uk/' },
            { label: 'TfL Student Oyster', url: 'https://tfl.gov.uk/fares/free-and-discounted-travel/18-plus-student-oyster-photocard' },
            { label: 'Trainline', url: 'https://www.thetrainline.com/' },
        ]
    },
    {
        category: 'Student Discounts',
        icon: Percent,
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
        links: [
            { label: 'UNiDAYS', url: 'https://www.myunidays.com/' },
            { label: 'StudentBeans', url: 'https://www.studentbeans.com/' },
            { label: 'TOTUM (NUS)', url: 'https://www.totum.com/' },
        ]
    }
]

export function LocalResources() {
    return (
        <div className="card rounded-2xl p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-[var(--accent)]" />
                <h2 className="font-semibold text-[var(--text)]">Local Resources</h2>
            </div>

            <div className="space-y-6 flex-1 overflow-y-auto pr-1">
                {RESOURCES.map((group, idx) => (
                    <div key={idx}>
                        <div className="flex items-center gap-2 mb-3">
                            <div className={`p-1.5 rounded-lg ${group.bg} ${group.color}`}>
                                <group.icon className="w-4 h-4" />
                            </div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--text-sub)]">
                                {group.category}
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            {group.links.map((link, lIdx) => (
                                <a
                                    key={lIdx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] hover:bg-[var(--bg-input)] hover:border-[var(--accent-soft)] transition-all group"
                                >
                                    <span className="text-sm font-medium text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                                        {link.label}
                                    </span>
                                    <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-soft)] flex gap-3">
                <Info className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <p className="text-[10px] text-[var(--text-sub)] leading-relaxed">
                    <span className="font-bold text-[var(--text)]">Pro Tip:</span> Always carry your BRP and Student ID. Most places in the UK offer student discounts if you just ask!
                </p>
            </div>
        </div>
    )
}
