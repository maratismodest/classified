import { ItemModalText } from './utils';
import Button from '@/components/ui/Button';
import clsx from 'clsx';
import React from 'react';

interface ItemButtonsProps {
  showModal: (text: ItemModalText) => void;
}

const ItemButtons = ({ showModal }: ItemButtonsProps) => {
  return (
    <>
      <Button
        title="Снять с публикации"
        className={clsx('absolute z-10', 'right-0 top-0')}
        onClick={event => {
          event.preventDefault();
          showModal(ItemModalText.delete);
        }}
      >
        &#10008;
      </Button>
    </>
  );
};

export default ItemButtons;
