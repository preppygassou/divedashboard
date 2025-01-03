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
    const totalAmount: number = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );


   // Create the order in the database
  interface OrderItem {
    productId: string;
    variationId?: string;
    quantity: number;
    price: number;
  }

  interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }

  interface CreateOrderData {
    userId: string;
    orderNumber: string;
    paymentMethod: string;
    currency: string;
    setPaid: boolean;
    paymentMethodTitle: string;
    shippingAddress: Address;
    billingAddress: Address;
    total: number;
    orderItems: {
      create: {
        productId: string;
        variationId?: string | null;
        quantity: number;
        price: number;
        totalPrice: number;
      }[];
    };
  }

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
      totalAmount,
      orderItems: {
        create: items.map((item: OrderItem) => ({
          productId: item.productId,
          variationId: item?.variationId || null,
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

    return NextResponse.json({ orderId: newOrder.id }, { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.response && error.response.data) {
      console.error('Order creation error', error.response.data);
    } else {
      console.error('Order creation error', error);
    }
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

/* export const config = {
  runtime: 'edge',
}; */
