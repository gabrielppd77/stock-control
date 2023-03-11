import { NextApiRequest, NextApiResponse } from "next";

import { CategoryPrismaRepository } from "@/backend/database/prisma/repositories/category-prisma-repository";

import { UpdateCategory } from "@/backend/use-cases/update-category";

const categoryPrismaRepository = new CategoryPrismaRepository();

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
    const updateProduct = new UpdateCategory(categoryPrismaRepository);

    const { id, name } = req.body;

    await updateProduct.execute({
      id,
      name,
    });

    return res.status(200).send("Categoria atualizada com sucesso!");
  } catch (error) {
    return res.status(500).send(error);
  }
}
