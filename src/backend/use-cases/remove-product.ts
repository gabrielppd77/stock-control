import { ProductRepository } from "../repositories/product-repository";

export class RemoveProduct {
  constructor(private productRepository: ProductRepository) {}
  async execute(idToRemove: string): Promise<void> {
    try {
      await this.productRepository.remove(idToRemove);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
