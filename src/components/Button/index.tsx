import clsx from "clsx";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ButtonProps {
  children: string;
  variant?: "contained" | "outlined";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  isLoading?: boolean;
}

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "contained",
    type = "button",
    onClick,
    isLoading = false,
  } = props;
  return (
    <button
      className={clsx(
        "inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium",
        variant === "contained"
          ? "bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:text-gray-100 dark:hover:bg-green-600 border border-transparent"
          : "bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-100 hover:dark:bg-gray-600 border border-gray-300 ",
        "focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75 transition duration-300"
      )}
      type={type}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-3" />
      ) : (
        children
      )}
    </button>
  );
}
