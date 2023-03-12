import {
  PrismaClient,
  CategoryProduct as CategoryProductPrisma,
  Category as CategoryPrisma,
  Product as ProductPrisma,
} from "@prisma/client";

import { CategoryProductRepository } from "@/backend/repositories/category-product-repository";

import { CategoryProduct } from "@/backend/entities/category-product";
import { CategoryProductPrismaMapper } from "../mappers/category-product-prisma-mapper";

interface CategoryProductWithIncludes extends CategoryProductPrisma {
  category: CategoryPrisma | null;
  product: ProductPrisma | null;
  categoriesProducts: CategoryProductWithIncludes[] | null;
}

function removeProductsWithDtDeparture(
  categoriesProducts: CategoryProductWithIncludes[] | null
): CategoryProductWithIncludes[] | [] {
  if (!Array.isArray(categoriesProducts)) return [];
  if (!(categoriesProducts.length > 0)) return [];

  const categoriesProductsFiltred = [] as CategoryProductWithIncludes[];

  categoriesProducts.forEach((dt) => {
    if (dt?.product?.dtDeparture != null) return;

    dt.categoriesProducts = removeProductsWithDtDeparture(
      dt.categoriesProducts
    );

    categoriesProductsFiltred.push(dt);
  });

  return categoriesProductsFiltred;
}

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
      return removeProductsWithDtDeparture(categoryProducts);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async remove(idToRemove: string): Promise<void> {
    try {
      await this.prisma.categoryProduct.delete({
        where: {
          id: idToRemove,
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
