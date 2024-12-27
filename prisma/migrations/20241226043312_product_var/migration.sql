/*
  Warnings:

  - The `status` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `price` on the `ProductAttribute` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `ProductAttribute` table. All the data in the column will be lost.
  - The `image` column on the `Switcher` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `ProductSwitcher` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('draft', 'published', 'discontinued', 'out_of_stock');

-- DropForeignKey
ALTER TABLE "ProductSwitcher" DROP CONSTRAINT "ProductSwitcher_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductSwitcher" DROP CONSTRAINT "ProductSwitcher_switcherId_fkey";

-- DropIndex
DROP INDEX "Product_tier_idx";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "individuallySell" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "soldPrice" INTEGER,
DROP COLUMN "status",
ADD COLUMN     "status" "ProductStatus" NOT NULL DEFAULT 'published';

-- AlterTable
ALTER TABLE "ProductAttribute" DROP COLUMN "price",
DROP COLUMN "value";

-- AlterTable
ALTER TABLE "Switcher" DROP COLUMN "image",
ADD COLUMN     "image" JSONB;

-- DropTable
DROP TABLE "ProductSwitcher";

-- CreateTable
CREATE TABLE "ProductVariation" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "attributeId" TEXT NOT NULL,
    "switcherId" TEXT NOT NULL,
    "manageStock" BOOLEAN NOT NULL DEFAULT false,
    "price" INTEGER NOT NULL,
    "regularPrice" INTEGER,
    "soldPrice" INTEGER,
    "initialQuantity" INTEGER,
    "availableQuantity" INTEGER,
    "soldQuantity" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductVariation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductVariation_productId_idx" ON "ProductVariation"("productId");

-- CreateIndex
CREATE INDEX "ProductVariation_attributeId_idx" ON "ProductVariation"("attributeId");

-- CreateIndex
CREATE INDEX "ProductVariation_switcherId_idx" ON "ProductVariation"("switcherId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariation_productId_attributeId_switcherId_key" ON "ProductVariation"("productId", "attributeId", "switcherId");

-- CreateIndex
CREATE INDEX "Product_id_idx" ON "Product"("id");

-- AddForeignKey
ALTER TABLE "ProductVariation" ADD CONSTRAINT "ProductVariation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariation" ADD CONSTRAINT "ProductVariation_switcherId_fkey" FOREIGN KEY ("switcherId") REFERENCES "Switcher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariation" ADD CONSTRAINT "ProductVariation_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
