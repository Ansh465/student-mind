import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key_for_build')

export const geminiModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

/**
 * Helper to parse JSON from Gemini's response string
 */
export function parseGeminiJSON(text: string) {
    try {
        // Find the first { and last } to extract JSON if it's wrapped in markdown
        const start = text.indexOf('{')
        const end = text.lastIndexOf('}')
        if (start === -1 || end === -1) return null

        const jsonStr = text.substring(start, end + 1)
        return JSON.parse(jsonStr)
    } catch (e) {
        console.error("Failed to parse Gemini JSON:", e)
        return null
    }
}
