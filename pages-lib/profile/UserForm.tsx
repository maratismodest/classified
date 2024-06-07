import buttonStyles from '@/styles/buttonStyles';
import inputStyles from '@/styles/inputStyles';
import { clsx } from 'clsx';
import React from 'react';

const UserForm = () => {
  return (
    <form className="grid grid-cols-1 gap-4">
      <div className="flex flex-col">
        <label htmlFor="phone">Enter your phone number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
          className={clsx(inputStyles())}
        />
      </div>
      <button className={buttonStyles()} type="submit">
        Сохранить
      </button>
    </form>
  );
};

export default UserForm;
