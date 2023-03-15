import { FormEvent, useState } from "react";

import axios from "axios";

import { Category } from "@/pages";

import { InputField } from "../InputField";
import { Button } from "../Button";

interface FormEditCategoryProps {
  data: Category | undefined;
  onCancel: () => void;
  handleSubmit: () => void;
}

export function FormEditCategory(props: FormEditCategoryProps) {
  const { data, onCancel, handleSubmit } = props;

  const [isLoading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    setLoading(true);
    try {
      event.preventDefault();
      const form = new FormData(event.target as HTMLFormElement);
      const dataRequest = {
        id: data?.id,
        name: form.get("name") as string,
      };
      await axios.put("/api/category", dataRequest);
      handleSubmit();
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-2 my-2">
      <InputField
        id="name"
        name="name"
        label="Nome da Categoria"
        required
        defaultValue={data?.name}
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
