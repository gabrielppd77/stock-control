/*
  Warnings:

  - Added the required column `title` to the `category_product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "category_product" ADD COLUMN     "title" TEXT NOT NULL;
