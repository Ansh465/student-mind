# Student Mind

Student Mind is an all-in-one personal dashboard designed for international students in the UK. It simplifies visa compliance, work hour tracking, and personal budgeting in a single, vibrant, and highly-organized interface.

## Core Features

- **Visa Compliance Tracking**: Real-time countdown to your visa expiry with status-aware alerts.
- **Work Hour Log**: Track your weekly work hours against the 20-hour (or custom) student visa limit. Includes visual warnings when approaching limits.
- **Budget Planner**: Manage monthly income and categorized expenses (Rent, Food, Transport, etc.) with a clear visual breakdown of remaining funds.
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
