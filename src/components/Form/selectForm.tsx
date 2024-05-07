import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";


interface DropdownProps {
  dropdownLabel: string;
  options: { id: number; name: string }[];
  className: string;
  value: { id: number; name: string };
  onChange?: any;
  error?: string;
  name?: string;
  disabled?: boolean;
}
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown({
  dropdownLabel,
  options,
  className,
  value,
  onChange,
  error = "",
    name,
    disabled = false,
}: DropdownProps) {
  const handleSelectionChange = (selectedValue: {
    id: number;
    name: string;
  }) => {
    onChange(selectedValue);
  };


  return (
    <Listbox value={value} name={name} disabled={disabled} onChange={handleSelectionChange}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-base font-normal leading-6 text-dark text-left">
            {dropdownLabel}
          </Listbox.Label>
          <div className={classNames("relative mt-2", className)}>
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5  pr-10 text-left text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="ml-3 block truncate">{value.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((element) => (
                  <Listbox.Option
                    key={element.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-primaryColor text-white" : "text-dark",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={element}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {element.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-dark",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
            <span className="text-danger text-sm">{error}</span>
          </div>
          
        </>
      )}
    </Listbox>
    
  );
}
