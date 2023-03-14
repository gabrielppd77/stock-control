import { useState, FormEvent } from "react";

import axios from "axios";

import { Button } from "../Button";
import { InputField } from "../InputField";

interface FormCreateProductProps {
  onCancel: () => void;
  handleSubmit: () => void;
  idParent: string | null;
}

export function FormCreateProduct(props: FormCreateProductProps) {
  const { onCancel, handleSubmit, idParent } = props;

  const [isLoading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    setLoading(true);
    try {
      event.preventDefault();
      const form = new FormData(event.target as HTMLFormElement);
      const dataRequest = {
        categoryProductId: idParent,
        numberToMultiply: form.get("numberToMultiply") as string,
        productName: form.get("productName") as string | null,
        productNrRequest: form.get("productNrRequest") as string | null,
        nrRequestSupplier: form.get("nrRequestSupplier") as string | null,
        nrInvoice: form.get("nrInvoice") as string | null,
      };
      await axios.post("/api/category-product/create-many", dataRequest);
      handleSubmit();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-2 my-2">
      <InputField
        label="Multiplicador"
        id="numberToMultiply"
        name="numberToMultiply"
        type="number"
        required
        min={0}
        max={20}
        defaultValue="3"
      />
      <InputField id="productName" name="productName" label="Nome do Produto" />
      <InputField
        id="productNrRequest"
        name="productNrRequest"
        label="Número do Pedido"
      />
      <InputField
        id="nrRequestSupplier"
        name="nrRequestSupplier"
        label="Número do Pedido do Fornecedor"
      />

      <InputField
        id="nrInvoice"
        name="nrInvoice"
        label="Número da Nota Fiscal"
      />
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
