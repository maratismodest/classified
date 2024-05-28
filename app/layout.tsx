import Header from '@/components/Header/Header';
import AppProvider from '@/context/AppContext';
import AuthProvider from '@/context/AuthContext';
import ModalProvider from '@/context/ModalContext';
import QueryProvider from '@/context/QueryContext';
import TelegramProvider from '@/context/TelegramContext';
import ToastProvider from '@/context/ToastContext';
import { Providers } from '@/providers/chakra-provider';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Link from 'next/link';
import React, { Suspense } from 'react';

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

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
    <body className={`${geistSans.variable} ${geistMono.variable}`}>
    <Suspense>
      <QueryProvider>
        <Providers>
          <TelegramProvider>
            <AuthProvider>
              <AppProvider>
                <ModalProvider>
                  <ToastProvider>
                    {/*<FavouritesProvider>*/}
                    <Header />

                    <main>
                      {children}
                    </main>
                  </ToastProvider>
                </ModalProvider>
              </AppProvider>
            </AuthProvider>
          </TelegramProvider>
        </Providers>
      </QueryProvider>
    </Suspense>
    </body>
    </html>
  );
}
