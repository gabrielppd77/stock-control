import { PrismaClient } from "@prisma/client";

import { CategoryProductRepository } from "@/backend/repositories/category-product-repository";

import { CategoryProduct } from "@/backend/entities/category-product";
import { CategoryProductPrismaMapper } from "../mappers/category-product-prisma-mapper";

export class CategoryProductPrismaRepository
  implements CategoryProductRepository
{
  private prisma = new PrismaClient();

  async create(categoryProduct: CategoryProduct): Promise<void> {
    try {
      const categoryProductPrisma =
        CategoryProductPrismaMapper.toPrisma(categoryProduct);
      await this.prisma.categoryProduct.create({
        data: {
          id: categoryProductPrisma.id,
          title: categoryProductPrisma.title,
          category: categoryProductPrisma.category
            ? {
                create: categoryProductPrisma.category,
              }
            : undefined,
          product: categoryProductPrisma.product
            ? {
                create: categoryProductPrisma.product,
              }
            : undefined,
          categoryProduct: categoryProductPrisma.categoryProductId
            ? {
                connect: {
                  id: categoryProductPrisma.categoryProductId,
                },
              }
            : undefined,
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getAll(): Promise<any[]> {
    try {
      const categoryProducts = await this.prisma.categoryProduct.findMany({
        where: {
          categoryProductId: null,
        },
        include: {
          category: true,
          product: true,
          categoriesProducts: {
            include: {
              category: true,
              product: true,
              categoriesProducts: {
                include: {
                  category: true,
                  product: true,
                  categoriesProducts: {
                    include: {
                      category: true,
                      product: true,
                      categoriesProducts: {
                        include: {
                          category: true,
                          product: true,
                          categoriesProducts: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
      return categoryProducts;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
