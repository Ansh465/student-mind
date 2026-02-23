import { geminiModel, parseGeminiJSON } from '@/lib/ai'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { jd, resume } = await req.json()

        if (!jd || !resume) {
            return NextResponse.json({ error: 'Missing JD or Resume' }, { status: 400 })
        }

        const prompt = `
            You are an expert UK recruiter and ATS specialist. 
            Analyze the following Job Description (JD) and Resume text.
            Provide a detailed report in JSON format with the following structure:
            {
                "score": number (0-100),
                "keywordsFound": string[],
                "missingKeywords": string[],
                "bulletIssues": { "line": string, "issue": string }[],
                "hasQuantification": boolean,
                "improvementTips": string[],
                "overallVerdict": string (short summary)
            }

            Job Description:
            ${jd}

            Resume:
            ${resume}

            Ensure the response is ONLY the JSON object.
        `

        const result = await geminiModel.generateContent(prompt)
        const responseText = result.response.text()
        const analysis = parseGeminiJSON(responseText)

        if (!analysis) {
            throw new Error("Failed to parse AI response")
        }

        return NextResponse.json(analysis)
    } catch (e: any) {
        console.error('AI Error:', e)
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
