import { db } from "@/lib/db"
import { Prisma } from "@prisma/client"

export const getAttributes = async () => {
  try {
    return await db.attribute.findMany({
      include: {
        switchers: true
      },
      orderBy: { createdAt: 'desc' }
    })
  } catch {
    return []
  }
}

export const getAttributeById = async (id: string) => {
  try {
    return await db.attribute.findUnique({
      where: { id },
      include: {
        switchers: true
      }
    })
  } catch {
    return null
  }
}

export const createAttribute = async (data: Prisma.AttributeCreateInput) => {
  try {
    return await db.attribute.create({
      data,
      include: {
        switchers: true
      }
    })
  } catch {
    return null
  }
}

export const updateAttribute = async (
  id: string,
  data: Prisma.AttributeUpdateInput
) => {
  try {
    return await db.attribute.update({
      where: { id },
      data,
      include: {
        switchers: true
      }
    })
  } catch {
    return null
  }
}

export const deleteAttribute = async (id: string) => {
  try {
    await db.attribute.delete({
      where: { id }
    })
    return true
  } catch {
    return false
  }
}