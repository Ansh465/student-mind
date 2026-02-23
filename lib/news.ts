import { XMLParser } from 'fast-xml-parser'

export interface NewsItem {
    id: string
    title: string
    summary: string
    link: string
    published: string
    category: string
}

export async function getGovNews(): Promise<NewsItem[]> {
    try {
        const FEEDS = [
            'https://www.gov.uk/search/news-and-communications.atom?keywords=student+visa&organisations%5B%5D=uk-visas-and-immigration',
            'https://www.gov.uk/search/news-and-communications.atom?keywords=immigration+student',
        ]

        const results = await Promise.allSettled(
            FEEDS.map(url =>
                fetch(url, {
                    headers: { 'User-Agent': 'StudentMind/1.0' },
                    next: { revalidate: 3600 }, // Cache for 1 hour
                }).then(async r => {
                    if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`)
                    return r.text()
                })
            )
        )

        const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' })
        const items: NewsItem[] = []

        for (const result of results) {
            if (result.status !== 'fulfilled') continue
            try {
                const parsed = parser.parse(result.value)
                const feed = parsed?.feed
                if (!feed) continue

                const entries = Array.isArray(feed.entry) ? feed.entry : feed.entry ? [feed.entry] : []
                for (const entry of entries) {
                    // Robust link extraction
                    let link = ''
                    if (Array.isArray(entry.link)) {
                        const alternate = entry.link.find((l: any) => l['@_rel'] === 'alternate') ?? entry.link[0]
                        link = alternate?.['@_href'] ?? alternate ?? ''
                    } else {
                        link = entry?.link?.['@_href'] ?? entry?.link ?? ''
                    }

                    if (!link) continue

                    items.push({
                        id: entry?.id ?? link,
                        title: entry?.title?.['#text'] ?? entry?.title ?? 'No title',
                        summary: entry?.summary?.['#text'] ?? entry?.summary ?? entry?.content?.['#text'] ?? '',
                        link,
                        published: entry?.published ?? entry?.updated ?? '',
                        category: entry?.category?.['@_term'] ?? 'UK Government',
                    })
                }
            } catch (err) {
                console.error("Error parsing Atom feed:", err)
            }
        }

        // Deduplicate by id and sort by date
        const seen = new Set()
        const unique = items
            .filter(item => {
                if (seen.has(item.id)) return false
                seen.add(item.id)
                return true
            })
            .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())

        return unique.slice(0, 12)
    } catch (err) {
        console.error("Critical error fetching news:", err)
        return []
    }
}
