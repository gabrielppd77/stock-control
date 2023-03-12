import { CategoryProduct } from "../entities/category-product";

export interface CategoryProductRepository {
  create(categoryProduct: CategoryProduct): Promise<void>;
  getAll(): Promise<any[]>;
  remove(idToRemove: string): Promise<void>;
}
