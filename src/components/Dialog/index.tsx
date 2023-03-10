import React, { Fragment, ReactNode } from "react";

import { Transition } from "@headlessui/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { clsx } from "clsx";

import { GrClose } from "react-icons/gr";

interface DialogProps {
  isOpen: boolean;
  title: string;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function Dialog(props: DialogProps) {
  const { isOpen, title, onOpenChange, children } = props;

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal forceMount>
        <Transition.Root show={isOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPrimitive.Overlay
              forceMount
              className="fixed inset-0 z-20 bg-black/50"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPrimitive.Content
              forceMount
              className={clsx(
                "fixed z-50",
                "w-[95vw] max-w-md rounded p-4 md:w-full",
                "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
                "bg-white dark:bg-gray-800",
                "focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75"
              )}
            >
              <div className="flex items-center justify-between">
                <DialogPrimitive.Title className="text-xl font-medium text-gray-700 dark:text-gray-100">
                  {title}
                </DialogPrimitive.Title>
                <DialogPrimitive.Close
                  className={clsx(
                    "top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1",
                    "focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75"
                  )}
                >
                  <GrClose className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400" />
                </DialogPrimitive.Close>
              </div>
              {children}
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
