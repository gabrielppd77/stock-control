import { ProductRepository } from "@/backend/repositories/product-repository";
import { UpdateProductRequest } from "@/backend/use-cases/update-product";
import { PrismaClient } from "@prisma/client";

import moment from "moment";

export class ProductPrismaRepository implements ProductRepository {
  private prisma = new PrismaClient();

  async update(product: UpdateProductRequest): Promise<void> {
    await this.prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        name: product.name,
        nrRequest: product.nrRequest,
        dtDeparture: product.dtDeparture
          ? moment(product.dtDeparture).toDate()
          : null,
        nrInvoice: product.nrInvoice,
        nrRequestSupplier: product.nrRequestSupplier,
      },
    });
  }

  async getAllWithDtDeparture(): Promise<any[]> {
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
  }

  async updateDeparture(productId: string): Promise<void> {
    const product = await this.prisma.product.findFirst({
      where: {
        id: productId,
      },
    });
    product?.dtDeparture;
    await this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        dtDeparture: product?.dtDeparture ? null : new Date(),
      },
    });
  }
}
