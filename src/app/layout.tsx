import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollingProvider } from "@/components/animations/smooth-scrolling-provider";
import { PageTransition } from "@/components/animations/page-transition";
import { PerformanceMonitor } from "@/components/animations/performance-optimizer";

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
          <PageTransition>
            {children}
          </PageTransition>
          <PerformanceMonitor />
        </SmoothScrollingProvider>
      </body>
    </html>
  );
}
