'use server'

import { db } from "@/lib/db"
import { Prisma } from "@prisma/client"

const groupVariationsByAttributes = (product) => {
  const { attributes, variations } = product;

  const attributesWithVariations = attributes.map((attr) => {
    const attributeVariations = variations.filter(
      (variation) => variation.attributeId === attr.attribute.id
    );

    return {
      ...attr,
      variations: attributeVariations,
    };
  });

  return {
    ...product,
    attributes: attributesWithVariations,
  };
};


export const getProductsWithGroupedVariations = async () => {
  const products = await getProducts();
  return products.map(groupVariationsByAttributes);
};


export const getProducts = async () => {
  try {
    return await db.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        attributes: {
          include: {
            attribute: true
          }
        },
        variations: {
          include:{
            attribute: true, // Fetch the related attribute for each variation
            switcher: true,
          }
        },
      },
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
  const response = await db.product.create({ data })
  return response
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