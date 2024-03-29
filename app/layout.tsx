import type { Metadata } from "next";
import style from "./globals.module.css"

import Navbar from "../components/navbar/navbar";

export const metadata: Metadata = {
  icons:{
    icon: "./favicon.ico"
  },
  title: "iContatos",
  description: "Desafio iContatos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={style.bodyLayout}>
        <Navbar/>
        {children}</body>
    </html>
  );
}
