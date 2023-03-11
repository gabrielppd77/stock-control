import { UpdateCategoryRequest } from "../use-cases/update-category";

export interface CategoryRepository {
  update(categoryRequest: UpdateCategoryRequest): Promise<void>;
}
