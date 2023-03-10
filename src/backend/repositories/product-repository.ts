import { UpdateProductRequest } from "../use-cases/update-product";

export interface ProductRepository {
  update(product: UpdateProductRequest): Promise<void>;
  remove(idToRemove: string): Promise<void>;
}
