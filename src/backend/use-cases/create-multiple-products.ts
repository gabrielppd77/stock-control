import { Product } from "../entities/product";
import { CategoryProduct } from "../entities/category-product";
import { CategoryProductRepository } from "../repositories/category-product-repository";

interface CreateMultipleProductsRequest {
  categoryProductId: string;
  numberToMultiply: number;
  productName: string;
  productNrRequest?: string;
  nrRequestSupplier?: string;
  nrInvoice?: string;
}

export class CreateMultipleProducts {
  constructor(private categoryProductRepository: CategoryProductRepository) {}
  async execute(req: CreateMultipleProductsRequest): Promise<void> {
    const {
      categoryProductId,
      productName,
      productNrRequest,
      nrInvoice,
      nrRequestSupplier,
      numberToMultiply,
    } = req;

    for (let index = 0; index < numberToMultiply; index++) {
      await this.categoryProductRepository.create(
        new CategoryProduct({
          categoryProductId,
          product: new Product({
            name: productName ? productName : (index + 1).toString(),
            nrRequest: productNrRequest,
            nrInvoice: nrInvoice,
            nrRequestSupplier: nrRequestSupplier,
          }),
          category: undefined,
        })
      );
    }
  }
}
