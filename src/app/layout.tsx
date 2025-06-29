import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/mobile-animations.css";
import { SmoothScrollingProvider } from "@/components/animations/smooth-scrolling-provider";
import { PageTransition } from "@/components/animations/page-transition";
import { PerformanceMonitor } from "@/components/animations/performance-optimizer";
import { AuthProvider } from "@/contexts/AuthContext";

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
        <AuthProvider>
          <SmoothScrollingProvider>
            <PageTransition>
              {children}
            </PageTransition>
            <PerformanceMonitor />
          </SmoothScrollingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
