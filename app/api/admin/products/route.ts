"use client"

import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { createProduct, getProducts } from "@/lib/data/product"

export async function GET() {
  try {
   
    const products = await getProducts()
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
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
    const product = await createProduct(data)

    if (!product) {
      return NextResponse.json(
        { error: "Failed to create product" },
        { status: 400 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    )
  }
}