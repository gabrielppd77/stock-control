import { BsPlusSquareFill } from "react-icons/bs";

interface CollapseAddButtonProps {
  onClickAdd: () => void;
}

export function CollapseAddButton(props: CollapseAddButtonProps) {
  const { onClickAdd } = props;
  return (
    <button
      onClick={onClickAdd}
      className="w-full flex justify-center items-center h-11 bg-slate-200 rounded hover:brightness-90 duration-300 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75"
    >
      <div>
        <BsPlusSquareFill className="text-3xl text-green-500" />
      </div>
    </button>
  );
}
