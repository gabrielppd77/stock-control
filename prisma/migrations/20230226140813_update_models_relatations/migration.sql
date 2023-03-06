/*
  Warnings:

  - You are about to drop the column `categoryId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `productItems` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dtCreate` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "productItems" DROP CONSTRAINT "productItems_productId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categoryId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "categoryId",
ADD COLUMN     "dtCreate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dtDeparture" TIMESTAMP(3),
ADD COLUMN     "nrRequest" TEXT;

-- DropTable
DROP TABLE "productItems";

-- CreateTable
CREATE TABLE "categories_products" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT,
    "productId" TEXT,
    "categoryProductId" TEXT,

    CONSTRAINT "categories_products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "categories_products" ADD CONSTRAINT "categories_products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories_products" ADD CONSTRAINT "categories_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories_products" ADD CONSTRAINT "categories_products_categoryProductId_fkey" FOREIGN KEY ("categoryProductId") REFERENCES "categories_products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
