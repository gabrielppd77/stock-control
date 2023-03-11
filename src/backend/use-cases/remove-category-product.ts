import { CategoryProductRepository } from "../repositories/category-product-repository";

export class RemoveCategoryProduct {
  constructor(private categoryProductRepository: CategoryProductRepository) {}
  async execute(idToRemove: string): Promise<void> {
    try {
      await this.categoryProductRepository.remove(idToRemove);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
