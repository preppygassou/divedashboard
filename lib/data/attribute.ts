'use server'

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
 /*  try {
    const response = await db.attribute.create({
      data,
      include: {
        switchers: true
      }
    })
    return response
  } catch {
    return null
  } */
    const response = await db.attribute.create({
      data,
      include: {
        switchers: true
      }
    })
    return response
}

export const updateAttribute = async (
  id: string,
  data: Prisma.AttributeUpdateInput
) => {
  try {
    const newSwitchers = data.switchers||[]

    // Step 1: Retrieve current switchers
  const currentAttribute = await db.attribute.findUnique({
    where: { id},
    include: { switchers: true },
  });

  if (!currentAttribute) {
    throw new Error("Attribute not found");
  }
  
  const currentSwitchers = currentAttribute.switchers;

  // Step 2: Identify switchers to delete
  const newSwitcherIds = newSwitchers.filter((s) => s.id).map((s) => s.id);
  const switchersToDelete = currentSwitchers.filter(
    (s) => !newSwitcherIds.includes(s.id)
  );

  // Step 3: Prepare data for update
  const createSwitchers = newSwitchers
    .filter((s) => !s.id)
    .map((s) => ({
      name: s.name,
      slug: s.slug,
      description: s.description,
      image: { url: s.image.url },
    }));

  const updateSwitchers = newSwitchers
    .filter((s) => s.id)
    .map((s) => ({
      where: { id: s.id },
      data: {
        name: s.name,
        slug: s.slug,
        description: s.description,
        image: { url: s.image.url },
      },
    }));

  // Step 4: Update the attribute

    //const Attribute = data
    return await db.attribute.update({
      where: { id },
      data: {
        ...data,
        switchers: {
          delete: switchersToDelete.map((s) => ({ id: s.id })),
          create: createSwitchers,
          update: updateSwitchers,
        },
      },
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