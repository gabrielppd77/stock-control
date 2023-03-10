import { NextApiRequest, NextApiResponse } from "next";

import { CreateCategoryProduct } from "@/backend/use-cases/create-category-product";

import { CategoryProductPrismaRepository } from "@/backend/database/prisma/repositories/category-product-prisma-repository";
import { GetAllCategoryProduct } from "@/backend/use-cases/get-all-category-product";

const categoryProductPrismaRepository = new CategoryProductPrismaRepository();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  switch (method) {
    case "POST":
      create(req, res);
      break;
    case "GET":
      getAll(req, res);
      break;
  }
}

async function create(req: NextApiRequest, res: NextApiResponse) {
  try {
    const createCategory = new CreateCategoryProduct(
      categoryProductPrismaRepository
    );

    const { categoryProductId, categoryName, productName, productNrRequest } =
      req.body;

    await createCategory.execute({
      categoryProductId,
      categoryName,
      productName,
      productNrRequest,
    });

    return res.status(201).send("Categoria/Produto criado com sucesso!");
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function getAll(req: NextApiRequest, res: NextApiResponse) {
  try {
    const getAllCategoryProduct = new GetAllCategoryProduct(
      categoryProductPrismaRepository
    );
    return res.status(200).send(await getAllCategoryProduct.execute());
  } catch (error) {
    return res.status(500).send(error);
  }
}
