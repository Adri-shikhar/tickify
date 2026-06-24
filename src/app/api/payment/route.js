import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';

export async function POST(request) {
  try {
    const headersList = await headers()
    const session = await auth.api.getSession({ headers: headersList })

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const formData = await request.formData()
    const ticketId = formData.get('ticketId')
    const quantity = formData.get('quantity')
    const totalPrice = formData.get('totalPrice')
    const vendorId = formData.get('vendorId')
    const vendorName = formData.get('vendorName')
    console.log(userId, ticketId, quantity, totalPrice)
    const origin = headersList.get('origin')

    // Create Checkout Sessions from body params.
    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Ticket',
          },
          unit_amount: Number(totalPrice) * 100,
        },
          quantity: 1,
        },
        
      ],
      metadata: {
        userId: userId,
        ticketId: ticketId,
        quantity: quantity,
        totalPrice: Number(totalPrice),
        vendorId: vendorId || "",
        vendorName: vendorName || "",
      },
      mode: 'payment',
      success_url: `${origin}/all-tickets/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(checkoutSession.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}
