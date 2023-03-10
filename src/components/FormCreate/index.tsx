import { FormEvent, useState } from "react";

import axios from "axios";

import { CategoryProductProps } from "@/pages";

import { Button } from "../Button";
import { InputField } from "../InputField";
import { RadioButton } from "../RadioButton";

interface FormProps {
  onCancel: () => void;
  handleSubmit: () => void;
  idParent: string | null;
}

export function FormCreate(props: FormProps) {
  const { onCancel, handleSubmit, idParent } = props;

  const [categoryOrProduct, setCategoryOrProduct] = useState<
    "category" | "product"
  >("product");
  const [isLoading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    setLoading(true);
    try {
      event.preventDefault();
      const form = new FormData(event.target as HTMLFormElement);
      const data = {
        categoryProductId: idParent,
        categoryName: form.get("categoryName") as string | null,
        productName: form.get("productName") as string | null,
        productNrRequest: form.get("productNrRequest") as string | null,
      };
      await axios.post("/api/category-product", data);
      handleSubmit();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-2 my-2">
      <div className="flex gap-2 mt-2 justify-around">
        <RadioButton
          id="category"
          label="Categoria"
          checked={categoryOrProduct === "category"}
          onChange={() => setCategoryOrProduct("category")}
        />
        <RadioButton
          id="product"
          label="Produto"
          checked={categoryOrProduct === "product"}
          onChange={() => setCategoryOrProduct("product")}
        />
      </div>

      {categoryOrProduct === "category" ? (
        <InputField
          id="categoryName"
          name="categoryName"
          label="Nome da Categoria"
          required
        />
      ) : (
        <>
          <InputField
            id="productName"
            name="productName"
            label="Nome do Produto"
            required
          />
          <InputField
            id="productNrRequest"
            name="productNrRequest"
            label="Número do Pedido"
          />
        </>
      )}

      <div className="grid grid-cols-2 gap-2 mt-2">
        <Button type="button" variant="outlined" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" isLoading={isLoading}>
          Confirmar
        </Button>
      </div>
    </form>
  );
}
