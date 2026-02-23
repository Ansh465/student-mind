import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Disclaimer } from '@/components/Disclaimer'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Student Survival OS',
  description: 'Manage your visa, work hours, and budget — all in one place.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} h-full antialiased bg-[var(--bg)] text-[var(--text)]`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <main className="flex-1">
              {children}
            </main>
            <Disclaimer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
