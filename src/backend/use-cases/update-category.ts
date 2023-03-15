import { CategoryRepository } from "../repositories/category-repository";

export interface UpdateCategoryRequest {
  id: string;
  name: string;
}

export class UpdateCategory {
  constructor(private categoryRepository: CategoryRepository) {}
  async execute(req: UpdateCategoryRequest) {
    const { id, name } = req;
    await this.categoryRepository.update({ id, name });
  }
}
