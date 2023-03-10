import {
  CategoryProduct as CategoryProductPrisma,
  Category as CategoryPrisma,
  Product as ProductPrisma,
} from "@prisma/client";

import { CategoryProduct } from "@/backend/entities/category-product";
import { Category } from "@/backend/entities/category";
import { Product } from "@/backend/entities/product";

export class CategoryProductPrismaMapper {
  public static toPrisma(
    categoryProductDomain: CategoryProduct
  ): CategoryProductPrisma & {
    category: CategoryPrisma | null;
    product: ProductPrisma | null;
  } {
    const category = (
      categoryProductDomain.category
        ? {
            id: categoryProductDomain.category.id,
            name: categoryProductDomain.category.name,
          }
        : null
    ) as CategoryPrisma | null;
    const product = (
      categoryProductDomain.product
        ? {
            id: categoryProductDomain.product.id,
            dtCreate: categoryProductDomain.product.dtCreate,
            dtDeparture: categoryProductDomain.product.dtDeparture,
            name: categoryProductDomain.product.name,
            nrRequest: categoryProductDomain.product.nrRequest,
          }
        : null
    ) as ProductPrisma | null;

    const categoryProduct = {
      id: categoryProductDomain.id,
      categoryProductId: categoryProductDomain.categoryProductId,
      categoryId: categoryProductDomain.category?.id,
      category: category,
      product: product,
      productId: categoryProductDomain.product?.id,
    } as CategoryProductPrisma & {
      category: CategoryPrisma | null;
      product: ProductPrisma | null;
    };

    return categoryProduct;
  }

  public static toDomain(
    categoryProductPrisma: CategoryProductPrisma & {
      category: CategoryPrisma | null;
      product: ProductPrisma | null;
    }
  ): CategoryProduct {
    const product = categoryProductPrisma.product
      ? new Product({
          id: categoryProductPrisma.product.id,
          name: categoryProductPrisma.product.name,
          dtDeparture: categoryProductPrisma.product?.dtDeparture || undefined,
          nrRequest: categoryProductPrisma.product?.nrRequest || undefined,
        })
      : undefined;

    const category = categoryProductPrisma.category
      ? new Category({
          id: categoryProductPrisma.category.id,
          name: categoryProductPrisma.category.name,
        })
      : undefined;

    const categoryProduct = new CategoryProduct({
      id: categoryProductPrisma.id,
      categoryProductId: categoryProductPrisma?.categoryProductId || undefined,
      product,
      category,
    });

    return categoryProduct;
  }
}
