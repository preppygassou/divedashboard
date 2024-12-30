// app/api/update-order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Adjust path based on your project setup


export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    const orders = await db.order.findMany({
      where: userId ? {
        userId: userId
      } : undefined,
      include: {
        orderItems: {
          include: {
            product: true,
            variation: true,
          },
        },
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error('Error fetching order', error);
    return NextResponse.json({ message: 'Error fetching order', error }, { status: 500 });
  }
}
