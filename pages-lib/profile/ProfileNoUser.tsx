import buttonStyles from '@/styles/buttonStyles';
import { signIn } from 'next-auth/react';
import React from 'react';

export type GoogleUser = {
  email: string;
  name: string;
  image?: string;
};

export default function ProfileNoUser() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center">
      <h1>Авторизация</h1>
      <button className={buttonStyles({ size: 'medium' })} onClick={() => signIn('google')}>
        Google
      </button>
    </section>
  );
}
