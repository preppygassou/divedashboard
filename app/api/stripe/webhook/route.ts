import { NextRequest, NextResponse } from 'next/server';
import api from '@/lib/woocommerce';  // WooCommerce API instance
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature') as string;

  try {
    const event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET!);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as stripe.Checkout.Session;
      const orderId = session.metadata.orderId;

      // Update WooCommerce order as paid
      await api.put(`orders/${orderId}`, {
        status: 'processing',  // Update to processing or completed based on your flow
        set_paid: true,  // Mark as paid
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook Error', error);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }
}
