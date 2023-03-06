import { Category } from "../entities/category";
import { Product } from "../entities/product";
import { CategoryProduct } from "../entities/category-product";
import { CategoryProductRepository } from "../repositories/category-product-repository";

interface CreateCategoryProductRequest {
  categoryProductId?: string;
  categoryName?: string;
  productName?: string;
  productNrRequest?: string;
}

export class CreateCategoryProduct {
  constructor(private categoryProductRepository: CategoryProductRepository) {}
  async execute(req: CreateCategoryProductRequest): Promise<void> {
    try {
      const { categoryName, productName, productNrRequest, categoryProductId } =
        req;

      let title = "";

      if (categoryName) title = categoryName;
      if (productName) title = productName;

      const categoryProduct = new CategoryProduct({
        title,
        category: categoryName
          ? new Category({ name: categoryName })
          : undefined,
        product: productName
          ? new Product({
              name: productName,
              nrRequest: productNrRequest,
            })
          : undefined,
        categoryProductId,
      });

      await this.categoryProductRepository.create(categoryProduct);
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
