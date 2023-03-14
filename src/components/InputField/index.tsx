import clsx from "clsx";

interface InputFieldProps {
  id: string;
  name: string;
  label?: string;
  placeHolder?: string;
  defaultValue?: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
}

export function InputField(props: InputFieldProps) {
  const {
    id,
    name,
    label,
    placeHolder,
    autoComplete,
    required,
    disabled,
    defaultValue,
    type = "text",
    min,
    max,
  } = props;
  return (
    <fieldset className="w-full">
      <label
        htmlFor={id}
        className="text-md font-medium text-gray-700 dark:text-gray-400"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeHolder}
        autoComplete={autoComplete}
        className={clsx(
          "mt-1 block w-full rounded h-10 px-2",
          "text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-600",
          "border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800",
          "focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75",
          disabled && "hover:cursor-not-allowed"
        )}
        required={required}
        defaultValue={defaultValue}
        disabled={disabled}
        min={min}
        max={max}
      />
    </fieldset>
  );
}
