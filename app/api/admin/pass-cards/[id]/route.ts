import { NextRequest, NextResponse } from 'next/server';
import { auth } from "@/auth";
import { db } from '@/lib/db';

export async function GET(
  req: NextResponse,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const passCard = await db.passCard.findUnique({
      where: { id: params.id },
      include: {
      user: {
        select: {
        firstName: true,
        lastName: true,
        email: true
        }
      },
      order: true
      }
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
  req: NextResponse,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { status, trackingNumber } = body;

    const passCard = await db.passCard.findUnique({
      where: { id: params.id }
    });
    if (!passCard) {
      return NextResponse.json({ error: "Pass card not found" }, { status: 404 });
    }

    const updatedPassCard = await db.passCard.update({
      where: { id: params.id },
      data: {
      status,
      trackingNumber
      }
    });

    return NextResponse.json(updatedPassCard);
  } catch (error) {
    console.error('Error updating pass card:', error);
    return NextResponse.json(
      { error: "Failed to update pass card" },
      { status: 500 }
    );
  }
}