import Link from 'next/link'
import { GraduationCap, ArrowLeft } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

export const metadata = {
    title: 'Terms of Service | Student Mind',
    description: 'Terms of Service for Student Mind — please read carefully before using the application.',
}

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
            {/* Nav */}
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
                    <h1 className="text-3xl font-black text-[var(--text)] tracking-tight">Terms of Service</h1>
                    <p className="text-[var(--text-muted)] text-sm mt-2">Last updated: 23 February 2026 &nbsp;·&nbsp; Governing law: England and Wales</p>
                </div>

                {/* ── WARNING BOX ─────────────────────────────────── */}
                <div className="rounded-2xl border p-6 mb-10" style={{ background: 'var(--amber-soft)', borderColor: 'var(--amber)' }}>
                    <p className="text-sm font-bold mb-1" style={{ color: 'var(--amber)' }}>⚠ Important — Please Read Before Using This Service</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--amber)' }}>
                        Student Mind is an organisational tool only. It does <strong>not</strong> constitute legal advice, immigration advice, or a substitute for consulting a qualified solicitor or regulated immigration adviser. Always verify information with official UK Government sources at <a href="https://www.gov.uk" target="_blank" rel="noopener noreferrer" className="underline">GOV.UK</a>.
                    </p>
                </div>

                <div className="space-y-10 text-[15px] leading-relaxed text-[var(--text-sub)]">

                    {/* 1 – Definitions */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">1. Definitions</h2>
                        <p>In these Terms:</p>
                        <ul className="list-disc ml-5 mt-2 space-y-1">
                            <li><strong>"Service"</strong> refers to the Student Mind web application accessible at the URL provided to you upon registration.</li>
                            <li><strong>"Operator" / "we" / "us"</strong> refers to the individual or entity operating Student Mind.</li>
                            <li><strong>"User" / "you"</strong> refers to any individual who creates an account and uses the Service.</li>
                            <li><strong>"User Content"</strong> means all data entered by you, including visa expiry dates, work log entries, and budget figures.</li>
                        </ul>
                    </section>

                    {/* 2 – Acceptance */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">2. Acceptance of Terms</h2>
                        <p>
                            By creating an account or using any part of the Service, you confirm that you have read, understood, and agree to be bound by these Terms. If you do not agree, you must not use the Service. You must be at least 18 years old to use the Service.
                        </p>
                    </section>

                    {/* 3 – Nature of Service */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">3. Nature of Service — Not Legal Advice</h2>
                        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-raised)] p-5 space-y-3">
                            <p>
                                <strong>3.1</strong> The Service provides digital tools to help users organise personal information relating to their UK visa status, part-time work hours, and budget. It is provided solely as an information management and organisational aid.
                            </p>
                            <p>
                                <strong>3.2</strong> The Service does <strong>not</strong> provide legal advice, immigration advice, tax advice, or financial advice of any kind. No information or output generated by the Service constitutes, or should be treated as, advice from a qualified legal or immigration professional.
                            </p>
                            <p>
                                <strong>3.3</strong> Compliance with UK Visas and Immigration ("UKVI") rules is solely the user's responsibility. You must independently verify all visa conditions, work hour limits, and compliance obligations by consulting official UK Government guidance at <a href="https://www.gov.uk/student-visa" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">GOV.UK</a> or a qualified immigration adviser regulated by the Office of the Immigration Services Commissioner ("OISC").
                            </p>
                            <p>
                                <strong>3.4</strong> The hour limits and reminders displayed by the Service are based solely on data you enter. The Operator does not verify, audit, or guarantee the accuracy of these calculations.
                            </p>
                        </div>
                    </section>

                    {/* 4 – User Responsibilities */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">4. User Responsibilities</h2>
                        <p className="mb-2">You agree that you are solely responsible for:</p>
                        <ul className="list-disc ml-5 space-y-2">
                            <li>Providing accurate, current, and complete information when registering and using the Service, including correct visa expiry dates and work log entries.</li>
                            <li>Updating your information promptly if it changes (for example, if your visa is extended or your course term dates change).</li>
                            <li>Understanding and complying with all conditions attached to your UK visa, including any restrictions on the number of hours you may work.</li>
                            <li>Independently verifying all information with UKVI or official sources before making any decisions based on data displayed by the Service.</li>
                            <li>Keeping your account credentials secure and immediately notifying us of any unauthorised access.</li>
                            <li>Ensuring that your use of the Service complies with all applicable UK laws and regulations.</li>
                        </ul>
                    </section>

                    {/* 5 – Acceptable Use */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">5. Acceptable Use</h2>
                        <p className="mb-2"><strong>5.1 Permitted Use.</strong> You may use the Service solely for your own personal, non-commercial purposes of tracking your visa status, work hours, and budget as a student in the United Kingdom.</p>
                        <p className="mb-2"><strong>5.2 Prohibited Use.</strong> You must not:</p>
                        <ul className="list-disc ml-5 space-y-1">
                            <li>Use the Service for any unlawful purpose or in any way that violates applicable law.</li>
                            <li>Attempt to gain unauthorised access to any part of the Service or another user's account.</li>
                            <li>Use automated means (bots, scrapers, crawlers) to access the Service without our prior written consent.</li>
                            <li>Upload, transmit, or distribute any content that is harmful, offensive, fraudulent, or infringes the rights of any third party.</li>
                            <li>Reverse engineer, decompile, or disassemble any part of the Service.</li>
                            <li>Use the Service to create a competing product or service.</li>
                            <li>Misrepresent your identity or affiliation with any person or organisation.</li>
                        </ul>
                    </section>

                    {/* 6 – Disclaimer of Warranties */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">6. Disclaimer of Warranties</h2>
                        <p>
                            The Service is provided on an <strong>"AS IS" and "AS AVAILABLE"</strong> basis without any warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, accuracy, reliability, or non-infringement. We do not warrant that the Service will be uninterrupted, error-free, or free from viruses or harmful components. We do not warrant that any information displayed is accurate, complete, or up to date.
                        </p>
                    </section>

                    {/* 7 – Limitation of Liability */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">7. Limitation of Liability</h2>
                        <div className="rounded-xl border border-[var(--red)]/20 p-5 space-y-3" style={{ background: 'var(--red-soft)' }}>
                            <p>
                                <strong>7.1</strong> To the maximum extent permitted by applicable law, the Operator shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of or inability to use the Service.
                            </p>
                            <p>
                                <strong>7.2 In particular, we expressly exclude all liability for:</strong>
                            </p>
                            <ul className="list-disc ml-5 space-y-1">
                                <li>Any breach of UK visa conditions or UKVI rules arising from your reliance on data displayed by the Service.</li>
                                <li>Any action taken (or not taken) by UKVI, the Home Office, or any other government authority in relation to your visa or immigration status.</li>
                                <li>Any loss of earnings, fines, penalties, deportation, visa curtailment, or other immigration consequences.</li>
                                <li>Any inaccuracy in the calculation of work hours or budget figures resulting from data you have entered.</li>
                                <li>Any failure to display a reminder or alert in a timely manner.</li>
                                <li>Any decisions made in reliance on information provided by the Service without independent verification from official sources.</li>
                            </ul>
                            <p>
                                <strong>7.3</strong> Nothing in these Terms limits or excludes our liability for death or personal injury caused by our negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded or limited under the laws of England and Wales.
                            </p>
                            <p>
                                <strong>7.4</strong> Where liability cannot be excluded, our aggregate liability to you shall not exceed £100 GBP or the total amount paid by you to us in the 12 months preceding the claim, whichever is greater.
                            </p>
                        </div>
                    </section>

                    {/* 8 – Third-Party Links */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">8. Third-Party Links and Resources</h2>
                        <p>
                            The Service may provide links to GOV.UK and other third-party websites for informational purposes. We have no control over, and accept no responsibility for, the content, privacy practices, or availability of those sites. The inclusion of a link does not imply our endorsement.
                        </p>
                    </section>

                    {/* 9 – Intellectual Property */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">9. Intellectual Property</h2>
                        <p>
                            All intellectual property rights in the Service (including its design, code, and content) are owned by the Operator. You are granted a limited, non-exclusive, revocable licence to use the Service for personal purposes in accordance with these Terms. You retain all rights to User Content you enter; by entering it, you grant us a limited licence to process it solely to provide the Service to you.
                        </p>
                    </section>

                    {/* 10 – Termination */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">10. Termination</h2>
                        <p>
                            We may suspend or terminate your account immediately and without prior notice if we believe you have violated these Terms. You may delete your account at any time by contacting us. Upon termination, your right to use the Service ceases immediately.
                        </p>
                    </section>

                    {/* 11 – Changes */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">11. Changes to These Terms</h2>
                        <p>
                            We may update these Terms from time to time. We will notify you of material changes by email or by displaying a prominent notice within the Service. Your continued use of the Service after the effective date of revised Terms constitutes your acceptance.
                        </p>
                    </section>

                    {/* 12 – Governing Law */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">12. Governing Law and Dispute Resolution</h2>
                        <p>
                            These Terms, and any dispute or claim arising out of or in connection with them or their subject matter (including non-contractual disputes), shall be governed by and construed in accordance with the laws of <strong>England and Wales</strong>. The courts of England and Wales shall have exclusive jurisdiction to settle any such dispute or claim.
                        </p>
                    </section>

                    {/* 13 – Contact */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">13. Contact</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at: <a href="mailto:legalstudentos@gmail.com" className="hover:underline" style={{ color: 'var(--indigo)' }}>legalstudentos@gmail.com</a>
                        </p>
                    </section>

                </div>

                <div className="mt-14 pt-8 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                    <span>Student Mind · England &amp; Wales</span>
                    <Link href="/privacy" className="hover:underline" style={{ color: 'var(--indigo)' }}>Privacy Policy →</Link>
                </div>
            </main>
        </div>
    )
}
