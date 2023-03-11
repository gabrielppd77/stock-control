/*
  Warnings:

  - You are about to drop the column `categoryId` on the `category_product` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `category_product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[categoryProductId]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[categoryProductId]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryProductId` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryProductId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "category_product" DROP CONSTRAINT "category_product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "category_product" DROP CONSTRAINT "category_product_productId_fkey";

-- DropIndex
DROP INDEX "category_product_categoryId_key";

-- DropIndex
DROP INDEX "category_product_productId_key";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "categoryProductId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "category_product" DROP COLUMN "categoryId",
DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "categoryProductId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "categories_categoryProductId_key" ON "categories"("categoryProductId");

-- CreateIndex
CREATE UNIQUE INDEX "products_categoryProductId_key" ON "products"("categoryProductId");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_categoryProductId_fkey" FOREIGN KEY ("categoryProductId") REFERENCES "category_product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryProductId_fkey" FOREIGN KEY ("categoryProductId") REFERENCES "category_product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
