import { CategoryProductRepository } from "../repositories/category-product-repository";

export class RemoveCategoryProduct {
  constructor(private categoryProductRepository: CategoryProductRepository) {}
  async execute(idToRemove: string): Promise<void> {
    await this.categoryProductRepository.remove(idToRemove);
  }
}
