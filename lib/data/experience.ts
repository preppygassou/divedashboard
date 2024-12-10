import { db } from "@/lib/db"
import { CardTier } from "@prisma/client"

export const createExperience = async (data: {
  title: string
  description: string
  location: string
  startDate: Date
  endDate: Date
  capacity: number
  imageUrl?: string
  allowedTiers: CardTier[]
}) => {
  try {
    return await db.experience.create({
      data: {
        ...data,
        availableSpots: data.capacity,
        allowedTiers: {
          create: data.allowedTiers.map(tier => ({
            tier
          }))
        }
      },
      include: {
        allowedTiers: true
      }
    })
  } catch {
    return null
  }
}

export const getExperienceById = async (id: string) => {
  try {
    return await db.experience.findUnique({
      where: { id },
      include: {
        allowedTiers: true,
        bookings: {
          include: {
            passCard: {
              include: {
                user: true
              }
            }
          }
        }
      }
    })
  } catch {
    return null
  }
}

export const updateExperience = async (
  id: string,
  data: db.ExperienceUpdateInput
) => {
  try {
    return await db.experience.update({
      where: { id },
      data,
      include: {
        allowedTiers: true
      }
    })
  } catch {
    return null
  }
}

export const deleteExperience = async (id: string) => {
  try {
    await db.experience.delete({
      where: { id }
    })
    return true
  } catch {
    return null
  }
}