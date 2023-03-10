import { CategoryProductRepository } from "../repositories/category-product-repository";
import { CategoryProduct } from "../entities/category-product";

export class GetAllCategoryProduct {
  constructor(private categoryProductRepository: CategoryProductRepository) {}

  async execute(): Promise<CategoryProduct[]> {
    try {
      return await this.categoryProductRepository.getAll();
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
