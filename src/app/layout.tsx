import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond, DM_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "600", "700"],
  variable: "--font-heading",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ParagonLabs | Digital Marketing & Growth",
  description: "Elevating brands through data-driven digital marketing and growth strategies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${cormorant.variable} ${dmMono.variable} scroll-smooth antialiased`}
    >
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
