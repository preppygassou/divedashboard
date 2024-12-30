/* import { NextResponse } from "next/server"
import { auth } from "@/auth"
import {
  deleteAttribute,
  getAttributeById,
  updateAttribute,
} from "@/lib/data/attribute"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {

    const attribute = await getAttributeById(params.id)
    
    if (!attribute) {
      return NextResponse.json({ error: "Attribute not found" }, { status: 404 })
    }

    return NextResponse.json(attribute)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch attribute" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()
    const attribute = await updateAttribute(params.id, data)

    if (!attribute) {
      return NextResponse.json({ error: "Attribute not found" }, { status: 404 })
    }

    return NextResponse.json(attribute)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update attribute" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {


    const success = await deleteAttribute(params.id)

    if (!success) {
      return NextResponse.json({ error: "Attribute not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete attribute" },
      { status: 500 }
    )
  }
} */