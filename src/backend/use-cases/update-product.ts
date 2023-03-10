import { ProductRepository } from "../repositories/product-repository";

export interface UpdateProductRequest {
  id: string;
  name: string;
  nrRequest?: string;
  dtDeparture?: string;
}

export class UpdateProduct {
  constructor(private productRepository: ProductRepository) {}
  async execute(req: UpdateProductRequest) {
    try {
      await this.productRepository.update(req);
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
