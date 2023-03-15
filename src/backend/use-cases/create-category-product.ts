import { Category } from "../entities/category";
import { Product } from "../entities/product";
import { CategoryProduct } from "../entities/category-product";
import { CategoryProductRepository } from "../repositories/category-product-repository";

interface CreateCategoryProductRequest {
  categoryProductId?: string;
  categoryName?: string;
  productName?: string;
  productNrRequest?: string;
  nrRequestSupplier?: string;
  nrInvoice?: string;
}

export class CreateCategoryProduct {
  constructor(private categoryProductRepository: CategoryProductRepository) {}
  async execute(req: CreateCategoryProductRequest): Promise<void> {
    const {
      categoryName,
      productName,
      productNrRequest,
      categoryProductId,
      nrInvoice,
      nrRequestSupplier,
    } = req;

    const categoryProduct = new CategoryProduct({
      category: categoryName ? new Category({ name: categoryName }) : undefined,
      product: productName
        ? new Product({
            name: productName,
            nrRequest: productNrRequest,
            nrInvoice: nrInvoice,
            nrRequestSupplier: nrRequestSupplier,
          })
        : undefined,
      categoryProductId,
    });

    await this.categoryProductRepository.create(categoryProduct);
  }
}
