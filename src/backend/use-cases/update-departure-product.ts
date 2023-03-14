import { ProductRepository } from "../repositories/product-repository";

export class UpdateDepartureProduct {
  constructor(private productRepository: ProductRepository) {}
  async execute(productId: string) {
    try {
      await this.productRepository.updateDeparture(productId);
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
