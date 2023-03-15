import { NextApiRequest, NextApiResponse } from "next";

import { InternalError } from "@/backend/errors/InternalError";

import { ProductPrismaRepository } from "@/backend/database/prisma/repositories/product-prisma-repository";

import { UpdateProduct } from "@/backend/use-cases/update-product";
import { GetAllProductsWithDtDeparture } from "@/backend/use-cases/get-all-products-with-dtdeparture";
import { UpdateDepartureProduct } from "@/backend/use-cases/update-departure-product";

const productPrismaRepository = new ProductPrismaRepository();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const method = req.method;
    switch (method) {
      case "PUT":
        await update(req, res);
        break;
      case "GET":
        await getAllWithDtDeparture(req, res);
        break;
      case "PATCH":
        await updateDeparture(req, res);
        break;
    }
  } catch (error: any) {
    return res.status(500).send(new InternalError(error));
  }
}

async function update(req: NextApiRequest, res: NextApiResponse) {
  const updateProduct = new UpdateProduct(productPrismaRepository);
  const { id, name, nrRequest, dtDeparture, nrInvoice, nrRequestSupplier } =
    req.body;

  await updateProduct.execute({
    id,
    name,
    nrRequest,
    dtDeparture,
    nrInvoice,
    nrRequestSupplier,
  });

  return res.status(200).send("Produto atualizado com sucesso!");
}

async function getAllWithDtDeparture(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const getAllProductsWithDtDeparture = new GetAllProductsWithDtDeparture(
    productPrismaRepository
  );
  return res.status(200).send(await getAllProductsWithDtDeparture.execute());
}

async function updateDeparture(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;
  const updateDepartureProduct = new UpdateDepartureProduct(
    productPrismaRepository
  );
  await updateDepartureProduct.execute(id);
  return res.status(200).send("Alteração de estoque concluída");
}
