import clsx from "clsx";

import { MdEdit } from "react-icons/md";

interface CollapseSimpleProps {
  title: string;
  onClickEdit: () => void;
}

export function CollapseSimple(props: CollapseSimpleProps) {
  const { title, onClickEdit } = props;

  return (
    <div
      key={`collapsible`}
      className={clsx(
        "group",
        "flex select-none items-center justify-between rounded px-4 py-2 text-left text-sm font-medium",
        "bg-white hover:bg-gray-50"
      )}
    >
      {title}
      <div className="hidden items-center space-x-3 group-hover:flex">
        <MdEdit
          className="cursor-pointer text-base text-gray-500 hover:text-gray-700"
          onClick={onClickEdit}
        />
      </div>
    </div>
  );
}
