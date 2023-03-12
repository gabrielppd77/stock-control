import { ProductRepository } from "../repositories/product-repository";

export class GetAllProductsWithDtDeparture {
  constructor(private productRepository: ProductRepository) {}
  async execute(): Promise<any[]> {
    try {
      return await this.productRepository.getAllWithDtDeparture();
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
