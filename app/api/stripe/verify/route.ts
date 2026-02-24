import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { sessionId } = await req.json()
        if (!sessionId) {
            return NextResponse.json({ error: 'Missing session ID' }, { status: 400 })
        }

        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Fetch the session directly from Stripe to verify payment status
        const session = await stripe.checkout.sessions.retrieve(sessionId)

        if (session.payment_status === 'paid') {
            // Update the user's profile to Pro
            const { error } = await supabase
                .from('profiles')
                .update({ subscription_tier: 'pro' })
                .eq('id', user.id)

            if (error) {
                console.error('Supabase Update Error:', error)
                return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
            }

            return NextResponse.json({ success: true, tier: 'pro' })
        }

        return NextResponse.json({ success: false, status: session.payment_status })
    } catch (e: any) {
        console.error('Stripe Verify Error:', e)
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
