import Arrow from '@/components/Arrow';
import { Option } from '@/types/global';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { clsx } from 'clsx';
import React, { Fragment } from 'react';
import { useController, useFormContext } from 'react-hook-form';

export default function SelectHeadlessUi({ name, options }: { name: string; options: Option[] }) {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({ name, control });

  return (
    <div className="relative">
      <Listbox
        value={value}
        onChange={(option: Option) => {
          onChange(Number(option.value));
        }}
      >
        {({ open }) => (
          <>
            <ListboxButton className="flex h-9 w-full items-center justify-between rounded border border-inputBorder px-4 text-start">
              {options.find(x => x.value === value)?.label}
              <div className={clsx('ml-auto', open && 'rotate-180 transition ease-in-out')}>
                <Arrow />
              </div>
            </ListboxButton>
            <Transition
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="absolute top-10 z-[9999] w-full rounded bg-white p-2 drop-shadow-md">
                {options.map(category => (
                  <ListboxOption key={category.value} value={category} as={Fragment}>
                    {({ active, selected }) => (
                      <li
                        className={clsx(
                          'cursor-pointer rounded p-2',
                          active && 'bg-blue text-white'
                        )}
                      >
                        {category.label}
                      </li>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  );
}
