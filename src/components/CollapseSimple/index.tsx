import clsx from "clsx";

import { MdEdit, MdClose } from "react-icons/md";
import { GiUnicorn } from "react-icons/gi";

interface CollapseSimpleProps {
  title: string;
  subtitle?: string;
  onClickEdit: () => void;
  onClickDelete: () => void;
}

export function CollapseSimple(props: CollapseSimpleProps) {
  const { title, subtitle, onClickEdit, onClickDelete } = props;

  return (
    <button
      className={clsx(
        "group",
        "flex select-none items-center justify-between rounded px-4 py-2 text-left text-sm font-medium",
        "bg-white hover:bg-gray-50 text-gray-700",
        "hover:cursor-default focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75"
      )}
    >
      <div className="flex gap-2 items-center">
        <GiUnicorn />
        <div>{title}</div>
        <div className="text-gray-500">{subtitle}</div>
      </div>
      <div className="hidden items-center space-x-3 group-hover:flex">
        <MdEdit
          className="cursor-pointer text-base text-gray-500 hover:text-gray-700"
          onClick={onClickEdit}
        />
        <MdClose
          className="cursor-pointer text-base text-gray-500 hover:text-gray-700"
          onClick={onClickDelete}
        />
      </div>
    </button>
  );
}
