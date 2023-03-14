import { FormEvent, useState } from "react";

import axios from "axios";

import { Button } from "../Button";
import { InputField } from "../InputField";

interface FormCreateCategoryProps {
  onCancel: () => void;
  handleSubmit: () => void;
  idParent: string | null;
}

export function FormCreateCategory(props: FormCreateCategoryProps) {
  const { onCancel, handleSubmit, idParent } = props;

  const [isLoading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    setLoading(true);
    try {
      event.preventDefault();
      const form = new FormData(event.target as HTMLFormElement);
      const data = {
        categoryProductId: idParent,
        categoryName: form.get("categoryName") as string | null,
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
      <InputField
        id="categoryName"
        name="categoryName"
        label="Nome da Categoria"
        required
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
