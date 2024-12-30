import { db } from "@/lib/db"

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({ where: { email } })
  } catch {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    return await db.user.findUnique({
      where: { id },
      include: {
      addresses: true,
      orders: true,
      passCards: true
      }
    })
  } catch {
    return null
  }
}

export const createUser = async (data: {
  name: string
  email: string
  password: string
}) => {
  try {
    return await db.user.create({ data })
  } catch {
    return null
  }
}

export const updateUser = async (id: string, data: Partial<{
  name: string
  email: string
  password: string
  role: "USER" | "ADMIN"
  cardTier: "basic" | "pro" | "elite" | null
}>) => {
  try {
    return await db.user.update({
      where: { id },
      data
    })
  } catch {
    return null
  }
}

export const deleteUser = async (id: string) => {
  try {
    await db.user.delete({ where: { id } })
    return true
  } catch {
    return false
  }
}