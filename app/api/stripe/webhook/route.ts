import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // Need service role to bypass RLS for subscription updates
)

export async function POST(req: Request) {
    const body = await req.text()
    const signature = (await headers()).get('Stripe-Signature') as string

    let event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (e: any) {
        return NextResponse.json({ error: `Webhook Error: ${e.message}` }, { status: 400 })
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as any
        const userId = session.metadata.userId

        if (userId) {
            const { error } = await supabase
                .from('profiles')
                .update({ subscription_tier: 'pro' })
                .eq('id', userId)

            if (error) console.error('Supabase Update Error:', error)
        }
    }

    return NextResponse.json({ received: true })
}
