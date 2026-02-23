import { NextResponse } from 'next/server'
import { XMLParser } from 'fast-xml-parser'

// Server-side proxy for GOV.UK RSS feeds (bypasses CORS)
export async function GET() {
    try {
        const FEEDS = [
            'https://www.gov.uk/search/news-and-communications.atom?keywords=student+visa&organisations%5B%5D=uk-visas-and-immigration',
            'https://www.gov.uk/search/news-and-communications.atom?keywords=immigration+student',
        ]

        const results = await Promise.allSettled(
            FEEDS.map(url =>
                fetch(url, {
                    headers: { 'User-Agent': 'StudentSurvivalOS/1.0' },
                    next: { revalidate: 3600 }, // Cache for 1 hour
                }).then(r => r.text())
            )
        )

        const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' })
        const items: object[] = []

        for (const result of results) {
            if (result.status !== 'fulfilled') continue
            try {
                const parsed = parser.parse(result.value)
                const feed = parsed?.feed
                if (!feed) continue

                const entries = Array.isArray(feed.entry) ? feed.entry : feed.entry ? [feed.entry] : []
                for (const entry of entries.slice(0, 8)) {
                    const link = entry?.link?.['@_href'] ?? entry?.link ?? ''
                    items.push({
                        id: entry?.id ?? link,
                        title: entry?.title?.['#text'] ?? entry?.title ?? 'No title',
                        summary: entry?.summary?.['#text'] ?? entry?.summary ?? entry?.content?.['#text'] ?? '',
                        link,
                        published: entry?.published ?? entry?.updated ?? '',
                        category: entry?.category?.['@_term'] ?? 'UK Government',
                    })
                }
            } catch {
                // skip malformed feed
            }
        }

        // Deduplicate by id
        const seen = new Set()
        const unique = items.filter(item => {
            const id = (item as { id: string }).id
            if (seen.has(id)) return false
            seen.add(id)
            return true
        })

        return NextResponse.json({ items: unique.slice(0, 12) })
    } catch (err) {
        return NextResponse.json(
            { items: [], error: 'Failed to fetch news feed.' },
            { status: 500 }
        )
    }
}
