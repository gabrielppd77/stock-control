import { useState } from "react";

import clsx from "clsx";

import { Transition } from "@headlessui/react";
import { MdExpandMore, MdCategory, MdEdit, MdClose } from "react-icons/md";

import { CollapseSimple } from "../CollapseSimple";
import { CollapseAddButton } from "../CollapseAddButton";

interface CollapseContainerProps<T> {
  option: T;
  optionsField: keyof T;
  renderTitleOption: (option: T) => string;
  onClickEdit: (option: T) => void;
  onClickDelete: (option: T) => void;
  onClickAdd: (option: T) => void;
  haveChildrens: (option: T) => boolean;
}

export function CollapseContainer<T>(props: CollapseContainerProps<T>) {
  const {
    option,
    optionsField,
    renderTitleOption,
    onClickEdit,
    onClickDelete,
    onClickAdd,
    haveChildrens,
  } = props;

  const [isOpen, setOpen] = useState(false);

  const options = (
    Array.isArray(option[optionsField]) ? option[optionsField] : []
  ) as T[];

  if (!haveChildrens(option))
    return (
      <CollapseSimple
        title={renderTitleOption(option)}
        onClickEdit={() => onClickEdit(option)}
        onClickDelete={() => onClickDelete(option)}
      />
    );

  return (
    <div key="collapse" className="text-gray-800 flex items-start justify-end">
      <div className="w-full">
        <button
          className={clsx(
            "w-full flex justify-between items-center px-4 h-11 font-bold rounded",
            "bg-slate-200",
            "hover:brightness-90 duration-300",
            "focus:outline-none focus-visible:ring focus-visible:ring-green-300 focus-visible:ring-opacity-75",
            isOpen && "rounded-none rounded-t"
          )}
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="flex gap-4 items-center">
            <MdCategory /> {renderTitleOption(option)}
          </div>

          <div className="flex gap-4">
            <MdExpandMore
              className={clsx(
                "transform duration-300 ease-in-out text-xl",
                !isOpen && "rotate-180"
              )}
            />
          </div>
        </button>
        <Transition.Root show={isOpen}>
          <Transition.Child
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className={clsx(
              "w-full bg-slate-400 flex flex-col gap-2",
              isOpen && "py-3 px-5 rounded-b"
            )}
          >
            {isOpen &&
              options.map((nextOption, index) => {
                return (
                  <CollapseContainer<T>
                    key={index}
                    option={nextOption}
                    optionsField={optionsField}
                    renderTitleOption={renderTitleOption}
                    onClickEdit={onClickEdit}
                    onClickDelete={onClickDelete}
                    onClickAdd={onClickAdd}
                    haveChildrens={haveChildrens}
                  />
                );
              })}
            <CollapseAddButton onClickAdd={() => onClickAdd(option)} />
          </Transition.Child>
        </Transition.Root>
      </div>

      <div className="flex items-center absolute right-auto mr-11 mt-3 space-x-3">
        <MdEdit
          className="cursor-pointer text-base text-gray-500 hover:text-gray-700 h-5 w-5"
          onClick={() => onClickEdit(option)}
        />
        <MdClose
          className="cursor-pointer text-base text-gray-500 hover:text-gray-700 h-5 w-5"
          onClick={() => onClickDelete(option)}
        />
      </div>
    </div>
  );
}
