/* import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    //const { amount, shippingDetails, billingDetails } = await req.json();
    const { amount, currency } = await req.json();

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // amount in cents
      currency, // e.g., 'usd'
      automatic_payment_methods: { enabled: true },
      
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 });
  }
}

export function OPTIONS() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
} */
/* shipping: {
        name: shippingDetails.name,
        address: {
          line1: shippingDetails.address,
          city: shippingDetails.city,
          postal_code: shippingDetails.postalCode,
          country: shippingDetails.country,
        },
      }, */