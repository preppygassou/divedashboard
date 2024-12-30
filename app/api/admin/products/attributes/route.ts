import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { createAttribute, getAttributes } from "@/lib/data/attribute"

export async function GET() {
  try {
    const session = await auth()
    
    /* if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
 */
    const attributes = await getAttributes()
    return NextResponse.json(attributes)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch attributes" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()
    const attribute = await createAttribute(data)

    if (!attribute) {
      return NextResponse.json(
        { error: "Failed to create attribute" },
        { status: 400 }
      )
    }

    return NextResponse.json(attribute)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create attribute" },
      { status: 500 }
    )
  }
}