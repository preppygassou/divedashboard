import { NextResponse,NextRequest } from "next/server";
import { auth } from "@/auth";
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    
    /* if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
 */
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get('userId');


    const passCards = await db.passCard.findMany({
      where: userId ? {
        userId: userId
      } : undefined,
      include: {
      user: {
        select: {
        firstName: true,
        lastName: true,
        email: true
        }
      },
      order: true
      },
      orderBy: {
      createdAt: 'desc'
      }
    });

    return NextResponse.json(passCards);
  } catch (error) {
    console.error('Error fetching pass cards:', error);
    return NextResponse.json(
      { error: "Failed to fetch pass cards" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { orderId, status, trackingNumber } = body;

    const order = await db.order.findUnique({
      where: { id: orderId }
    });
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const passCard = await db.passCard.create({
      data: {
      userId: order.userId,
      orderId: order.id,
      tier: order.tier,
      status,
      trackingNumber,
      cardNumber
      : generateCardNumber()
      }
    });

    return NextResponse.json(passCard);
  } catch (error) {
    console.error('Error creating pass card:', error);
    return NextResponse.json(
      { error: "Failed to create pass card" },
      { status: 500 }
    );
  }
}


function generateCardNumber(): string {
  const prefix = "PC";
  const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
  return `${prefix}${randomNumber}`;
}