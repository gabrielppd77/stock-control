import { NextApiRequest, NextApiResponse } from "next";

import { CategoryProductPrismaRepository } from "@/backend/database/prisma/repositories/category-product-prisma-repository";
import { CreateMultipleProducts } from "@/backend/use-cases/create-multiple-products";

const categoryProductPrismaRepository = new CategoryProductPrismaRepository();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  switch (method) {
    case "POST":
      createMany(req, res);
      break;
  }
}

async function createMany(req: NextApiRequest, res: NextApiResponse) {
  try {
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
  } catch (error) {
    return res.status(500).send(error);
  }
}
