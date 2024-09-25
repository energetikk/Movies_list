import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers/providers";
import { NavBar } from "../components/NavBar";
import Head from 'next/head';

import type { Metadata } from "next";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Библиотека фильмов",
  description: "Лучший сервис по поиску фильмов в Рунете",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Head>
        <link rel="icon" href="/public/favicon.ico"/>
      </Head>
      <html lang="ru">
        <body className={`${inter.className} bg-gradient-radial from-sky-400 to-blue-800`}>
          <Providers >
            <NavBar />
            <main>
              {children}
            </main>
          </Providers>
        </body>
      </html>
    </>
  );
}

