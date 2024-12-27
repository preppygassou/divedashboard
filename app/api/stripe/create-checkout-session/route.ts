import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  const { orderId, items, billingDetails, shippingDetails } = await req.json();

  try {
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Price in cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      customer_email: billingDetails.email,
      shipping: {
        name: shippingDetails.name,
        address: {
          line1: shippingDetails.address,
          city: shippingDetails.city,
          postal_code: shippingDetails.postalCode,
          country: shippingDetails.country,
        },
      },
      metadata: { orderId },  // Pass WooCommerce order ID for later use
      mode: 'payment',
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/checkout/payment`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error('Stripe checkout session creation error', err);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}

export function OPTIONS() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
