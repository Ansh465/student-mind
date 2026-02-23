import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Newspaper, ExternalLink, Clock, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'
import { getGovNews, NewsItem } from '@/lib/news'

export const dynamic = 'force-dynamic'

export default async function ResourcesPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const news = await getGovNews()

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent)]/20 flex items-center justify-center">
                            <Newspaper className="w-5 h-5 text-[var(--accent)]" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)]">Resource Hub</h1>
                            <p className="text-[var(--text-sub)] text-sm">Latest UK student visa news from GOV.UK</p>
                        </div>
                    </div>
                </div>

                {/* Useful Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                    {[
                        { label: 'Check Your Visa Status', url: 'https://www.gov.uk/check-immigration-status', desc: 'Official visa status checker' },
                        { label: 'Student Visa Rules', url: 'https://www.gov.uk/student-visa', desc: 'Work rights & conditions' },
                        { label: 'Extend Your Visa', url: 'https://www.gov.uk/student-visa/extend-your-visa', desc: 'Renewal process guide' },
                        { label: 'UK National Minimum Wage', url: 'https://www.gov.uk/national-minimum-wage-rates', desc: 'Current pay rates' },
                        { label: 'Report Visa Changes', url: 'https://www.gov.uk/change-circumstances-visa-immigration', desc: 'Update UKVI about changes' },
                        { label: 'Find Immigration Advisor', url: 'https://www.gov.uk/find-an-immigration-adviser', desc: 'Regulated advisors' },
                    ].map(link => (
                        <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass rounded-xl p-4 glass-hover group flex items-start justify-between border-[var(--border)] transition-all"
                        >
                            <div>
                                <p className="text-sm font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">{link.label}</p>
                                <p className="text-xs text-[var(--text-muted)] mt-0.5">{link.desc}</p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors flex-shrink-0 mt-0.5" />
                        </a>
                    ))}
                </div>

                {/* News Feed */}
                <div>
                    <h2 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse inline-block shadow-[0_0_8px_var(--accent-soft)]" />
                        Latest Updates from GOV.UK
                    </h2>

                    {news.length === 0 ? (
                        <div className="glass rounded-2xl p-12 text-center border-[var(--border)]">
                            <AlertCircle className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-3" />
                            <p className="text-[var(--text-sub)] font-medium">Could not load news feed</p>
                            <p className="text-[var(--text-muted)] text-sm mt-1">Please check the official GOV.UK website directly.</p>
                            <a
                                href="https://www.gov.uk/browse/visas-immigration/student-visas"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 mt-4 text-[var(--accent)] hover:opacity-80 text-sm font-medium transition-all"
                            >
                                Visit GOV.UK <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {news.map(item => (
                                <a
                                    key={item.id}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass rounded-xl p-5 glass-hover group flex flex-col border-[var(--border)]"
                                >
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <span className="text-xs font-bold text-[var(--accent)] bg-[var(--accent-soft)] px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                            {item.category}
                                        </span>
                                        <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors flex-shrink-0 mt-0.5" />
                                    </div>

                                    <h3 className="text-base font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors mb-2 line-clamp-2">
                                        {item.title}
                                    </h3>

                                    {item.summary && (
                                        <p className="text-sm text-[var(--text-sub)] line-clamp-3 mb-3 flex-1">
                                            {item.summary.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')}
                                        </p>
                                    )}

                                    {item.published && (
                                        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mt-auto pt-3 border-t border-[var(--border)]">
                                            <Clock className="w-3.5 h-3.5" />
                                            {format(new Date(item.published), 'dd MMM yyyy')}
                                        </div>
                                    )}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
