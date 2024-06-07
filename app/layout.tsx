import Header from '@/components/Header/Header';
import AppProvider from '@/context/AppContext';
import AuthProvider from '@/context/AuthContext';
import ModalProvider from '@/context/ModalContext';
import NextAuthProvider from '@/context/NextAuthContext';
import QueryProvider from '@/context/QueryContext';
import ToastProvider from '@/context/ToastContext';
import type { Metadata } from 'next';
import useTranslation from 'next-translate/useTranslation';
import localFont from 'next/font/local';
import React, { Suspense } from 'react';
import i18n from '@/i18n';
import { redirect } from 'next/navigation';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'Classified',
  description: 'Доска недвижимости в Софии',
};

interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  const { lang } = useTranslation('common');
  console.log('lang', lang);
  if (!i18n.locales.includes(lang)) redirect(`/${i18n.defaultLocale}/${lang}`);
  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Suspense>
          <QueryProvider>
            {/*<ChakraUiProvider>*/}
            <NextAuthProvider>
              <AuthProvider>
                <AppProvider>
                  <ModalProvider>
                    <ToastProvider>
                      <Header />
                      <main>{children}</main>
                    </ToastProvider>
                  </ModalProvider>
                </AppProvider>
              </AuthProvider>
            </NextAuthProvider>
            {/*</ChakraUiProvider>*/}
          </QueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
