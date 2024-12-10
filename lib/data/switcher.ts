import { prisma } from "@/lib/db"
import { Prisma } from "@prisma/client"

export const getSwitchers = async () => {
  try {
    return await db.switcher.findMany({
      include: {
        attribute: true
      },
      orderBy: { createdAt: 'desc' }
    })
  } catch {
    return []
  }
}

export const getSwitcherById = async (id: string) => {
  try {
    return await db.switcher.findUnique({
      where: { id },
      include: {
        attribute: true
      }
    })
  } catch {
    return null
  }
}

export const createSwitcher = async (data: Prisma.SwitcherCreateInput) => {
  try {
    return await db.switcher.create({
      data,
      include: {
        attribute: true
      }
    })
  } catch {
    return null
  }
}

export const updateSwitcher = async (
  id: string,
  data: Prisma.SwitcherUpdateInput
) => {
  try {
    return await db.switcher.update({
      where: { id },
      data,
      include: {
        attribute: true
      }
    })
  } catch {
    return null
  }
}

export const deleteSwitcher = async (id: string) => {
  try {
    await db.switcher.delete({
      where: { id }
    })
    return true
  } catch {
    return false
  }
}