import { db } from "@/lib/db"
import { Prisma } from "@prisma/client"

export const getProducts = async () => {
  try {
    return await db.product.findMany({
      orderBy: { createdAt: 'desc' }
    })
  } catch {
    return []
  }
}

export const getProductById = async (id: string) => {
  try {
    return await db.product.findUnique({
      where: { id }
    })
  } catch {
    return null
  }
}

export const createProduct = async (data: Prisma.ProductCreateInput) => {
  try {
    return await db.product.create({ data })
  } catch {
    return null
  }
}

export const updateProduct = async (id: string, data: Prisma.ProductUpdateInput) => {
  try {
    return await db.product.update({
      where: { id },
      data
    })
  } catch {
    return null
  }
}

export const deleteProduct = async (id: string) => {
  try {
    await db.product.delete({
      where: { id }
    })
    return true
  } catch {
    return false
  }
}