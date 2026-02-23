import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import {
  GraduationCap,
  Shield,
  Clock,
  PiggyBank,
  Newspaper,
  Bell,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

export default async function LandingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300 relative overflow-hidden">

      {/* Background Blobs */}
      <div className="blob w-[500px] h-[500px] -top-20 -left-20" style={{ background: 'var(--accent)', opacity: 0.15 }} />
      <div className="blob w-[600px] h-[600px] top-[40%] -right-40" style={{ background: 'var(--indigo)', opacity: 0.1 }} />
      <div className="blob w-[400px] h-[400px] bottom-0 left-[20%]" style={{ background: 'var(--rose)', opacity: 0.08 }} />

      {/* ─── NAVBAR ─────────────────────────────────────── */}
      <header className="navbar-glass sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
            <span className="font-semibold text-[var(--text)] text-sm tracking-tight">Student Mind</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-[13px] text-[var(--text-sub)]">
            <a href="#features" className="hover:text-[var(--text)] transition-colors font-medium">Features</a>
            <a href="#how" className="hover:text-[var(--text)] transition-colors font-medium">How it works</a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {user ? (
              <Link href="/dashboard" className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg btn-accent text-[13px] font-medium transition-colors">
                Dashboard <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <>
                <Link href="/login" className="px-3.5 py-1.5 rounded-lg text-[var(--text-sub)] hover:text-[var(--text)] text-[13px] font-medium transition-colors">
                  Sign In
                </Link>
                <Link href="/signup" className="px-3.5 py-1.5 rounded-lg btn-accent text-[13px] font-semibold transition-colors">
                  Start Free
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ─── HERO ────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text */}
          <div className="animate-fade-in-up">
            <span className="tag-pill mb-6 bg-[var(--bg-raised)] border border-[var(--border)] text-[var(--text-sub)] inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Built for UK international students
            </span>
            <h1 className="text-[3.2rem] leading-[1.08] font-black tracking-tight text-[var(--text)] mt-4 mb-5">
              Track your visa.<br />
              Log your hours.<br />
              <span className="bg-gradient-to-r from-[var(--accent)] via-[#ffa43a] to-[var(--rose)] bg-clip-text text-transparent">Stay in control.</span>
            </h1>
            <p className="text-[var(--text-sub)] text-base leading-relaxed mb-8 max-w-sm">
              Student Mind is the all-in-one dashboard that helps you manage your visa expiry, work hours, and budget — without the stress.
            </p>
            <div className="flex items-center gap-3">
              <Link href="/signup" className="flex items-center gap-2 px-6 py-3 rounded-xl btn-accent font-bold transition-all hover:scale-[1.02] glow-accent">
                Start Free <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#how" className="flex items-center gap-1.5 px-6 py-3 rounded-xl border border-[var(--border)] text-[var(--text-sub)] hover:text-[var(--text)] hover:bg-[var(--bg-raised)] text-sm font-medium transition-all">
                See How It Works
              </a>
            </div>
          </div>

          {/* Right: Dashboard UI preview */}
          <div className="relative animate-float pointer-events-none select-none">
            <div className="absolute inset-0 opacity-20 rounded-3xl blur-3xl" style={{ background: 'var(--accent)' }} />
            <div className="relative border border-[var(--border)] rounded-2xl overflow-hidden bg-[var(--bg-input)] shadow-2xl">
              {/* Header bar */}
              <div className="px-5 py-3.5 border-b border-[var(--border)] flex items-center gap-2 bg-[var(--bg-raised)]">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--red)] opacity-60" />
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--amber)] opacity-60" />
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--emerald)] opacity-60" />
                <div className="ml-3 flex-1 h-5 rounded-md text-[10px] text-[var(--text-muted)] flex items-center px-2 bg-[var(--bg-input)]">
                  student-survival-os.app/dashboard
                </div>
              </div>
              <div className="p-5 grid grid-cols-2 gap-3">
                {/* Visa card */}
                <div className="border border-[var(--border)] bg-[var(--bg-card)] rounded-xl p-4 glow-emerald">
                  <div className="text-[10px] text-[var(--text-muted)] font-medium uppercase tracking-widest mb-3">Visa Status</div>
                  <div className="flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center border-2 border-[var(--emerald)] bg-radial from-[var(--emerald-soft)] to-transparent">
                      <div className="text-center">
                        <div className="text-2xl font-black text-[var(--emerald)]">187</div>
                        <div className="text-[9px] text-[var(--text-muted)]">days</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-center text-[10px] font-bold py-0.5 rounded-full" style={{ background: 'var(--emerald-soft)', color: 'var(--emerald)' }}>Valid</div>
                </div>
                {/* Work hours card */}
                <div className="border border-[var(--border)] bg-[var(--bg-card)] rounded-xl p-4 glow-amber">
                  <div className="text-[10px] text-[var(--text-muted)] font-medium uppercase tracking-widest mb-3">Work Hours</div>
                  <div className="text-xl font-black text-[var(--text)] mb-1">14.5<span className="text-xs text-[var(--text-muted)] font-normal"> / 20h</span></div>
                  <div className="w-full h-1.5 rounded-full mb-2 bg-[var(--bg-input)]">
                    <div className="h-full rounded-full bg-gradient-to-r from-[var(--amber)] to-[#fbbf24]" style={{ width: '72%' }} />
                  </div>
                  <div className="text-[9px] text-[var(--amber)] font-medium">5.5h remaining</div>
                  <div className="mt-2.5 space-y-1">
                    {[['Mon', '4h'], ['Tue', '6h'], ['Wed', '4.5h']].map(([d, h]) => (
                      <div key={d} className="flex justify-between text-[9px] text-[var(--text-muted)]">
                        <span>{d}</span><span style={{ color: '#818cf8' }}>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Budget card – full width */}
                <div className="border border-[var(--border)] bg-[var(--bg-card)] rounded-xl p-4 col-span-2 glow-indigo">
                  <div className="text-[10px] text-[var(--text-muted)] font-medium uppercase tracking-widest mb-3">Budget — Feb 2026</div>
                  <div className="grid grid-cols-3 gap-2">
                    {[['Income', '£1,500', 'var(--emerald)', 'var(--emerald-soft)'],
                    ['Expenses', '£1,100', 'var(--red)', 'var(--red-soft)'],
                    ['Remaining', '£400', 'var(--indigo)', 'var(--indigo-soft)']].map(([l, v, c, bg]) => (
                      <div key={l} className="rounded-lg p-2.5 border border-[var(--border)]" style={{ background: bg }}>
                        <div className="text-[9px] font-bold" style={{ color: c }}>{l}</div>
                        <div className="text-sm font-bold text-[var(--text)]">{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ────────────────────────────────── */}
      <section id="how" className="max-w-6xl mx-auto px-6 py-24 border-t border-[var(--border)]">
        <div className="mb-16">
          <span className="tag-pill bg-[var(--bg-raised)] border border-[var(--border)] text-[var(--text-sub)] px-3 py-1 rounded-full text-xs font-semibold">How it works</span>
          <h2 className="text-3xl font-black text-[var(--text)] tracking-tight mt-3">Simple steps. Real results.</h2>
          <p className="text-[var(--text-sub)] text-sm mt-2 max-w-sm">Up and running in under 2 minutes. No complex setup.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { n: '01', t: 'Create account', d: 'Sign up with your email. No documents, no credit card. Takes 30 seconds.', icon: 'you@university.ac.uk' },
            { n: '02', t: 'Visa details', d: 'Tell us your visa expiry date and your weekly work hour limit (20h term-time).', icon: '2027-01-15' },
            { n: '03', t: 'Log your work', d: 'Add work shifts in seconds. Track monthly income and expenses by category.', icon: 'Mon, 23 Feb' },
            { n: '04', t: 'Get smart alerts', d: 'Reminders when your visa is near expiry or you\'re approaching your weekly limit.', icon: <Bell className="w-4 h-4" /> }
          ].map((s, i) => (
            <div key={i} className="border border-[var(--border)] bg-[var(--bg-card)] rounded-2xl p-6 relative overflow-hidden group hover:border-[var(--border-md)] transition-all">
              <div className="text-4xl font-black opacity-[0.03] absolute -top-1 -right-1 group-hover:scale-110 transition-transform select-none">
                {s.n}
              </div>
              <div className="text-[var(--indigo)] font-black text-xs uppercase tracking-widest mb-3">{s.n}</div>
              <h3 className="text-lg font-bold text-[var(--text)] mb-2">{s.t}</h3>
              <p className="text-[var(--text-sub)] text-sm leading-relaxed mb-6">{s.d}</p>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-raised)] p-3 shadow-inner">
                <div className="h-4 w-full bg-[var(--bg-input)] rounded mb-2 overflow-hidden">
                  <div className="h-full bg-[var(--accent)]" style={{ width: i === 0 ? '100%' : i === 1 ? '60%' : i === 2 ? '80%' : '30%' }} />
                </div>
                <div className="text-[10px] text-[var(--text-muted)] font-medium">{typeof s.icon === 'string' ? s.icon : 'Smart Alert Active'}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES ─────────────────────────────────────── */}
      <section id="features" className="py-24 px-6 border-t border-[var(--border)] bg-[var(--bg-raised)]/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="tag-pill bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-sub)] px-3 py-1 rounded-full text-xs font-semibold">Features</span>
            <h2 className="text-3xl font-black text-[var(--text)] tracking-tight mt-3">Why choose Student Mind</h2>
            <p className="text-[var(--text-sub)] text-sm mt-2">Because staying compliant should be as simple as using an app.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Shield, color: 'var(--emerald)', bg: 'var(--emerald-soft)', title: 'Visa Countdown', desc: 'Colour-coded circular countdown. Alerts at 90, 60, and 30 days before expiry.' },
              { icon: Clock, color: 'var(--indigo)', bg: 'var(--indigo-soft)', title: 'Work Hour Log', desc: 'Log shifts in seconds. See your weekly total vs. legal limit with a live progress bar.' },
              { icon: PiggyBank, color: 'var(--red)', bg: 'var(--red-soft)', title: 'Budget Planner', desc: 'Set income, track rent/food/transport. Know your remaining balance every month.' },
              { icon: Bell, color: 'var(--amber)', bg: 'var(--amber-soft)', title: 'Smart Reminders', desc: 'Automatic banner alerts for visa and work hour thresholds. Stay compliant passively.' },
              { icon: Newspaper, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', title: 'GOV.UK Resources', desc: 'Curated links to visa checks, renewal guides, NMW rates, and regulated advisors.' },
              { icon: CheckCircle2, color: '#a855f7', bg: 'rgba(168,85,247,0.1)', title: 'Personalised Setup', desc: 'Your visa date, your work limit, your rules. Onboarding takes 60 seconds.' },
            ].map(({ icon: Icon, color, bg, title, desc }) => (
              <div key={title} className="border border-[var(--border)] bg-[var(--bg-card)] rounded-2xl p-6 group hover:shadow-xl transition-all">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105" style={{ background: bg }}>
                  <Icon className="w-6 h-6" style={{ color: color }} />
                </div>
                <h3 className="font-bold text-[var(--text)] text-sm mb-2">{title}</h3>
                <p className="text-[var(--text-sub)] text-[13px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────── */}
      <section className="py-28 px-6 border-t border-[var(--border)]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-pulse-ring" style={{ background: 'var(--accent)' }}>
            <GraduationCap className="w-8 h-8" style={{ color: 'var(--accent-fg)' }} />
          </div>
          <h2 className="text-4xl font-black text-[var(--text)] tracking-tight mb-4">
            Ready to take control?
          </h2>
          <p className="text-[var(--text-sub)] text-base mb-10 max-w-sm mx-auto leading-relaxed">
            Join international students across the UK who use Student Mind to stay organised and compliant.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="flex items-center gap-2 px-8 py-4 rounded-xl btn-accent font-bold transition-all hover:scale-[1.05] shadow-lg shadow-[var(--accent)]/20">
              Create Free Account <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link href="/login" className="flex items-center gap-2 px-8 py-4 rounded-xl border border-[var(--border)] text-[var(--text-sub)] hover:text-[var(--text)] hover:bg-[var(--bg-card)] font-semibold transition-all">
              Sign In
            </Link>
          </div>
          <p className="text-[var(--text-muted)] text-xs mt-8">Free to use · UK GDPR Compliant · 2-minute setup</p>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────── */}
      <footer className="border-t border-[var(--border)] py-12 px-6 bg-[var(--bg-raised)]/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2.5 mb-4 md:mb-0">
            <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain" />
            <span className="font-bold text-[var(--text)] text-sm">Student Mind</span>
          </div>
          <div className="flex items-center gap-8 text-[var(--text-muted)] text-xs font-medium">
            <Link href="/terms" className="hover:text-[var(--text)] transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-[var(--text)] transition-colors">Privacy Policy</Link>
            <a href="mailto:support@studentsurvivalos.app" className="hover:text-[var(--text)] transition-colors">Support</a>
          </div>
          <p className="text-[var(--text-muted)] text-xs">© 2026 Student Mind. Built for Students.</p>
        </div>
      </footer>

    </div>
  )
}
