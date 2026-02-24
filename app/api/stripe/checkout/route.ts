import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST() {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'gbp',
                        product_data: {
                            name: 'Student Mind Professional',
                            description: 'Lifetime access to AI CV Writer, ATS Scanner, and Advanced Tracking.',
                        },
                        unit_amount: 499, // £4.99
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?status=success&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
            metadata: {
                userId: user.id,
            },
        })

        return NextResponse.json({ url: session.url })
    } catch (e: any) {
        console.error('Stripe Error:', e)
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
