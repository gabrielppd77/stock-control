import { ProductRepository } from "@/backend/repositories/product-repository";
import { UpdateProductRequest } from "@/backend/use-cases/update-product";
import { PrismaClient } from "@prisma/client";

export class ProductPrismaRepository implements ProductRepository {
  private prisma = new PrismaClient();

  async update(product: UpdateProductRequest): Promise<void> {
    try {
      await this.prisma.product.update({
        where: {
          id: product.id,
        },
        data: {
          name: product.name,
          nrRequest: product.nrRequest,
          dtDeparture: product.dtDeparture,
        },
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async remove(idToRemove: string): Promise<void> {
    try {
      await this.prisma.product.delete({
        where: {
          id: idToRemove,
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
