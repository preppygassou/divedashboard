// app/api/update-order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Adjust path based on your project setup

export async function PATCH(req: NextRequest,{ params }: { params: { id: string } }) {
const id = params.id
  try {
    const { status} = await req.json();

     // Update the order in the database
     const updatedOrder = await db.order.update({
      where: {id},
      data: {
        status, 
        updatedAt: new Date(),

      },
    });

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error('Error updating WooCommerce order:', error);
    return NextResponse.json({ message: 'Error updating order', error }, { status: 500 });
  }
}
export async function GET(req: NextRequest,{ params }: { params: { id: string } }) {

  try {
    const order = await db.order.findUnique({
      where: {
        id:params.id,
      },
      include: {
        orderItems: {
          include: {
            product: true, // Include product details for each order item
            variation: true, // Include variation details if applicable
          },
        },
        user: true, // Include user details if applicable
      },
    });

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error('Error fetching order', error);
    return NextResponse.json({ message: 'Error fetching order', error }, { status: 500 });
  }
}
