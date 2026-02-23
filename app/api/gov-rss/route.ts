import { NextResponse } from 'next/server'
import { getGovNews } from '@/lib/news'

// Server-side proxy for GOV.UK RSS feeds (bypasses CORS)
export async function GET() {
    try {
        const items = await getGovNews()
        return NextResponse.json({ items })
    } catch (err) {
        return NextResponse.json(
            { items: [], error: 'Failed to fetch news feed.' },
            { status: 500 }
        )
    }
}
