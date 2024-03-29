import { UpdateProductRequest } from "../use-cases/update-product";

export interface ProductRepository {
  update(product: UpdateProductRequest): Promise<void>;
  getAllWithDtDeparture(): Promise<any[]>;
  updateDeparture(productId: string): Promise<void>;
}
