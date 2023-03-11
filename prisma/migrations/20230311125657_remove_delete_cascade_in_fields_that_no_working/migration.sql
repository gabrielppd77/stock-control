-- DropForeignKey
ALTER TABLE "category_product" DROP CONSTRAINT "category_product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "category_product" DROP CONSTRAINT "category_product_productId_fkey";

-- AddForeignKey
ALTER TABLE "category_product" ADD CONSTRAINT "category_product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_product" ADD CONSTRAINT "category_product_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
