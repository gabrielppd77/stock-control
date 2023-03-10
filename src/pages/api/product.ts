import { NextApiRequest, NextApiResponse } from "next";

import { ProductPrismaRepository } from "@/backend/database/prisma/repositories/product-prisma-repository";

import { UpdateProduct } from "@/backend/use-cases/update-product";
import { RemoveProduct } from "@/backend/use-cases/remove-product";

const productPrismaRepository = new ProductPrismaRepository();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  switch (method) {
    case "PUT":
      update(req, res);
      break;
    case "DELETE":
      remove(req, res);
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

async function remove(req: NextApiRequest, res: NextApiResponse) {
  try {
    const removeProduct = new RemoveProduct(productPrismaRepository);

    const { id } = req.body;

    await removeProduct.execute(id);

    return res.status(200).send("Produto removido com sucesso!");
  } catch (error) {
    return res.status(500).send(JSON.stringify(error));
  }
}
