import { NextApiRequest, NextApiResponse } from "next";

import { InternalError } from "@/backend/errors/InternalError";

import { CreateCategoryProduct } from "@/backend/use-cases/create-category-product";

import { CategoryProductPrismaRepository } from "@/backend/database/prisma/repositories/category-product-prisma-repository";
import { GetAllCategoryProduct } from "@/backend/use-cases/get-all-category-product";
import { RemoveCategoryProduct } from "@/backend/use-cases/remove-category-product";

const categoryProductPrismaRepository = new CategoryProductPrismaRepository();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const method = req.method;
    switch (method) {
      case "POST":
        await create(req, res);
        break;
      case "GET":
        await getAll(req, res);
        break;
      case "DELETE":
        await remove(req, res);
        break;
    }
  } catch (error: any) {
    return res.status(500).send(new InternalError(error));
  }
}

async function create(req: NextApiRequest, res: NextApiResponse) {
  const createCategoryProduct = new CreateCategoryProduct(
    categoryProductPrismaRepository
  );

  const {
    categoryProductId,
    categoryName,
    productName,
    productNrRequest,
    nrInvoice,
    nrRequestSupplier,
  } = req.body;

  await createCategoryProduct.execute({
    categoryProductId,
    categoryName,
    productName,
    productNrRequest,
    nrInvoice,
    nrRequestSupplier,
  });

  return res.status(201).send("Categoria/Produto criado com sucesso!");
}

export async function getAll(req: NextApiRequest, res: NextApiResponse) {
  const getAllCategoryProduct = new GetAllCategoryProduct(
    categoryProductPrismaRepository
  );
  return res.status(200).send(await getAllCategoryProduct.execute());
}

async function remove(req: NextApiRequest, res: NextApiResponse) {
  const removeCategoryProduct = new RemoveCategoryProduct(
    categoryProductPrismaRepository
  );

  const { id } = req.body;

  await removeCategoryProduct.execute(id);

  return res.status(200).send("Categoria/Produto removido com sucesso!");
}
