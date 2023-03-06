import { useCallback, useEffect, useState } from "react";

import axios from "axios";

import { CollapseAddButton } from "@/components/CollapseAddButton";
import { CollapseContainer } from "@/components/CollapseContainer";
import { Dialog } from "@/components/Dialog";

import { CategoryProductProps as CategoryProductPropsDomain } from "@/backend/entities/category-product";

interface CategoryProductProps extends CategoryProductPropsDomain {
  categoriesProducts: CategoryProductPropsDomain[];
  categoryId: string;
  productId: string;
}

export default function Home() {
  const [data, setData] = useState<CategoryProductProps[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isOpenDialog, setOpenDialog] = useState(false);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/category-product");
      setData(Array.isArray(response?.data) ? response.data : []);
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  async function handleClickAdd() {
    await axios.post("/api/category-product", {
      categoryProductId: "bdcfb59e-be01-4206-883c-6e24b35809d5",
      // categoryName: "Mesas de canto",
      productName: "Mesa de canto direita",
      productNrRequest: "132131",
    });
    getData();
  }

  function onOpenChange() {
    setOpenDialog((prev) => !prev);
  }

  return (
    <main className="flex justify-center">
      <div className="w-full max-w-7xl p-8 flex flex-col gap-4">
        <h1 className="text-3xl font-semibold my-2">Controle de Estoque</h1>
        {isLoading ? (
          <div className="h-2 bg-green-500 rounded animate-pulse" />
        ) : (
          <div className="h-2" />
        )}
        {data.map((d) => (
          <CollapseContainer<CategoryProductProps>
            key={d.id}
            option={d}
            onClickAdd={onOpenChange}
            renderOption={(opt) => opt.title}
            onClickEdit={(opt) => console.log(opt)}
            optionsField="categoriesProducts"
          />
        ))}
        <CollapseAddButton onClickAdd={onOpenChange} />
        <Dialog isOpen={isOpenDialog} onOpenChange={onOpenChange} />
      </div>
    </main>
  );
}
