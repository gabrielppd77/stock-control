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

  async getAllWithDtDeparture(): Promise<any[]> {
    try {
      return await this.prisma.product.findMany({
        where: {
          dtDeparture: {
            not: null,
          },
        },
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
