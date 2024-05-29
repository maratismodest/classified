import useAuth from '@/hooks/useAuth';
import buttonStyles from '@/styles/buttonStyles';
import loginGoogle from '@/utils/api/prisma/loginGoogle';
import * as jose from 'jose';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { ERROR_TOKEN_MESSAGE } from './utils';

export type GoogleUser = {
  email: string;
  name: string;
  image?: string;
};

export default function ProfileNoUser() {
  const { data: session, status } = useSession();
  const { login, user } = useAuth();

  useEffect(() => {
    if (status === 'authenticated') {
      handleLogin();
    }
  }, [status]);

  const handleLogin = async () => {
    try {
      if (session && session.user) {
        console.log('HERE', session?.user);
        const response = await loginGoogle(session.user as GoogleUser);
        // console.log('token', response);
        if (response) {
          const decoded = jose.decodeJwt(response.token);
          // console.log('decoded', decoded);
          if (decoded) {
            login(response.upsertUser, response.token);
          } else {
            return alert({ ERROR_TOKEN_MESSAGE });
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="flex flex-1 flex-col items-center justify-center">
      <h1>Авторизация</h1>
      <button className={buttonStyles({ size: 'medium' })} onClick={() => signIn('google')}>
        Sign in with Google
      </button>
    </section>
  );
}
