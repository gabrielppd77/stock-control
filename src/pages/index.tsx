import { useCallback, useEffect, useState } from "react";

import axios from "axios";

import { CollapseAddButton } from "@/components/CollapseAddButton";
import { CollapseContainer } from "@/components/CollapseContainer";
import { FormEditProduct } from "@/components/FormEditProduct";
import { Dialog } from "@/components/Dialog";
import { FormWarningDelete } from "@/components/FormWarningDelete";
import { FormEditCategory } from "@/components/FormEditCategory";
import { FormCreateProduct } from "@/components/FormCreateProduct";

import { FormCreateCategory } from "@/components/FormCreateCategory";

export interface Product {
  id: string;
  name: string;
  dtCreate: string;
  dtDeparture?: string;
  nrRequest?: string;
  categoryProductId?: string;
  nrRequestSupplier?: string;
  nrInvoice?: string;
}

export interface Category {
  id: string;
  name: string;
  categoryProductId?: string;
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
  const [isOpenDialogCreateCategory, setOpenDialogCreate] = useState(false);
  const [isOpenDialogEditProduct, setOpenDialogEditProduct] = useState(false);
  const [isOpenDialogEditCategory, setOpenDialogEditCategory] = useState(false);
  const [isOpenDialogWarningRemove, setOpenDialogWarningRemove] =
    useState(false);
  const [isOpenCreateProduct, setOpenDialogMultiply] = useState(false);
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

  function toggleOpenDialogCreateCategory() {
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

  function toggleOpenDialogCreateProduct() {
    setOpenDialogMultiply((prev) => !prev);
  }

  async function handleAfterSubmitFormCreateCategory() {
    getData();
    toggleOpenDialogCreateCategory();
  }

  async function handleAfterSubmitFormEditProduct() {
    getData();
    toggleOpenDialogEditProduct();
  }

  async function handleAfterSubmitCreateProduct() {
    getData();
    toggleOpenDialogCreateProduct();
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
    toggleOpenDialogCreateCategory();
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

  function onClickMultiply(parentId: string | null) {
    setIdParent(parentId);
    toggleOpenDialogCreateProduct();
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

  async function onClickChangeStock(productId: string) {
    setLoading(true);
    try {
      await axios.patch("/api/product", {
        id: productId,
      });
      getData();
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col gap-4">
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
          renderTitleOption={(opt) =>
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
          onClickMultiply={(opt) => onClickMultiply(opt.id)}
          onClickChangeStock={(opt) => onClickChangeStock(opt.product.id)}
        />
      ))}
      <CollapseAddButton
        onClickAdd={() => onClickAdd(null)}
        title="Adicionar Categoria"
      />

      <Dialog
        title="Adicionar uma Categoria"
        isOpen={isOpenDialogCreateCategory}
        onOpenChange={toggleOpenDialogCreateCategory}
      >
        <FormCreateCategory
          onCancel={toggleOpenDialogCreateCategory}
          handleSubmit={handleAfterSubmitFormCreateCategory}
          idParent={idParent}
        />
      </Dialog>

      <Dialog
        title="Adicionar Produtos"
        isOpen={isOpenCreateProduct}
        onOpenChange={toggleOpenDialogCreateProduct}
      >
        <FormCreateProduct
          idParent={idParent}
          onCancel={toggleOpenDialogCreateProduct}
          handleSubmit={handleAfterSubmitCreateProduct}
        />
      </Dialog>

      <Dialog
        title="Editar Produto"
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
        title="Editar Categoria"
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
    </main>
  );
}
