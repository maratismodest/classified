import Header from '@/components/Header/Header';
import AppProvider from '@/context/AppContext';
import AuthProvider from '@/context/AuthContext/AuthContext';
import ModalProvider from '@/context/ModalContext';
import NextAuthProvider from '@/context/NextAuthContext';
import QueryProvider from '@/context/QueryContext';
import ToastProvider from '@/context/ToastContext';
import { Providers } from '@/providers/chakra-provider';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import React, { Suspense } from 'react';
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
            </Providers>
          </QueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
