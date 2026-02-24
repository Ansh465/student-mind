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
  Briefcase,
  ShieldCheck,
  Languages,
  FileCheck,
  Home,
  Target,
  ClipboardList,
  Sparkles,
  Settings2,
  LayoutDashboard,
  Bot,
  Train,
  Utensils,
  Wallet,
  Wand2,
  FileSearch,
  Users,
  Mic,
  Tag,
  Activity
} from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

export default async function LandingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-500 relative overflow-hidden font-sans">

      {/* ─── AMBIENT BACKGROUND ────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="blob w-[800px] h-[800px] -top-1/4 -left-1/4 animate-slow-float" style={{ background: 'var(--accent)', opacity: 0.12, filter: 'blur(120px)' }} />
        <div className="blob w-[700px] h-[700px] top-[30%] -right-1/4 animate-slow-float-delayed" style={{ background: 'var(--indigo)', opacity: 0.08, filter: 'blur(100px)' }} />
        <div className="blob w-[500px] h-[500px] -bottom-1/4 left-[10%]" style={{ background: 'var(--rose)', opacity: 0.06, filter: 'blur(80px)' }} />
      </div>

      {/* ─── NAVBAR ─────────────────────────────────────── */}
      <header className="navbar-glass sticky top-0 z-50 border-b border-[var(--border)]/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 group cursor-default">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 shadow-lg shadow-[var(--accent)]/20" style={{ background: 'var(--accent)' }}>
              <GraduationCap className="w-5 h-5" style={{ color: 'var(--accent-fg)' }} />
            </div>
            <span className="font-bold text-[var(--text)] text-lg tracking-tight">Student Mind</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-[13.5px] text-[var(--text-sub)]">
            <a href="#features" className="hover:text-[var(--accent)] transition-colors font-semibold">Features</a>
            <a href="#how" className="hover:text-[var(--accent)] transition-colors font-semibold">Process</a>
            <a href="#ecosystem" className="hover:text-[var(--accent)] transition-colors font-semibold">Ecosystem</a>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <Link href="/dashboard" className="flex items-center gap-2 px-5 py-2 rounded-xl btn-accent text-[14px] font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
                Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="hidden sm:block px-4 py-2 rounded-lg text-[var(--text-sub)] hover:text-[var(--text)] hover:bg-[var(--bg-raised)] text-[14px] font-semibold transition-all">
                  Log In
                </Link>
                <Link href="/signup" className="flex items-center gap-1.5 px-5 py-2 rounded-xl btn-accent text-[14px] font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 glow-accent">
                  Join Free
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ─── HERO ────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Content */}
          <div className="animate-fade-in-up-extended">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/20 text-[var(--accent)] text-xs font-bold leading-none mb-8 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Empowering International Students
            </div>
            <h1 className="text-[3.5rem] sm:text-[4.2rem] leading-[1.04] font-black tracking-tight text-[var(--text)] mb-8">
              Success in the UK, <br />
              <span className="bg-gradient-to-r from-[var(--accent)] via-[#ffa43a] to-[var(--rose)] bg-clip-text text-transparent">Reimagined.</span>
            </h1>
            <p className="text-[var(--text-sub)] text-lg leading-relaxed mb-10 max-w-lg">
              The only all-in-one OS for international student life. Take control of your visa compliance, track multiple jobs, manage academic goals, and unlock UK life hacks—built to thrive, not just survive.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {user ? (
                <Link href="/dashboard" className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl btn-accent text-base font-black transition-all hover:scale-[1.03] shadow-xl shadow-[var(--accent)]/20 glow-accent">
                  Go to Dashboard <ArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <Link href="/signup" className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl btn-accent text-base font-black transition-all hover:scale-[1.03] shadow-xl shadow-[var(--accent)]/20 glow-accent">
                  Get Started Now <ArrowRight className="w-5 h-5" />
                </Link>
              )}
              <a href="#features" className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-[var(--border)] text-[var(--text-sub)] hover:text-[var(--text)] hover:bg-[var(--bg-raised)] text-sm font-bold transition-all">
                Explore Features
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6 border-t border-[var(--border)]/50 pt-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[var(--bg)] bg-[var(--bg-raised)] flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-rose-400 opacity-60" />
                  </div>
                ))}
              </div>
              <p className="text-[var(--text-muted)] text-sm font-medium">
                Joined by <span className="text-[var(--text)] font-bold">Number of</span> ambitious students across the UK.
              </p>
            </div>
          </div>

          {/* Right: Premium Mockup */}
          <div className="relative animate-float-extended pt-10 lg:pt-0">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--accent)]/20 via-transparent to-[var(--indigo)]/20 rounded-[3rem] blur-3xl opacity-50" />

            <div className="relative border border-[var(--border)] rounded-[2.5rem] bg-[var(--bg-card)] shadow-2xl overflow-hidden glass">
              {/* Browser Bar */}
              <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between bg-[var(--bg-raised)]/80 backdrop-blur-md">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="bg-[var(--bg-input)] h-6 px-4 rounded-lg flex items-center text-[10px] text-[var(--text-muted)] font-medium border border-[var(--border)]">
                  studentmind.io/dashboard
                </div>
                <div className="w-12 h-1 rounded-full bg-[var(--border)]" />
              </div>

              {/* Mockup Dashboard Content */}
              <div className="p-6 grid grid-cols-2 gap-4">
                {/* AI Assistant Mock */}
                <div className="col-span-2 border border-[var(--border)] bg-[var(--bg-raised)] rounded-2xl p-4 shadow-sm group hover:scale-[1.01] transition-transform duration-300">
                  <div className="flex items-center justify-between mb-3 leading-none">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-emerald-500" />
                      <span className="text-[10px] font-black uppercase tracking-wider text-[var(--text-sub)]">Survival AI</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[9px] text-emerald-500/90 font-bold uppercase tracking-widest">Active Sim</span>
                    </div>
                  </div>
                  <div className="bg-[var(--accent)] text-white text-[11px] font-bold p-2.5 rounded-xl rounded-tr-none w-[85%] ml-auto mb-2 shadow-sm">
                    How many hours can I work on a Student Visa during term time?
                  </div>
                  <div className="bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] text-[11px] leading-relaxed font-medium p-2.5 rounded-xl rounded-tl-none w-[90%] shadow-sm">
                    You can work a maximum of 20 hours per week during official term time...
                  </div>
                </div>

                {/* Job Tracker Mock */}
                <div className="border border-[var(--border)] bg-[var(--bg-card)] rounded-2xl p-4 shadow-sm group">
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Job Tracker</span>
                  </div>
                  <div className="space-y-2.5 mt-1">
                    <div className="flex items-center justify-between text-[11px] font-bold border-b border-[var(--border)] pb-2.5">
                      <span className="text-[var(--text)] text-[12px]">Tech Intern</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-500 uppercase tracking-wider font-black">Applied</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-[var(--text)] text-[12px]">Store Asst</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 uppercase tracking-wider font-black">Interview</span>
                    </div>
                  </div>
                </div>

                {/* Visa Pulse Mock */}
                <div className="border border-[var(--border)] bg-[var(--bg-card)] rounded-2xl p-4 shadow-sm group">
                  <div className="flex items-center gap-2 mb-3 leading-none">
                    <Shield className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Visa Pulse</span>
                  </div>
                  <div className="text-[2rem] leading-[1] font-black text-[var(--text)] mb-2 mt-2">
                    84 <span className="text-xs text-[var(--text-muted)] tracking-wider uppercase font-bold">Days Left</span>
                  </div>
                  <div className="text-[9px] font-black text-rose-500 px-2 py-0.5 max-w-fit bg-rose-500/10 rounded-md uppercase tracking-widest mt-1">
                    Action Required
                  </div>
                </div>

                {/* Bottom Stats Grid */}
                <div className="col-span-2 grid grid-cols-3 gap-3">
                  {[
                    { label: 'Work', val: '14.5/20h', col: 'text-amber-500', bg: 'bg-amber-500/10' },
                    { label: 'Visa', val: '84 Days', col: 'text-rose-500', bg: 'bg-rose-500/10' },
                    { label: 'Earnings', val: '£245.50', col: 'text-emerald-500', bg: 'bg-emerald-500/10' }
                  ].map(st => (
                    <div key={st.label} className={`p-2.5 rounded-xl border border-[var(--border)] ${st.bg} flex flex-col gap-0.5`}>
                      <span className="text-[8px] font-bold text-[var(--text-muted)] uppercase tracking-tight">{st.label}</span>
                      <span className={`text-[12px] font-black ${st.col}`}>{st.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Decorative Bar */}
              <div className="h-10 bg-[var(--bg-raised)]/50 flex items-center px-6 gap-4 border-t border-[var(--border)]">
                <LayoutDashboard className="w-4 h-4 text-[var(--accent)]" />
                <Newspaper className="w-4 h-4 text-[var(--text-muted)]" />
                <Settings2 className="w-4 h-4 text-[var(--text-muted)]" />
                <div className="flex-1" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--accent)] to-[var(--indigo)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROCESS / STRATEGY ─────────────────────────── */}
      <section id="how" className="max-w-6xl mx-auto px-6 py-24 border-t border-[var(--border)]">
        <div className="text-center mb-20 animate-fade-in">
          <span className="px-3.5 py-1.5 rounded-full bg-[var(--bg-raised)] border border-[var(--border)] text-[var(--text-sub)] text-xs font-bold uppercase tracking-widest">Process</span>
          <h2 className="text-4xl font-black text-[var(--text)] tracking-tight mt-6">Optimized for Simplicity.</h2>
          <p className="text-[var(--text-sub)] text-base mt-4 max-w-lg mx-auto leading-relaxed">Everything you need to navigate UK student life, organized into four specialized power-modes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { n: '01', t: 'Compliance First', d: 'Set your visa expiry and weekly limits. We handle the countdown so you never miss a legal threshold.', icon: ShieldCheck, color: 'text-emerald-500' },
            { n: '02', t: 'Earnings Engine', d: 'Track multiple part-time jobs and pay rates with automated weekly earning estimations.', icon: PiggyBank, color: 'text-amber-500' },
            { n: '03', t: 'Career Command', d: 'Centralize your job applications and deadlines. Stay reactive to interview invites and follow-ups.', icon: Briefcase, color: 'text-indigo-500' },
            { n: '04', t: 'Admin Assistant', d: 'Master the UK Bureaucracy. Complete your GP, NI Number, and BRP registration via curated checklists.', icon: ClipboardList, color: 'text-[var(--accent)]' }
          ].map((s, i) => (
            <div key={i} className="relative group p-8 rounded-[2rem] border border-[var(--border)] bg-[var(--bg-card)] hover:bg-[var(--bg-raised)] transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--accent)]/5 hover:-translate-y-2 overflow-hidden">
              <div className="absolute -top-4 -right-4 text-9xl font-black text-[var(--text)]/5 group-hover:scale-110 transition-transform duration-700 pointer-events-none">{s.n}</div>
              <div className={`w-12 h-12 rounded-2xl ${s.color} bg-current/10 flex items-center justify-center mb-6`}>
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text)] mb-3">{s.t}</h3>
              <p className="text-[var(--text-sub)] text-[15px] leading-relaxed mb-8">{s.d}</p>
              <div className="h-1.5 w-full bg-[var(--bg-input)] rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r from-[var(--indigo)] to-[var(--rose)]`} style={{ width: i === 0 ? '100%' : i === 1 ? '75%' : i === 2 ? '50%' : '25%' }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ECOSYSTEM HIGHLIGHTS ────────────────────────── */}
      <section id="ecosystem" className="py-24 px-6 border-t border-[var(--border)] bg-[var(--bg-raised)]/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-[2rem] border border-[var(--border)] bg-[var(--bg-card)] aspect-square flex flex-col justify-between group hover:border-[var(--accent)] transition-all overflow-hidden shrink-0">
                <LayoutDashboard className="w-8 h-8 text-[var(--accent)] group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="font-bold text-lg mb-1 leading-tight text-[var(--text)]">Dashboard Editor</h4>
                  <p className="text-xs text-[var(--text-muted)] line-clamp-2">Reorder components with drag & drop reordering.</p>
                </div>
              </div>
              <div className="p-6 rounded-[2rem] border border-[var(--border)] bg-[var(--bg-card)] aspect-square flex flex-col justify-between mt-8 group hover:border-emerald-500 transition-all overflow-hidden shrink-0">
                <Newspaper className="w-8 h-8 text-emerald-500 group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="font-bold text-lg mb-1 leading-tight text-[var(--text)]">Resource Hub</h4>
                  <p className="text-xs text-[var(--text-muted)] line-clamp-2">Official GOV.UK news and life-hacks for the UK.</p>
                </div>
              </div>
              <div className="p-6 rounded-[2rem] border border-[var(--border)] bg-[var(--bg-card)] aspect-square flex flex-col justify-between group hover:border-amber-500 transition-all overflow-hidden shrink-0">
                <Settings2 className="w-8 h-8 text-amber-500 group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="font-bold text-lg mb-1 leading-tight text-[var(--text)]">Settings Hub</h4>
                  <p className="text-xs text-[var(--text-muted)] line-clamp-2">Centralized controls for your entire digital OS.</p>
                </div>
              </div>
              <div className="p-6 rounded-[2rem] border border-[var(--border)] bg-[var(--bg-card)] aspect-square flex flex-col justify-between mt-8 group hover:border-rose-500 transition-all overflow-hidden shrink-0">
                <Target className="w-8 h-8 text-rose-500 group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="font-bold text-lg mb-1 leading-tight text-[var(--text)]">Goal Tracker</h4>
                  <p className="text-xs text-[var(--text-muted)] line-clamp-2">Academic deadline priority with live countdowns.</p>
                </div>
              </div>
            </div>

            <div className="animate-fade-in-right">
              <span className="tag-pill bg-[var(--accent-soft)] text-[var(--accent)] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">Ecosystem</span>
              <h2 className="text-[3rem] leading-[1.1] font-black text-[var(--text)] tracking-tight mt-6 mb-8">Personalized to your unique path.</h2>
              <p className="text-[var(--text-sub)] text-lg leading-relaxed mb-8">
                Your needs change as you move through your studies. Our modular dashboard adapts with you. Use the Dashboard Customizer to toggle features you need and hide what you don't.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Drag and drop reordering for tiles',
                  'One-click visibility toggles',
                  'Theme-aware visuals (Light/Dark)',
                  'Centralized profile management'
                ].map(t => (
                  <li key={t} className="flex items-center gap-3 font-semibold text-[var(--text)]">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    {t}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="inline-flex items-center gap-2 group text-[var(--accent)] font-bold text-lg transition-all hover:gap-4">
                Build your OS now <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES GRID ──────────────────────────────── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-[var(--text)] tracking-tight mb-4">Every Tool. One Destination.</h2>
            <p className="text-[var(--text-sub)] font-medium max-w-lg mx-auto leading-relaxed">The Student Mind ecosystem covers every pillar of international student success.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Shield, col: 'text-emerald-500', bg: 'bg-emerald-500/10', t: 'Visa Pulse', d: '90, 60, 30-day countdown triggers.' },
              { icon: Wallet, col: 'text-sky-500', bg: 'bg-sky-500/10', t: 'Daily Safe Spend', d: 'Pacing your budget mathematically.' },
              { icon: Activity, col: 'text-rose-500', bg: 'bg-rose-500/10', t: 'NHS Navigator', d: 'Find care and HC2 certificates.' },
              { icon: ShieldCheck, col: 'text-amber-500', bg: 'bg-amber-500/10', t: 'Document Vault', d: 'Secure storage & expiry alerts.' },
              { icon: PiggyBank, col: 'text-emerald-500', bg: 'bg-emerald-500/10', t: 'Budget Planner', d: 'Track rent, groceries, and savings.' },
              { icon: Tag, col: 'text-indigo-500', bg: 'bg-indigo-500/10', t: 'Discount Tracker', d: 'Unidays, Totum & grocery deals.' },
              { icon: Train, col: 'text-amber-500', bg: 'bg-amber-500/10', t: 'Railcard Manager', d: 'Track expiry and journey savings.' },
              { icon: Users, col: 'text-purple-500', bg: 'bg-purple-500/10', t: 'Networking CRM', d: 'Manage coffee chats & contacts.' },
              { icon: Utensils, col: 'text-orange-500', bg: 'bg-orange-500/10', t: 'Taste of Home', d: 'Find supermarkets with home food.' },
              { icon: Clock, col: 'text-blue-500', bg: 'bg-blue-500/10', t: 'Work Hour Log', d: 'Weekly limits & automatic payouts.' },
              { icon: Briefcase, col: 'text-rose-500', bg: 'bg-rose-500/10', t: 'Job Tracker', d: 'Manage applications with stages.' },
              { icon: Bot, col: 'text-emerald-500', bg: 'bg-emerald-500/10', t: 'AI Assistant', d: 'Chat with a private UK survival AI.' },
              { icon: Mic, col: 'text-sky-500', bg: 'bg-sky-500/10', t: 'AI Interview Coach', d: 'Practice with a simulated HR agent.' },
              { icon: Wand2, col: 'text-purple-500', bg: 'bg-purple-500/10', t: 'AI Cover Letter', d: 'Generates letters for UK jobs.' },
              { icon: FileSearch, col: 'text-indigo-500', bg: 'bg-indigo-500/10', t: 'Resume Scanner', d: 'Deep-scan against UK job descriptions.' },
              { icon: Settings2, col: 'text-slate-500', bg: 'bg-slate-500/10', t: 'Settings Hub', d: 'Resize and toggle all dashboard components.' },
            ].map(({ icon: Icon, col, bg, t, d }) => (
              <div key={t} className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] group hover:scale-[1.02] hover:shadow-xl hover:border-[var(--accent)]/30 transition-all">
                <div className={`w-12 h-12 rounded-2xl ${bg} ${col} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[var(--text)] text-base mb-2">{t}</h3>
                <p className="text-[var(--text-muted)] text-[13px] leading-relaxed line-clamp-2">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────── */}
      <section className="py-32 px-6 border-t border-[var(--border)] bg-gradient-to-b from-transparent to-[var(--bg-raised)]/50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-10 transition-transform hover:rotate-6 duration-300 shadow-2xl shadow-[var(--accent)]/30 animate-pulse-ring-extended" style={{ background: 'var(--accent)' }}>
            <GraduationCap className="w-10 h-10" style={{ color: 'var(--accent-fg)' }} />
          </div>
          <h2 className="text-[3.5rem] leading-[1.1] font-black text-[var(--text)] tracking-tight mb-6">
            One platform. <br />Infinite Possibilities.
          </h2>
          <p className="text-[var(--text-sub)] text-xl mb-12 max-w-md mx-auto leading-relaxed">
            Take the stress out of UK life and join the Student Mind ecosystem today.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            {user ? (
              <Link href="/dashboard" className="flex items-center justify-center gap-2 px-10 py-5 rounded-2xl btn-accent text-lg font-black transition-all hover:scale-[1.05] shadow-2xl shadow-[var(--accent)]/20 glow-accent">
                Go to Dashboard <ArrowUpRight className="w-5 h-5" />
              </Link>
            ) : (
              <>
                <Link href="/signup" className="flex items-center justify-center gap-2 px-10 py-5 rounded-2xl btn-accent text-lg font-black transition-all hover:scale-[1.05] shadow-2xl shadow-[var(--accent)]/20 glow-accent">
                  Unlock Your Dashboard <ArrowUpRight className="w-5 h-5" />
                </Link>
                <Link href="/login" className="flex items-center justify-center gap-2 px-10 py-5 rounded-2xl border border-[var(--border)] text-[var(--text-sub)] hover:text-[var(--text)] hover:bg-[var(--bg-card)] text-base font-bold transition-all">
                  Already a Member?
                </Link>
              </>
            )}
          </div>
          <p className="text-[var(--text-muted)] text-[13px] mt-10 font-medium">Free forever · No credit card required · GDPR Compliant</p>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────── */}
      <footer className="border-t border-[var(--border)] pt-20 pb-12 px-6 bg-[var(--bg-card)]/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent)' }}>
                  <GraduationCap className="w-4 h-4" style={{ color: 'var(--accent-fg)' }} />
                </div>
                <span className="font-black text-[var(--text)] text-lg tracking-tight">Student Mind</span>
              </div>
              <p className="text-[var(--text-muted)] text-[15px] leading-relaxed max-w-sm">The first specialized digital operating system for international students in the UK. Designed for success, built for compliance.</p>
            </div>
            <div>
              <h5 className="font-black text-[var(--text)] text-sm mb-6 uppercase tracking-widest">Platform</h5>
              <ul className="space-y-4 text-sm text-[var(--text-muted)] font-bold">
                <li><a href="#features" className="hover:text-[var(--accent)] transition-colors">Features</a></li>
                <li><a href="#how" className="hover:text-[var(--accent)] transition-colors">How it Works</a></li>
                <li><a href="/dashboard" className="hover:text-[var(--accent)] transition-colors">Dashboard</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-black text-[var(--text)] text-sm mb-6 uppercase tracking-widest">Legal</h5>
              <ul className="space-y-4 text-sm text-[var(--text-muted)] font-bold">
                <li><Link href="/terms" className="hover:text-[var(--accent)] transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-[var(--accent)] transition-colors">Privacy Policy</Link></li>
                <li><a href="mailto:support@studentmind.io" className="hover:text-[var(--accent)] transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-[var(--border)]/30 text-[var(--text-muted)] text-[13px] font-bold">
            <p>© 2026 Student Mind. Handcrafted for International Students.</p>
            <div className="flex items-center gap-8">
              <a href="#" className="hover:text-[var(--text)] transition-colors tracking-tight">Twitter</a>
              <a href="#" className="hover:text-[var(--text)] transition-colors tracking-tight">Discord</a>
              <a href="#" className="hover:text-[var(--text)] transition-colors tracking-tight">GitHub</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
