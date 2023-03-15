import { ProductRepository } from "../repositories/product-repository";

export class GetAllProductsWithDtDeparture {
  constructor(private productRepository: ProductRepository) {}
  async execute(): Promise<any[]> {
    return await this.productRepository.getAllWithDtDeparture();
  }
}
