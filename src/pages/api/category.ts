import { NextApiRequest, NextApiResponse } from "next";

import { InternalError } from "@/backend/errors/InternalError";

import { CategoryPrismaRepository } from "@/backend/database/prisma/repositories/category-prisma-repository";

import { UpdateCategory } from "@/backend/use-cases/update-category";

const categoryPrismaRepository = new CategoryPrismaRepository();

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
    }
  } catch (error: any) {
    return res.status(500).send(new InternalError(error));
  }
}

async function update(req: NextApiRequest, res: NextApiResponse) {
  const updateProduct = new UpdateCategory(categoryPrismaRepository);

  const { id, name } = req.body;

  await updateProduct.execute({
    id,
    name,
  });

  return res.status(200).send("Categoria atualizada com sucesso!");
}
