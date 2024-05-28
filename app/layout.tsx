import Header from "@/components/Header/Header";
import {Providers} from "@/providers/chakra-provider";
import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import React from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Classified",
  description: "Доска недвижимости в Софии",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable}`}>
    <Providers>
      <Header/>
      <main>
        {children}
      </main>
    </Providers>
    </body>
    </html>
  );
}
