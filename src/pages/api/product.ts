import { NextApiRequest, NextApiResponse } from "next";

import { ProductPrismaRepository } from "@/backend/database/prisma/repositories/product-prisma-repository";

import { UpdateProduct } from "@/backend/use-cases/update-product";

const productPrismaRepository = new ProductPrismaRepository();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  switch (method) {
    case "PUT":
      update(req, res);
      break;
  }
}

async function update(req: NextApiRequest, res: NextApiResponse) {
  try {
    const updateProduct = new UpdateProduct(productPrismaRepository);
    const { id, name, nrRequest, dtDeparture } = req.body;

    await updateProduct.execute({
      id,
      name,
      nrRequest,
      dtDeparture,
    });

    return res.status(200).send("Produto atualizado com sucesso!");
  } catch (error) {
    return res.status(500).send(error);
  }
}
