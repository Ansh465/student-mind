import Link from 'next/link'
import { GraduationCap, ArrowLeft } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

export const metadata = {
    title: 'Privacy Policy | Student Mind',
    description: 'GDPR-compliant Privacy Policy for Student Mind.',
}

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
            <header className="navbar-glass sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-[var(--text-sub)] hover:text-[var(--text)] transition-colors text-sm font-medium">
                        <ArrowLeft className="w-4 h-4" /> Back
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: 'var(--accent)' }}>
                                <GraduationCap className="w-3.5 h-3.5" style={{ color: 'var(--accent-fg)' }} />
                            </div>
                            <span className="text-sm font-semibold text-[var(--text)]">Student Mind</span>
                        </div>
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-14">
                <div className="mb-10">
                    <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--indigo)' }}>Legal</p>
                    <h1 className="text-3xl font-black text-[var(--text)] tracking-tight">Privacy Policy</h1>
                    <p className="text-[var(--text-muted)] text-sm mt-2">Last updated: 23 February 2026 &nbsp;·&nbsp; Controller: Student Mind Operator</p>
                </div>

                <div className="rounded-2xl border p-6 mb-10" style={{ background: 'var(--indigo-soft)', borderColor: 'var(--indigo)' }}>
                    <p className="text-sm font-bold mb-1" style={{ color: 'var(--indigo)' }}>Your Privacy Matters</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--indigo)' }}>
                        We collect only the data needed to run the Service. We never sell your data. This policy explains what we collect, why, and how your data is protected under the UK General Data Protection Regulation ("UK GDPR") and the Data Protection Act 2018.
                    </p>
                </div>

                <div className="space-y-10 text-[15px] leading-relaxed text-[var(--text-sub)]">

                    {/* 1 – Who We Are */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">1. Who We Are (Data Controller)</h2>
                        <p>
                            Student Mind ("we", "us", "our") is the data controller for personal data processed through this Service. For data-related enquiries, contact us at{' '}
                            <a href="mailto:privacy@studentsurvivalos.app" className="text-indigo-600 underline">privacy@studentsurvivalos.app</a>.
                        </p>
                    </section>

                    {/* 2 – Data We Collect */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">2. Data We Collect and Why</h2>
                        <p className="mb-4">The table below lists every category of personal data we collect, its purpose, and the lawful basis for processing under UK GDPR Article 6.</p>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm border-collapse border border-[var(--border)] rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-[var(--bg-raised)] text-[var(--text-sub)]">
                                        <th className="text-left px-4 py-3 font-semibold border border-[var(--border)]">Data Category</th>
                                        <th className="text-left px-4 py-3 font-semibold border border-[var(--border)]">Purpose</th>
                                        <th className="text-left px-4 py-3 font-semibold border border-[var(--border)]">Lawful Basis</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[var(--border)]">
                                    {[
                                        ['Email address', 'Account creation, authentication, service and billing communications', 'Performance of a contract (Art. 6(1)(b))'],
                                        ['Full name (optional)', 'Personalised greetings within the app', 'Performance of a contract (Art. 6(1)(b))'],
                                        ['Visa expiry date', 'Power the visa countdown timer and automated reminders', 'Performance of a contract (Art. 6(1)(b))'],
                                        ['Weekly work hour limit', 'Calculate remaining hours and display progress indicator', 'Performance of a contract (Art. 6(1)(b))'],
                                        ['Work log entries (date, hours, notes)', 'Aggregate weekly totals and Safe Spend calculations', 'Performance of a contract (Art. 6(1)(b))'],
                                        ['Budget entries (income, expense categories)', 'Calculate remaining monthly balance and daily Safe Spend limit', 'Performance of a contract (Art. 6(1)(b))'],
                                        ['Academic deadlines, job applications, accommodation details', 'Display and manage personal tracker data', 'Performance of a contract (Art. 6(1)(b))'],
                                        ['Documents uploaded to Document Vault', 'Secure storage accessible only by you via Row Level Security', 'Performance of a contract (Art. 6(1)(b))'],
                                        ['AI chat messages and CV/resume text (Pro users)', 'Sent to Google Gemini API to generate AI responses. Processed in transit only — not stored by us permanently', 'Performance of a contract (Art. 6(1)(b))'],
                                        ['Stripe customer ID and subscription status', 'Manage Pro subscription, verify access to paid features', 'Performance of a contract (Art. 6(1)(b))'],
                                        ['Postcode entered in NHS Navigator', 'Processed client-side only to display GP search results. Not transmitted to or stored on our servers', 'Legitimate interests (Art. 6(1)(f))'],
                                        ['IP address and browser logs', 'Security monitoring and performance (via hosting provider)', 'Legitimate interests (Art. 6(1)(f))'],
                                        ['Dashboard layout preferences', 'Stored locally in your browser (localStorage). Never sent to our servers', 'Legitimate interests (Art. 6(1)(f))'],
                                        ['Onboarding completion status', 'Determine whether to show onboarding flow', 'Legitimate interests (Art. 6(1)(f)) — smooth user experience'],
                                        ['Anonymous usage analytics (if opted in)', 'Understand feature usage to improve the Service', 'Consent (Art. 6(1)(a))'],
                                    ].map(([category, purpose, basis], i) => (
                                        <tr key={i} className={i % 2 === 0 ? 'bg-[var(--bg-card)]' : 'bg-[var(--bg-raised)]'}>
                                            <td className="px-4 py-3 border border-[var(--border)] font-medium text-[var(--text)] align-top">{category}</td>
                                            <td className="px-4 py-3 border border-[var(--border)] text-[var(--text-sub)] align-top">{purpose}</td>
                                            <td className="px-4 py-3 border border-[var(--border)] text-[var(--text-sub)] align-top text-xs">{basis}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <p className="mt-4 text-sm text-[var(--text-muted)]">
                            We do <strong>not</strong> collect special category data (biometrics, health records) as defined under UK GDPR Article 9. We do not collect passport numbers, visa reference numbers, or UKVI case identifiers.
                        </p>
                    </section>

                    {/* 3 – AI Data Processing */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">3. AI Features & Data Processing</h2>
                        <div className="space-y-3">
                            <p><strong>3.1</strong> When you use AI features (AI Assistant, CV Writer, ATS Scanner, Interview Coach), the content you submit (messages, CV text, job descriptions) is transmitted to the <strong>Google Gemini API</strong> to generate responses. This transmission is encrypted in transit via TLS.</p>
                            <p><strong>3.2</strong> We do not permanently store AI conversation histories on our servers. Messages are held transiently in memory during a session to maintain context.</p>
                            <p><strong>3.3</strong> Google may process your content according to their own data policies. We strongly recommend you do not submit sensitive personal identifiers (passport numbers, NI numbers, bank details) through AI features.</p>
                            <p><strong>3.4</strong> AI-generated content is not reviewed by us. You are solely responsible for how you use, adapt, or submit AI-generated CVs, cover letters, or other documents to third parties.</p>
                        </div>
                    </section>

                    {/* 4 – Data Storage and Security */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">4. Data Storage and Security</h2>
                        <div className="space-y-3">
                            <p>
                                <strong>4.1 Storage Location.</strong> Your data is stored on Supabase, configured to use servers within the <strong>United Kingdom or the European Economic Area (EEA)</strong>.
                            </p>
                            <p>
                                <strong>4.2 Security Measures.</strong> We implement the following technical and organisational measures:
                            </p>
                            <ul className="list-disc ml-5 space-y-1">
                                <li>Data encryption in transit using TLS 1.2 or higher.</li>
                                <li>Data encryption at rest using AES-256.</li>
                                <li>Row Level Security (RLS) policies on all database tables — each user can only access their own data.</li>
                                <li>Authentication handled via Supabase Auth with secure, httpOnly session cookies.</li>
                                <li>Stripe Webhook signature verification to prevent fraudulent payment events.</li>
                                <li>Access to the production database is restricted to authorised contributors only.</li>
                                <li>All payment data is processed exclusively by Stripe using PCI-DSS-compliant infrastructure.</li>
                            </ul>
                            <p>
                                <strong>4.3 Data Breach.</strong> In the event of a personal data breach likely to result in a risk to your rights and freedoms, we will notify the ICO within 72 hours and notify you without undue delay where required.
                            </p>
                        </div>
                    </section>

                    {/* 5 – Retention */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">5. Data Retention</h2>
                        <p>
                            We retain your personal data only for as long as your account is active or as necessary to provide the Service. If you delete your account, we will delete or anonymise your personal data within <strong>30 days</strong>, except where retention is required by law (e.g. Stripe transaction records may be retained for 7 years under UK tax law).
                        </p>
                    </section>

                    {/* 6 – Data Sharing */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">6. Data Sharing and Sub-Processors</h2>
                        <div className="rounded-2xl border p-6 mb-6" style={{ background: 'var(--emerald-soft)', borderColor: 'var(--emerald)' }}>
                            <p className="font-bold text-sm" style={{ color: 'var(--emerald)' }}>We never sell, rent, or trade your personal data to any third party for marketing or commercial purposes.</p>
                        </div>
                        <p className="mb-3">We share your data only with the following sub-processors, strictly necessary to operate the Service:</p>
                        <div className="space-y-3">
                            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
                                <p className="font-semibold text-[var(--text)] text-sm">Supabase Inc. (Database & Authentication)</p>
                                <p className="text-[var(--text-sub)] text-sm mt-1">Provides the cloud database, authentication, and row-level security infrastructure. Processes your email, authentication tokens, and all User Content you enter. <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">Supabase Privacy Policy</a></p>
                            </div>
                            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
                                <p className="font-semibold text-[var(--text)] text-sm">Stripe, Inc. (Payment Processing)</p>
                                <p className="text-[var(--text-sub)] text-sm mt-1">Processes all subscription payments. Receives your email address and payment card details. We only store your Stripe Customer ID and subscription tier. <a href="https://stripe.com/gb/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">Stripe Privacy Policy</a></p>
                            </div>
                            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
                                <p className="font-semibold text-[var(--text)] text-sm">Google LLC (Gemini AI API)</p>
                                <p className="text-[var(--text-sub)] text-sm mt-1">Processes AI feature inputs (chat messages, CV text, job descriptions) to generate responses. Google processes this data solely to return AI responses. <a href="https://ai.google.dev/terms" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">Google AI Terms</a></p>
                            </div>
                            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
                                <p className="font-semibold text-[var(--text)] text-sm">Vercel Inc. (Hosting — if applicable)</p>
                                <p className="text-[var(--text-sub)] text-sm mt-1">May host the Next.js web application. Vercel processes HTTP request logs (IP addresses, user agents) temporarily for security and performance. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">Vercel Privacy Policy</a></p>
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-gray-500">
                            We do not share your data with law enforcement or government agencies except where legally required by a court order or applicable law.
                        </p>
                    </section>

                    {/* 7 – Cookies */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">7. Cookies & Local Storage</h2>
                        <p className="mb-2">
                            We use strictly necessary session cookies to maintain your authenticated session. These are required for the Service to function and cannot be opted out of.
                        </p>
                        <p>
                            Dashboard layout preferences are stored in your browser's <strong>localStorage</strong> — this data never leaves your device and is not transmitted to our servers. We do not use analytics, advertising, or tracking cookies unless you have given explicit consent.
                        </p>
                    </section>

                    {/* 8 – Your Rights */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">8. Your Rights Under UK GDPR</h2>
                        <p className="mb-4">As a data subject, you have the following rights. Contact us at <a href="mailto:privacy@studentsurvivalos.app" className="text-indigo-600 underline">privacy@studentsurvivalos.app</a>. We will respond within <strong>30 days</strong>.</p>
                        <div className="space-y-3">
                            {[
                                ['Right of Access (Art. 15)', 'Request a copy of all personal data we hold about you.'],
                                ['Right to Rectification (Art. 16)', 'Request correction of inaccurate or incomplete data. Most data can be corrected directly within the app.'],
                                ['Right to Erasure / Right to be Forgotten (Art. 17)', 'Request deletion of your personal data. You may also delete your account directly within app settings.'],
                                ['Right to Restriction of Processing (Art. 18)', 'Request that we limit how we use your data in certain circumstances.'],
                                ['Right to Data Portability (Art. 20)', 'Request a copy of your data in a structured, machine-readable format (JSON/CSV).'],
                                ['Right to Object (Art. 21)', 'Object to processing based on legitimate interests. You have an unconditional right to object to direct marketing.'],
                                ['Right to Withdraw Consent', 'Where processing is based on consent (e.g. analytics), you may withdraw consent at any time.'],
                                ['Right to Lodge a Complaint', 'If you believe we have handled your data unlawfully, you have the right to complain to the Information Commissioner\'s Office (ICO) at ico.org.uk.'],
                            ].map(([right, desc]) => (
                                <div key={right} className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
                                    <p className="font-semibold text-[var(--text)] text-sm">{right}</p>
                                    <p className="text-[var(--text-sub)] text-sm mt-1">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 9 – Children */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">9. Children</h2>
                        <p>
                            The Service is not directed at children under the age of 18. We do not knowingly collect personal data from anyone under 18. If you believe a child has provided us with personal data, please contact us and we will delete it promptly.
                        </p>
                    </section>

                    {/* 10 – International Transfers */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">10. International Data Transfers</h2>
                        <p>
                            We store your data within the UK or EEA. Where sub-processors (including Google Gemini API and Stripe) may transfer data outside the UK/EEA, we ensure adequate safeguards are in place (e.g. Standard Contractual Clauses approved by the ICO) before such transfers occur.
                        </p>
                    </section>

                    {/* 11 – Changes */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">11. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of material changes by email or in-app notice at least 14 days before they take effect. Continued use of the Service after the effective date constitutes acceptance of the updated Policy.
                        </p>
                    </section>

                    {/* 12 – Contact / DPO */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">12. Contact &amp; Data Protection Enquiries</h2>
                        <p>
                            For any enquiries about this Privacy Policy or to exercise your rights, please write to:{' '}
                            <a href="mailto:privacy@studentsurvivalos.app" className="hover:underline" style={{ color: 'var(--indigo)' }}>privacy@studentsurvivalos.app</a>
                        </p>
                        <p className="mt-2">
                            You also have the right to complain to the <strong>Information Commissioner's Office (ICO)</strong>:{' '}
                            <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: 'var(--indigo)' }}>ico.org.uk</a> · 0303 123 1113.
                        </p>
                    </section>

                </div>

                <div className="mt-14 pt-8 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                    <span>Student Mind · UK GDPR Compliant</span>
                    <Link href="/terms" className="hover:underline" style={{ color: 'var(--indigo)' }}>Terms of Service →</Link>
                </div>
            </main>
        </div>
    )
}
