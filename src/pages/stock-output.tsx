import { useEffect, useState, useCallback } from "react";

import axios from "axios";
import moment from "moment";

import { GiUnicorn } from "react-icons/gi";

import { Product } from "@/pages";

import { CollapseSimple } from "@/components/CollapseSimple";
import { Dialog } from "@/components/Dialog";
import { FormEditProduct } from "@/components/FormEditProduct";

export default function StockOutput() {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isOpenDialogEditProduct, setOpenDialogEditProduct] = useState(false);
  const [dataFormEditProduct, setDataFormEditProduct] = useState<Product>();

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/product");
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

  function onClickEdit(product: Product) {
    setDataFormEditProduct(product);
    toggleOpenDialogEditProduct();
  }

  function toggleOpenDialogEditProduct() {
    setOpenDialogEditProduct((prev) => !prev);
  }

  function handleAfterSubmitFormEditProduct() {
    toggleOpenDialogEditProduct();
    getData();
  }

  async function onClickDelete(categoryProductId: string | undefined) {
    setLoading(true);
    try {
      await axios.delete("/api/category-product", {
        data: {
          id: categoryProductId,
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
    <main>
      {isLoading ? (
        <div className="h-2 bg-green-500 rounded animate-pulse" />
      ) : (
        <div className="h-2" />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {data.map((dt, index) => (
          <CollapseSimple
            key={index}
            title={dt.name}
            subtitle={moment(dt?.dtDeparture).format("DD/MM/yyyy")}
            onClickDelete={() => onClickDelete(dt?.categoryProductId)}
            onClickEdit={() => onClickEdit(dt)}
          />
        ))}
      </div>

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
    </main>
  );
}
