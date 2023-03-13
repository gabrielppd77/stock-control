import { FormEvent, useState } from "react";

import axios from "axios";

import { Product } from "@/pages";

import { InputField } from "../InputField";
import { Button } from "../Button";

interface FormEditProductProps {
  data: Product | undefined;
  onCancel: () => void;
  handleSubmit: () => void;
}

export function FormEditProduct(props: FormEditProductProps) {
  const { data, onCancel, handleSubmit } = props;

  const [isLoading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    setLoading(true);
    try {
      event.preventDefault();
      const form = new FormData(event.target as HTMLFormElement);

      const nrRequest = form.get("nrRequest") as string;
      const dtDeparture = form.get("dtDeparture") as string;

      const dataRequest = {
        id: data?.id,
        name: form.get("name") as string,
        nrRequest: nrRequest ? nrRequest : null,
        dtDeparture: dtDeparture,
      };
      await axios.put("/api/product", dataRequest);
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
        id="name"
        name="name"
        label="Nome do Produto"
        required
        defaultValue={data?.name}
      />
      <InputField
        id="nrRequest"
        name="nrRequest"
        label="Número do Pedido"
        defaultValue={data?.nrRequest}
      />

      <InputField
        id="dtCreate"
        name="dtCreate"
        label="Data de Criação"
        type="date"
        defaultValue={data?.dtCreate?.slice(0, 10)}
        disabled
      />
      <InputField
        id="dtDeparture"
        name="dtDeparture"
        label="Data de Remoção"
        type="date"
        defaultValue={data?.dtDeparture?.slice(0, 10)}
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
