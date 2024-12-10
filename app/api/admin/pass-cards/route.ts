import { NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/lib/db/models";

export async function GET(req: Request) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const passCards = await db.PassCard.findAll({
      include: [
        {
          model: db.User,
          as: 'user',
          attributes: ['name', 'email']
        },
        {
          model: db.Order,
          as: 'order'
        }
      ],
      order: [['createdAt', 'DESC']]
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

    const order = await db.Order.findByPk(orderId);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const passCard = await db.PassCard.create({
      userId: order.userId,
      orderId: order.id,
      tier: order.tier,
      status,
      trackingNumber
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