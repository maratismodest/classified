'use client';
import Popup from '@/components/ui/Popup';
import { decodeToken, MESSAGE_TOKEN_ERROR } from '@/context/AuthContext/utils';
import { GoogleUser } from '@/pages-lib/profile/ProfileNoUser';
import loginGoogle from '@/utils/api/prisma/loginGoogle';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';

type authContextType = {
  user: User | undefined;
  login: (user: User, token: string) => void | undefined;
  logout: () => void | undefined;
  loading: boolean;
};

const authContextDefaultValues: authContextType = {
  user: undefined,
  login: () => {},
  logout: () => {},
  loading: false,
};
export const AuthContext = createContext<authContextType>(authContextDefaultValues);

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const [message, setMessage] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const checkToken = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      // проверим наличие токена
      if (token) {
        // пытаемся понять, валидный ли токен
        const decoded = await decodeToken(token);
        // если токен валидный
        if (decoded) {
          // console.log('decoded', decoded);
          // создаем/обновляем пользователя
          const res = await loginGoogle(decoded as GoogleUser);

          // если получилось, то
          if (res) {
            // получаем новый токен и нового пользователя
            const { token, upsertUser } = res;
            // токен - в localStorage, пользователя в state
            login(upsertUser, token);
          } else {
            logout();
          }
        }
        // если токен не валидный - предлагаем пользователю авторизоваться заново
        else {
          // токен - удаляем из localStorage, пользователь - undefined
          setIsOpen(true);
          setMessage(MESSAGE_TOKEN_ERROR);
          logout();
        }
      }
      return;
    } catch (e) {
      console.log('e', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // @ts-ignore
  useEffect(() => {
    checkToken();
    return () => checkToken();
  }, []);

  const login = (user: User, token: string) => {
    localStorage.setItem('token', token);
    setUser(user);
  };

  const logout = () => {
    signOut().then(() => {
      localStorage.removeItem('token');
      setUser(undefined);
    });
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };
  return (
    <AuthContext.Provider value={value}>
      <Popup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        text={message}
        buttons={[{ text: 'ОК', onClick: () => setIsOpen(false) }]}
      />
      {children}
    </AuthContext.Provider>
  );
}
