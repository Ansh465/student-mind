import { geminiModel } from '@/lib/ai'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { message, history, context } = await req.json()

        if (!message) {
            return NextResponse.json({ error: 'Missing message' }, { status: 400 })
        }

        // Filter history to ensure it starts with a 'user' role
        // Gemini's startChat history must start with 'user'
        let validHistory = history || []
        const firstUserIndex = validHistory.findIndex((m: any) => m.role === 'user')

        if (firstUserIndex !== -1) {
            validHistory = validHistory.slice(firstUserIndex)
        } else {
            validHistory = []
        }

        const chat = geminiModel.startChat({
            history: validHistory,
        })

        const isInterview = context?.mode === 'interview'

        const systemContext = isInterview ? `
            You are a UK HR Manager interviewing a candidate for a ${context?.jobTitle || 'student'} position.
            Your goal is to conduct a professional mock interview using the STAR method.
            Ask one question at a time. After each answer, provide brief, constructive feedback on how to improve it for the UK market, then ask the next question.
            Keep the tone professional yet supportive. Avoid long paragraphs.
        ` : `
            You are "Student Mind AI", a specialized survival assistant for international students in the UK.
            Current user context: ${JSON.stringify(context || {})}
            Provide helpful, concise, and encouraging advice regarding visas, jobs, budgeting, and UK culture.
            Avoid using Markdown headers, stick to bolding and bullet points for readability in a small chat window.
        `

        const result = await chat.sendMessage(`${systemContext}\n\nUser: ${message}`)
        const responseText = result.response.text()

        return NextResponse.json({ response: responseText })
    } catch (e: any) {
        console.error('Chat Error:', e)
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
