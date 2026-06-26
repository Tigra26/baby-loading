import type { Metadata } from "next";
import { Lato, Comfortaa } from "next/font/google";
import AuthProvider from "@/providers/AuthProvider";
import TanStackProvider from "@/providers/TanStackProvider";
import "./globals.css";
import { ToastProvider } from "@/providers/ToastProvider";

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
  metadataBase: new URL("https://baby-loading-nine.vercel.app/"),

  title: {
    default: "Лелека",
    template: "%s | Лелека",
  },

  description:
    "Лелека — персональний помічник для майбутніх мам: щоденник, подорож вагітності, важливі завдання та профіль користувача.",

  applicationName: "Лелека",

  openGraph: {
    title: "Лелека",
    description:
      "Персональний помічник для майбутніх мам: щоденник, подорож вагітності, важливі завдання та профіль користувача.",
    url: "https://baby-loading-nine.vercel.app/",
    siteName: "Лелека",
    locale: "uk_UA",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Лелека — персональний помічник для майбутніх мам",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Лелека",
    description:
      "Персональний помічник для майбутніх мам: щоденник, подорож вагітності, важливі завдання та профіль користувача.",
    images: ["/images/og-image.png"],
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="uk">
      <body className={`${lato.variable} ${comfortaa.variable}`}>
        <TanStackProvider>
          <AuthProvider>{children}</AuthProvider>
          <ToastProvider />
        </TanStackProvider>
      </body>
    </html>
  );
}
