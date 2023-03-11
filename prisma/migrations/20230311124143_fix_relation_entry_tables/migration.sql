/*
  Warnings:

  - A unique constraint covering the columns `[categoryId]` on the table `category_product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId]` on the table `category_product` will be added. If there are existing duplicate values, this will fail.
  - Made the column `categoryId` on table `category_product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `category_product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "category_product" ALTER COLUMN "categoryId" SET NOT NULL,
ALTER COLUMN "productId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "category_product_categoryId_key" ON "category_product"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "category_product_productId_key" ON "category_product"("productId");
