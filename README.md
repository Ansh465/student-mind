# Student Mind

Student Mind is an all-in-one personal dashboard designed for international students in the UK. It simplifies visa compliance, work hour tracking, and personal budgeting in a single, vibrant, and highly-organized interface.

## Core Features

- **Visa Compliance Tracking**: Real-time countdown to your visa expiry with status-aware alerts.
- **Work Hour Log & Multi-Job Support**: Track weekly work hours across multiple jobs with custom pay rates and automated earnings calculation. Features visual warnings when approaching limits.
- **Job Application Tracker**: Manage your career journey by tracking job applications, statuses, and links in one place.
- **"Landing in UK" Checklist**: A comprehensive admin guide for international students (BRP, NI Number, GP registration, etc.).
- **Document Vault & Expire-Alerts**: Localized, secure storage for Passport, BRP, and other ID details with expiry tracking.
- **UK "Survival" Culture Guide**: Interactive guide to British slang, etiquette, and measurement conversions.
- **CV & Job Prep Checklist**: Tailored checklists to ensure your CV meets UK employer standards.
- **Resume ATS Scanner**: Instant feedback on your resume matching a job description, featuring keyword gap analysis and bullet point audits.
- **Accommodation Tracker**: Manage rent payments, landlord contacts, and maintenance paper trails.
- **Academic Goal Tracker**: Keep tabs on assignment deadlines with priority-based tracking and countdowns.
- **Local Resources**: Curated "Life Hacks" and essential links for health, travel, and student discounts.
- **Budget Planner**: Manage monthly income and categorized expenses with a clear visual breakdown of remaining funds.
- **Modern UI/UX**: High-fidelity design system featuring dynamic dark/light modes, premium gradients, and hardware-accelerated "glow" effects.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS & Vanilla CSS Variables
- **Database/Auth**: Supabase
- **Icons**: Lucide React
- **Theming**: Next Themes

## Getting Started

1. **Clone the repository.**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up local environment**:
   Create a `.env.local` file with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```
5. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## License

Student Mind is an organizational tool and does not constitute legal or immigration advice. Always verify visa compliance with official UK Government sources.

---

*I am a Vibe Coder.* ⚡️✨
