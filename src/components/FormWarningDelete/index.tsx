import { Button } from "../Button";

interface FormWarningDeleteProps {
  handleSubmit: () => void;
  onCancel: () => void;
}

export function FormWarningDelete(props: FormWarningDeleteProps) {
  const { handleSubmit, onCancel } = props;

  return (
    <div>
      <h3 className="text-gray-700 py-4">
        Deseja realmente remover o item selecionado?
      </h3>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <Button variant="outlined" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="button" onClick={handleSubmit}>
          Confirmar
        </Button>
      </div>
    </div>
  );
}
