import { PrismaClient } from "@prisma/client";

import { CategoryRepository } from "@/backend/repositories/category-repository";
import { UpdateCategoryRequest } from "@/backend/use-cases/update-category";

export class CategoryPrismaRepository implements CategoryRepository {
  private prisma = new PrismaClient();

  async update(categoryRequest: UpdateCategoryRequest): Promise<void> {
    await this.prisma.category.update({
      where: {
        id: categoryRequest.id,
      },
      data: {
        name: categoryRequest.name,
      },
    });
  }
}
