import { ProductRepository } from "@/backend/repositories/product-repository";
import { UpdateProductRequest } from "@/backend/use-cases/update-product";
import { PrismaClient } from "@prisma/client";

import moment from "moment";

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
          dtDeparture: product.dtDeparture
            ? moment(product.dtDeparture).toDate()
            : undefined,
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
        orderBy: {
          dtDeparture: "desc",
        },
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
