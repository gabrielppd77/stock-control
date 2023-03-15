import { NextApiRequest, NextApiResponse } from "next";

import { InternalError } from "@/backend/errors/InternalError";

import { CategoryProductPrismaRepository } from "@/backend/database/prisma/repositories/category-product-prisma-repository";
import { CreateMultipleProducts } from "@/backend/use-cases/create-multiple-products";

const categoryProductPrismaRepository = new CategoryProductPrismaRepository();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const method = req.method;
    switch (method) {
      case "POST":
        await createMany(req, res);
        break;
    }
  } catch (error: any) {
    return res.status(500).send(new InternalError(error));
  }
}

async function createMany(req: NextApiRequest, res: NextApiResponse) {
  const createMultipleProducts = new CreateMultipleProducts(
    categoryProductPrismaRepository
  );

  const {
    categoryProductId,
    productName,
    productNrRequest,
    nrInvoice,
    nrRequestSupplier,
    numberToMultiply,
  } = req.body;

  await createMultipleProducts.execute({
    categoryProductId,
    productName,
    productNrRequest,
    nrInvoice,
    nrRequestSupplier,
    numberToMultiply,
  });

  return res.status(201).send("Produtos criados com sucesso!");
}
