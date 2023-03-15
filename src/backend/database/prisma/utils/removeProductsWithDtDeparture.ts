import {
  CategoryProduct as CategoryProductPrisma,
  Category as CategoryPrisma,
  Product as ProductPrisma,
} from "@prisma/client";

interface CategoryProductWithIncludes extends CategoryProductPrisma {
  category: CategoryPrisma | null;
  product: ProductPrisma | null;
  categoriesProducts: CategoryProductWithIncludes[] | null;
}

export function removeProductsWithDtDeparture(
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
