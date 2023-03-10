import { ChangeEventHandler } from "react";

interface RadioButtonProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export function RadioButton(props: RadioButtonProps) {
  const { id, label, checked, onChange } = props;
  return (
    <div className="flex items-center rounded-3xl">
      <input
        id={id}
        type="radio"
        name="default-radio-group "
        className="w-5 h-5 hover:cursor-pointer"
        checked={checked}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300 hover:cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
}
