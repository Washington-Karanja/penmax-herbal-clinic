import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { CartProvider } from "@/components/providers/CartProvider";
import { CartDrawer, FloatingWhatsApp, Footer, Header } from "@/components/layout/SiteChrome";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Penmax Herbal Medical Centre",
  description: "Thoughtful herbal remedies and natural beauty essentials, prepared in Kenya.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <CartProvider>
          <div className="site-shell">
            <Header />
            {children}
            <Footer />
            <FloatingWhatsApp />
            <CartDrawer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
