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
            attribute: true,
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

export const createProduct = async (
  data: Prisma.ProductCreateInput & {
    attributes?: { id: string }[];
    variations?: {
      attributeId: string;
      switcherId: string;
      featuredImage?: Record<string, any>;
      manageStock: boolean;
      price: number;
      regularPrice?: number;
      soldPrice?: number;
      initialQuantity?: number;
      availableQuantity?: number;
      soldQuantity?: number;
    }[];
  }
) => {
  const { attributes, variations, ...productData } = data;

    const response = await db.product.create({
      data: {
        ...productData,
        attributes: {
          create: attributes?.map((attr) => ({
            attributeId: attr.id,
          })),
        },
        variations: {
          create: variations?.map((variation) => ({
            attributeId: variation.attributeId,
            switcherId: variation.switcherId,
            featuredImage: variation.featuredImage,
            manageStock: variation.manageStock,
            price: variation.price,
            regularPrice: variation.regularPrice,
            soldPrice: variation.soldPrice,
            initialQuantity: variation.initialQuantity,
            availableQuantity: variation.availableQuantity,
            soldQuantity: variation.soldQuantity,
          })),
        },
      },
    });

    return response;
  /* try {
    const { attributes, variations, ...productData } = data;

    const response = await db.product.create({
      data: {
        ...productData,
        attributes: {
          create: attributes?.map((attr) => ({
            attributeId: attr.id,
          })),
        },
        variations: {
          create: variations?.map((variation) => ({
            attributeId: variation.attributeId,
            switcherId: variation.switcherId,
            featuredImage: variation.featuredImage,
            manageStock: variation.manageStock,
            price: variation.price,
            regularPrice: variation.regularPrice,
            soldPrice: variation.soldPrice,
            initialQuantity: variation.initialQuantity,
            availableQuantity: variation.availableQuantity,
            soldQuantity: variation.soldQuantity,
          })),
        },
      },
    });

    return response;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product");
  } */
};

export const updateProduct = async (
  id: string,
  data: Prisma.ProductUpdateInput & {
    attributes?: { id: string }[];
    variations?: {
      attributeId: string;
      switcherId: string;
      featuredImage?: Record<string, any>;
      manageStock: boolean;
      price: number;
      regularPrice?: number;
      soldPrice?: number;
      initialQuantity?: number;
      availableQuantity?: number;
      soldQuantity?: number;
    }[];
  }
) => {
  try {
    const { attributes, variations, ...productData } = data;

    const response = await db.product.update({
      where: { id },
      data: {
        ...productData,
        attributes: {
          deleteMany: {}, // Deletes all existing attributes for the product
          create: attributes?.map((attr) => ({
            attributeId: attr.id,
          })),
        },
        variations: {
          deleteMany: {}, // Deletes all existing variations for the product
          create: variations?.map((variation) => ({
            attributeId: variation.attributeId,
            switcherId: variation.switcherId,
            featuredImage: variation.featuredImage,
            manageStock: variation.manageStock,
            price: variation.price,
            regularPrice: variation.regularPrice,
            soldPrice: variation.soldPrice,
            initialQuantity: variation.initialQuantity,
            availableQuantity: variation.availableQuantity,
            soldQuantity: variation.soldQuantity,
          })),
        },
      },
    });

    return response;
  } catch (error) {
    console.error("Error updating product:", error);
    return null;
  }
};

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