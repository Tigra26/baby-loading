import type { Metadata } from "next";
import { Lato, Comfortaa } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/providers/TanStackProvider";

const lato = Lato({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

const comfortaa = Comfortaa({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--font-comfortaa",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Лелека",
  description: "Персональний помічник для майбутніх мам",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="uk">
      <body className={`${lato.variable} ${comfortaa.variable}`}>
        <TanStackProvider>{children}</TanStackProvider>
      </body>
    </html>
  );
}
