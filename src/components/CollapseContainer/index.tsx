import { useState } from "react";

import clsx from "clsx";

import { Transition } from "@headlessui/react";
import { MdExpandMore, MdCategory } from "react-icons/md";

import { CollapseSimple } from "../SimpleCollapse";
import { CollapseAddButton } from "../CollapseAddButton";

interface CollapseContainerProps<T> {
  option: T;
  optionsField: keyof T;
  renderOption: (option: T) => string;
  onClickEdit: (option: T) => void;
  onClickAdd: (option: T) => void;
}

export function CollapseContainer<T>(props: CollapseContainerProps<T>) {
  const { option, optionsField, renderOption, onClickEdit, onClickAdd } = props;

  const [isOpen, setOpen] = useState(false);

  const options = (
    Array.isArray(option[optionsField]) ? option[optionsField] : []
  ) as T[];

  return (
    <div key="collapsible" className="text-gray-800">
      <button
        className={clsx(
          "w-full flex justify-between px-4 items-center h-11 font-bold rounded",
          "bg-slate-200",
          "hover:brightness-90 duration-300",
          "focus:outline-none focus-visible:ring focus-visible:ring-green-300 focus-visible:ring-opacity-75",
          isOpen && "rounded-none rounded-t"
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="flex gap-4 items-center">
          <MdCategory /> {renderOption(option)}
        </div>
        <MdExpandMore
          className={clsx(
            "transform duration-300 ease-in-out text-xl",
            !isOpen && "rotate-180"
          )}
        />
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
              const nextOptions = (
                Array.isArray(nextOption[optionsField])
                  ? nextOption[optionsField]
                  : []
              ) as T[];

              if (nextOptions.length > 0)
                return (
                  <CollapseContainer<T>
                    key={index}
                    option={nextOption}
                    optionsField={optionsField}
                    renderOption={renderOption}
                    onClickEdit={onClickEdit}
                    onClickAdd={onClickAdd}
                  />
                );

              return (
                <CollapseSimple
                  key={index}
                  title={renderOption(nextOption)}
                  onClickEdit={() => onClickEdit(nextOption)}
                />
              );
            })}
          <CollapseAddButton onClickAdd={() => onClickAdd(option)} />
        </Transition.Child>
      </Transition.Root>
    </div>
  );
}
