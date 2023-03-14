import { NextApiRequest, NextApiResponse } from "next";

import { ProductPrismaRepository } from "@/backend/database/prisma/repositories/product-prisma-repository";

import { UpdateProduct } from "@/backend/use-cases/update-product";
import { GetAllProductsWithDtDeparture } from "@/backend/use-cases/get-all-products-with-dtdeparture";
import { UpdateDepartureProduct } from "@/backend/use-cases/update-departure-product";

const productPrismaRepository = new ProductPrismaRepository();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  switch (method) {
    case "PUT":
      update(req, res);
      break;
    case "GET":
      getAllWithDtDeparture(req, res);
      break;
    case "PATCH":
      updateDeparture(req, res);
      break;
  }
}

async function update(req: NextApiRequest, res: NextApiResponse) {
  try {
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
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function getAllWithDtDeparture(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const getAllProductsWithDtDeparture = new GetAllProductsWithDtDeparture(
      productPrismaRepository
    );
    return res.status(200).send(await getAllProductsWithDtDeparture.execute());
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function updateDeparture(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.body;
    const updateDepartureProduct = new UpdateDepartureProduct(
      productPrismaRepository
    );
    await updateDepartureProduct.execute(id);
    return res.status(200).send("Alteração de estoque concluída");
  } catch (error) {
    return res.status(500).send(error);
  }
}
