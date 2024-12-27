// app/api/update-order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Adjust path based on your project setup

export async function PATCH(req: NextRequest) {
  try {
    const { orderId,status,paymentStatus,transaction_id } = await req.json();

     // Update the order in the database
     const updatedOrder = await db.order.update({
      where: { id:orderId },
      data: {
        paymentStatus,
        status, 
        setPaid:true,
        transactionId: transaction_id || null, // Optional
        paymentIntentId: transaction_id || null, // Optional
        updatedAt: new Date(),
        datePaid: new Date(),
      },
    });

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error('Error updating WooCommerce order:', error);
    return NextResponse.json({ message: 'Error updating order', error }, { status: 500 });
  }
}
