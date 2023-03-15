import { ProductRepository } from "../repositories/product-repository";

export class UpdateDepartureProduct {
  constructor(private productRepository: ProductRepository) {}
  async execute(productId: string) {
    await this.productRepository.updateDeparture(productId);
  }
}
