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

                <div className="rounded-2xl border p-6 mb-10" style={{ background: 'var(--amber-soft)', borderColor: 'var(--amber)' }}>
                    <p className="text-sm font-bold mb-1" style={{ color: 'var(--amber)' }}>⚠ Important — Please Read Before Using This Service</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--amber)' }}>
                        Student Mind is an organisational and informational tool only. It does <strong>not</strong> constitute legal advice, immigration advice, medical advice, financial advice, or a substitute for consulting a qualified professional. Always verify information with official sources such as <a href="https://www.gov.uk" target="_blank" rel="noopener noreferrer" className="underline">GOV.UK</a> and <a href="https://www.nhs.uk" target="_blank" rel="noopener noreferrer" className="underline">NHS.UK</a>.
                    </p>
                </div>

                <div className="space-y-10 text-[15px] leading-relaxed text-[var(--text-sub)]">

                    {/* 1 – Definitions */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">1. Definitions</h2>
                        <p>In these Terms:</p>
                        <ul className="list-disc ml-5 mt-2 space-y-1">
                            <li><strong>"Service"</strong> refers to the Student Mind web application and all its features, accessible at the URL provided upon registration.</li>
                            <li><strong>"Operator" / "we" / "us"</strong> refers to the individual or entity operating Student Mind.</li>
                            <li><strong>"User" / "you"</strong> refers to any individual who creates an account and uses the Service.</li>
                            <li><strong>"Free Tier"</strong> means the basic plan with limited feature access provided at no cost.</li>
                            <li><strong>"Pro Tier"</strong> means the paid subscription plan providing access to all premium features.</li>
                            <li><strong>"AI Features"</strong> means any features powered by the Google Gemini API, including the AI Assistant, AI CV Writer, Resume ATS Scanner, and AI Interview Coach.</li>
                            <li><strong>"User Content"</strong> means all data entered by you, including visa dates, work logs, budget figures, CV text, job descriptions, and documents.</li>
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
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">3. Nature of Service & Feature Scope</h2>
                        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-raised)] p-5 space-y-3">
                            <p><strong>3.1 Core Tools (Free & Pro).</strong> The Service provides digital tools including: Visa Countdown, Work Hour Log (with UK 20-hour weekly limit tracking), Budget Planner, Academic Deadlines Tracker, Job Application Tracker, Document Vault, Cultural Guide, Local Resources Hub, Accommodation Manager, and a daily Safe Spend calculator.</p>
                            <p><strong>3.2 Pro-Only AI Features.</strong> Pro subscribers gain access to the AI Survival Assistant (a chatbot powered by Google Gemini), the AI CV & Cover Letter Writer, the Resume ATS Scanner, and the AI Interview Mock Coach. These features use third-party AI and <strong>do not constitute career advice from a qualified careers counsellor</strong>.</p>
                            <p><strong>3.3 Council Tax Helper.</strong> The Council Tax Exemption Helper provides general guidance on student council tax exemption eligibility. This is an informational tool only and does <strong>not</strong> guarantee any legal outcome. You must independently verify your eligibility and submit the correct documentation to your local council.</p>
                            <p><strong>3.4 NHS & GP Navigator.</strong> The NHS Navigator provides links to NHS resources and a postcode-based GP surgery search for general guidance. This is an informational tool only and does <strong>not</strong> constitute medical advice. Always consult a qualified medical professional for health concerns. In an emergency, call 999.</p>
                            <p><strong>3.5 Visa & Immigration Tools.</strong> Visa countdown reminders and work hour limits are calculated solely from data you enter. The Operator does not verify, audit, or guarantee accuracy. Compliance with UKVI rules is solely your responsibility.</p>
                            <p><strong>3.6 AI Content Disclaimer.</strong> AI-generated content (cover letters, interview feedback, chat responses) may be inaccurate, incomplete, or outdated. You must review all AI output critically before acting on it. We accept no liability for losses arising from reliance on AI-generated content.</p>
                        </div>
                    </section>

                    {/* 4 – Subscriptions & Payments */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">4. Subscriptions & Payments</h2>
                        <div className="space-y-3">
                            <p><strong>4.1 Free Tier.</strong> Access to core features is provided free of charge. We reserve the right to modify the features included in the Free Tier at any time with reasonable notice.</p>
                            <p><strong>4.2 Pro Subscription.</strong> Access to Pro features requires a paid subscription processed through Stripe, Inc. By subscribing, you agree to Stripe's <a href="https://stripe.com/gb/legal/ssa" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">Terms of Service</a>. Pricing is displayed on the Pricing page at the time of purchase.</p>
                            <p><strong>4.3 Billing.</strong> Subscriptions are billed on the frequency stated at checkout. Payments are non-refundable unless required by applicable law (including the Consumer Rights Act 2015 for UK consumers).</p>
                            <p><strong>4.4 Cancellation.</strong> You may cancel your subscription at any time via your account settings. Upon cancellation, your Pro access will continue until the end of the current billing period.</p>
                            <p><strong>4.5 Payment Data.</strong> We do not store your full credit card details. All payment processing is handled by Stripe using PCI-DSS-compliant infrastructure.</p>
                        </div>
                    </section>

                    {/* 5 – User Responsibilities */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">5. User Responsibilities</h2>
                        <p className="mb-2">You agree that you are solely responsible for:</p>
                        <ul className="list-disc ml-5 space-y-2">
                            <li>Providing accurate, current, and complete information, including visa dates, hours worked, and other personal data.</li>
                            <li>Reviewing and verifying all AI-generated content (CV drafts, interview feedback, chat responses) before relying on it.</li>
                            <li>Filing the correct council tax exemption documents with your local authority, based on your individual circumstances.</li>
                            <li>Registering with a GP and seeking appropriate medical care independently of any NHS Navigator guidance.</li>
                            <li>Complying with all UK visa conditions, including work hour restrictions.</li>
                            <li>Keeping your account credentials secure and notifying us immediately of any unauthorised access.</li>
                            <li>Ensuring your use of the Service complies with all applicable UK laws and regulations.</li>
                        </ul>
                    </section>

                    {/* 6 – Acceptable Use */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">6. Acceptable Use</h2>
                        <p className="mb-2"><strong>6.1 Permitted Use.</strong> You may use the Service solely for your own personal, non-commercial purposes as a student in the United Kingdom.</p>
                        <p className="mb-2"><strong>6.2 Prohibited Use.</strong> You must not:</p>
                        <ul className="list-disc ml-5 space-y-1">
                            <li>Submit false, misleading, or fraudulent content to any feature, including AI tools.</li>
                            <li>Use AI features to generate fraudulent CVs, covering letters, or other documents intended to deceive third parties.</li>
                            <li>Upload documents to the Document Vault that contain malware, illegal content, or content infringing third-party rights.</li>
                            <li>Use the Service for any unlawful purpose or in any way that violates applicable law.</li>
                            <li>Attempt to gain unauthorised access to any part of the Service or another user's account.</li>
                            <li>Use automated means (bots, scrapers, crawlers) to access the Service without our prior written consent.</li>
                            <li>Reverse engineer, decompile, or disassemble any part of the Service.</li>
                            <li>Use the Service to create a competing product or service.</li>
                        </ul>
                    </section>

                    {/* 7 – Disclaimer of Warranties */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">7. Disclaimer of Warranties</h2>
                        <p>
                            The Service is provided on an <strong>"AS IS" and "AS AVAILABLE"</strong> basis without any warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, accuracy, reliability, or non-infringement. We do not warrant that the Service will be uninterrupted, error-free, or free from viruses. We do not warrant the accuracy of AI-generated content, GP search results, council tax guidance, or any other informational output.
                        </p>
                    </section>

                    {/* 8 – Limitation of Liability */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">8. Limitation of Liability</h2>
                        <div className="rounded-xl border border-[var(--red)]/20 p-5 space-y-3" style={{ background: 'var(--red-soft)' }}>
                            <p><strong>8.1</strong> To the maximum extent permitted by applicable law, the Operator shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of, or inability to use, the Service.</p>
                            <p><strong>8.2 We expressly exclude all liability for:</strong></p>
                            <ul className="list-disc ml-5 space-y-1">
                                <li>Any breach of UK visa conditions arising from reliance on Service data.</li>
                                <li>Any immigration consequences (curtailment, deportation, refusal) resulting from use of the Service.</li>
                                <li>Any loss of income, employment, or career opportunity arising from reliance on AI-generated CVs, cover letters, or interview feedback.</li>
                                <li>Any council tax penalties, arrears, or disputes arising from reliance on the Council Tax Helper tool.</li>
                                <li>Any harm resulting from delayed or inappropriate medical care based on NHS Navigator information.</li>
                                <li>Any financial loss resulting from reliance on the Budget Planner or Safe Spend calculator.</li>
                                <li>Any decisions made without independent verification from official sources.</li>
                            </ul>
                            <p><strong>8.3</strong> Nothing in these Terms limits our liability for death or personal injury caused by our negligence, fraud, or any other liability that cannot be excluded under English law.</p>
                            <p><strong>8.4</strong> Where liability cannot be excluded, our aggregate liability shall not exceed £100 GBP or the total amount paid by you in the 12 months preceding the claim, whichever is greater.</p>
                        </div>
                    </section>

                    {/* 9 – Third-Party Services */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">9. Third-Party Services</h2>
                        <p className="mb-2">The Service integrates with the following third-party providers. By using the corresponding features, you agree to their respective terms:</p>
                        <ul className="list-disc ml-5 space-y-2">
                            <li><strong>Google Gemini API (AI Features):</strong> AI content is generated by Google. <a href="https://ai.google.dev/terms" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">Google AI Terms</a></li>
                            <li><strong>Stripe, Inc. (Payments):</strong> All payment processing. <a href="https://stripe.com/gb/legal" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">Stripe Legal</a></li>
                            <li><strong>Supabase, Inc. (Database & Auth):</strong> Data storage and authentication. <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">Supabase Privacy</a></li>
                            <li><strong>NHS (GP Navigator):</strong> External links to NHS official resources. We have no control over NHS websites.</li>
                        </ul>
                        <p className="mt-3">We accept no responsibility for the availability, security, or content of these third-party services.</p>
                    </section>

                    {/* 10 – Intellectual Property */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">10. Intellectual Property</h2>
                        <p>
                            All intellectual property rights in the Service (design, code, content) are owned by the Operator. You are granted a limited, non-exclusive, revocable licence to use the Service for personal purposes. You retain all rights to User Content you enter. By submitting content to AI features, you grant us a limited licence to process it via third-party AI APIs solely to provide the Service to you.
                        </p>
                    </section>

                    {/* 11 – Termination */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">11. Termination</h2>
                        <p>
                            We may suspend or terminate your account immediately and without prior notice if we believe you have violated these Terms, including misuse of AI features or submission of fraudulent content. You may delete your account at any time via Settings. Upon termination, your right to use the Service ceases immediately and Pro subscription benefits are forfeited without refund (unless required by law).
                        </p>
                    </section>

                    {/* 12 – Changes */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">12. Changes to These Terms</h2>
                        <p>
                            We may update these Terms from time to time. We will notify you of material changes by email or by displaying a prominent notice within the Service. Your continued use of the Service after the effective date of revised Terms constitutes your acceptance.
                        </p>
                    </section>

                    {/* 13 – Governing Law */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">13. Governing Law and Dispute Resolution</h2>
                        <p>
                            These Terms, and any dispute or claim arising out of or in connection with them (including non-contractual disputes), shall be governed by and construed in accordance with the laws of <strong>England and Wales</strong>. The courts of England and Wales shall have exclusive jurisdiction to settle any dispute.
                        </p>
                    </section>

                    {/* 14 – Contact */}
                    <section>
                        <h2 className="text-lg font-bold text-[var(--text)] mb-3">14. Contact</h2>
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
