/*
  Warnings:

  - You are about to drop the column `features` on the `Product` table. All the data in the column will be lost.
  - The `featuredImage` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `availableQuantity` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initialQuantity` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `soldQuantity` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `ProductAttribute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `ProductSwitcher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "features",
ADD COLUMN     "availableQuantity" INTEGER NOT NULL,
ADD COLUMN     "initialQuantity" INTEGER NOT NULL,
ADD COLUMN     "regularPrice" INTEGER,
ADD COLUMN     "soldQuantity" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
DROP COLUMN "featuredImage",
ADD COLUMN     "featuredImage" JSONB;

-- AlterTable
ALTER TABLE "ProductAttribute" ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductSwitcher" ADD COLUMN     "price" INTEGER NOT NULL;
