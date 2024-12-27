// Api order creation example
import { db } from '@/lib/db'; // Adjust path based on your project setup
import { v4 as uuidv4 } from 'uuid';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { items, shippingAddress, billingAddress,userId,paymentMethod="stripe",paymentMethodTitle="Stripe" } = await req.json();

     // Generate a unique order number
     const orderNumber = `ORD-${uuidv4().slice(0, 8).toUpperCase()}`;

     // Calculate totalAmount
     const total = items.reduce(
       (sum, item) => sum + item.price * item.quantity,
       0
     );


   // Create the order in the database
   const newOrder = await db.order.create({
    data: {
      userId,
      orderNumber,
      paymentMethod,
      currency: 'eur',
      setPaid: false,
      paymentMethodTitle,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      total,
      orderItems: {
        create: items.map((item) => ({
          productId: item.id,
          variationId: item.variation_id || null,
          quantity: item.quantity,
          price: item.price,
          totalPrice: item.quantity * item.price,
        })),
      },
    },
    include: {
      orderItems: true,
    },
  });

    return NextResponse.json({ orderId: newOrder .id }, { status: 200 });
  } catch (error) {
    console.error('WooCommerce order creation error', error.response.data);
    return NextResponse.json({ error: 'Failed to create WooCommerce order' }, { status: 500 });
  }
}

/* export const config = {
  runtime: 'edge',
}; */
