import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Balaton Földmunka | Gépi Földmunka és Tereprendezés",
  description: "Profi gépi földmunka, tereprendezés, alapásás és anyagszállítás a Balaton körül. Kérjen ajánlatot még ma!",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Balaton Földmunka - Tereprendezés",
    description: "Alapásástól a kertépítésig minden, ami földmunka a Balatonnál.",
    url: "https://www.balatonfoldmunka.hu",
    siteName: "Balaton Földmunka",
    locale: "hu_HU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}