import buttonStyles from '@/styles/buttonStyles';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { clsx } from 'clsx';
import { ReactNode } from 'react';

interface AccordionProps {
  title: string;
  children: ReactNode;
}
const Accordion = ({ children, title }: AccordionProps) => {
  return (
    <Disclosure>
      <DisclosureButton className="w-full py-2">
        <p className={clsx(buttonStyles({ size: 'small' }))}>{title}</p>
      </DisclosureButton>
      <DisclosurePanel className="text-gray-500">{children}</DisclosurePanel>
    </Disclosure>
  );
};

export default Accordion;
