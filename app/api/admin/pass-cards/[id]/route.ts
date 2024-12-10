import { NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/lib/db/models";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const passCard = await db.PassCard.findByPk(params.id, {
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
      ]
    });

    if (!passCard) {
      return NextResponse.json({ error: "Pass card not found" }, { status: 404 });
    }

    return NextResponse.json(passCard);
  } catch (error) {
    console.error('Error fetching pass card:', error);
    return NextResponse.json(
      { error: "Failed to fetch pass card" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { status, trackingNumber } = body;

    const passCard = await db.PassCard.findByPk(params.id);
    if (!passCard) {
      return NextResponse.json({ error: "Pass card not found" }, { status: 404 });
    }

    await passCard.update({
      status,
      trackingNumber
    });

    return NextResponse.json(passCard);
  } catch (error) {
    console.error('Error updating pass card:', error);
    return NextResponse.json(
      { error: "Failed to update pass card" },
      { status: 500 }
    );
  }
}