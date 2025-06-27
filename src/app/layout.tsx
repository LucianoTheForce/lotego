import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollingProvider } from "@/components/animations/smooth-scrolling-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LotGo - O jeito inteligente de comprar e vender terrenos",
  description: "Plataforma digital para facilitar a venda de lotes, áreas e fazendas com tecnologia, dados e automação.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScrollingProvider>
          {children}
        </SmoothScrollingProvider>
      </body>
    </html>
  );
}
