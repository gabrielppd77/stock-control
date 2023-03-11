import { useCallback, useEffect, useState } from "react";

import axios from "axios";

import { CollapseAddButton } from "@/components/CollapseAddButton";
import { CollapseContainer } from "@/components/CollapseContainer";
import { FormCreate } from "@/components/FormCreate";
import { FormEditProduct } from "@/components/FormEditProduct";
import { Dialog } from "@/components/Dialog";
import { FormWarningDelete } from "@/components/FormWarningDelete";
import { FormEditCategory } from "@/components/FormEditCategory";

import { GiUnicorn } from "react-icons/gi";
import { MdCategory } from "react-icons/md";

export interface Product {
  id: string;
  name: string;
  dtCreate: string;
  dtDeparture?: string;
  nrRequest?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface CategoryProductProps {
  id: string;
  categoriesProducts: CategoryProductProps[];
  categoryId: string;
  productId: string;
  product: Product;
  category: Category;
}

export default function Home() {
  const [data, setData] = useState<CategoryProductProps[]>([]);
  const [dataFormEditProduct, setDataFormEditProduct] = useState<Product>();
  const [dataFormEditCategory, setDataFormEditCategory] = useState<Category>();
  const [idParent, setIdParent] = useState<string | null>("");
  const [isLoading, setLoading] = useState(false);
  const [isOpenDialogCreate, setOpenDialogCreate] = useState(false);
  const [isOpenDialogEditProduct, setOpenDialogEditProduct] = useState(false);
  const [isOpenDialogEditCategory, setOpenDialogEditCategory] = useState(false);
  const [isOpenDialogWarningRemove, setOpenDialogWarningRemove] =
    useState(false);
  const [dataDialogWarningRemove, setDataDialogWarningRemove] =
    useState<CategoryProductProps>();

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

  function toggleOpenDialogCreate() {
    setOpenDialogCreate((prev) => !prev);
  }

  function toggleOpenDialogEditProduct() {
    setOpenDialogEditProduct((prev) => !prev);
  }
  function toggleOpenDialogEditCategory() {
    setOpenDialogEditCategory((prev) => !prev);
  }

  function toggleOpenDialogWarningRemove() {
    setOpenDialogWarningRemove((prev) => !prev);
  }

  async function handleAfterSubmitFormCreate() {
    getData();
    toggleOpenDialogCreate();
  }

  async function handleAfterSubmitFormEditProduct() {
    getData();
    toggleOpenDialogEditProduct();
  }

  async function handleAfterSubmitFormEditCategory() {
    getData();
    toggleOpenDialogEditCategory();
  }

  function handleAfterSubmitFormWarningRemove() {
    if (dataDialogWarningRemove) {
      toggleOpenDialogWarningRemove();
      onClickDelete(dataDialogWarningRemove);
    }
  }

  function onClickAdd(parentId: string | null) {
    setIdParent(parentId);
    toggleOpenDialogCreate();
  }

  function onClickEditProduct(product: Product) {
    setDataFormEditProduct(product);
    toggleOpenDialogEditProduct();
  }

  function onClickEditCategory(category: Category) {
    setDataFormEditCategory(category);
    toggleOpenDialogEditCategory();
  }

  function onClickEdit(categoryProduct: CategoryProductProps) {
    if (categoryProduct.product)
      return onClickEditProduct(categoryProduct.product);
    onClickEditCategory(categoryProduct.category);
  }

  function onClickOpenWarningRemove(categoryProduct: CategoryProductProps) {
    toggleOpenDialogWarningRemove();
    setDataDialogWarningRemove(categoryProduct);
  }

  async function onClickDelete(categoryProduct: CategoryProductProps) {
    setLoading(true);
    try {
      await axios.delete("/api/category-product", {
        data: {
          id: categoryProduct.id,
        },
      });
      getData();
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
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
            haveChildrens={(opt) => opt.category !== null}
            renderOption={(opt) =>
              opt.category
                ? opt.category.name
                : opt.product
                ? opt.product.name
                : ""
            }
            optionsField="categoriesProducts"
            onClickAdd={(opt) => onClickAdd(opt.id)}
            onClickEdit={(opt) => onClickEdit(opt)}
            onClickDelete={(opt) => onClickOpenWarningRemove(opt)}
          />
        ))}
        <CollapseAddButton onClickAdd={() => onClickAdd(null)} />
        <Dialog
          title="Categoria/Produto"
          isOpen={isOpenDialogCreate}
          onOpenChange={toggleOpenDialogCreate}
        >
          <FormCreate
            onCancel={toggleOpenDialogCreate}
            handleSubmit={handleAfterSubmitFormCreate}
            idParent={idParent}
          />
        </Dialog>
        <Dialog
          title={
            <div className="flex items-center gap-4">
              <GiUnicorn />
              Editar Produto
            </div>
          }
          isOpen={isOpenDialogEditProduct}
          onOpenChange={toggleOpenDialogEditProduct}
        >
          <FormEditProduct
            handleSubmit={handleAfterSubmitFormEditProduct}
            data={dataFormEditProduct}
            onCancel={toggleOpenDialogEditProduct}
          />
        </Dialog>

        <Dialog
          title={
            <div className="flex items-center gap-4">
              <MdCategory />
              Editar Categoria
            </div>
          }
          isOpen={isOpenDialogEditCategory}
          onOpenChange={toggleOpenDialogEditCategory}
        >
          <FormEditCategory
            handleSubmit={handleAfterSubmitFormEditCategory}
            data={dataFormEditCategory}
            onCancel={toggleOpenDialogEditCategory}
          />
        </Dialog>

        <Dialog
          title="Confirme a remoção"
          isOpen={isOpenDialogWarningRemove}
          onOpenChange={toggleOpenDialogWarningRemove}
        >
          <FormWarningDelete
            handleSubmit={handleAfterSubmitFormWarningRemove}
            onCancel={toggleOpenDialogWarningRemove}
          />
        </Dialog>
      </div>
    </main>
  );
}
