import { UpdateProductRequest } from "../use-cases/update-product";

export interface ProductRepository {
  update(product: UpdateProductRequest): Promise<void>;
}
