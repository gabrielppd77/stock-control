/*
  Warnings:

  - You are about to drop the `categories_products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "categories_products" DROP CONSTRAINT "categories_products_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "categories_products" DROP CONSTRAINT "categories_products_categoryProductId_fkey";

-- DropForeignKey
ALTER TABLE "categories_products" DROP CONSTRAINT "categories_products_productId_fkey";

-- DropTable
DROP TABLE "categories_products";

-- CreateTable
CREATE TABLE "category_product" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT,
    "productId" TEXT,
    "categoryProductId" TEXT,

    CONSTRAINT "category_product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "category_product" ADD CONSTRAINT "category_product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_product" ADD CONSTRAINT "category_product_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_product" ADD CONSTRAINT "category_product_categoryProductId_fkey" FOREIGN KEY ("categoryProductId") REFERENCES "category_product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
