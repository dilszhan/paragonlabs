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
  keywords: [
    "Digital Marketing",
    "Growth Strategies",
    "SEO",
    "Marketing Agency",
    "Data-driven Marketing",
    "ParagonLabs",
  ],
  authors: [{ name: "ParagonLabs" }],
  creator: "ParagonLabs",
  openGraph: {
    title: "ParagonLabs | Digital Marketing & Growth",
    description: "Elevating brands through data-driven digital marketing and growth strategies.",
    url: "https://paragonlabs.com",
    siteName: "ParagonLabs",
    images: [
      {
        url: "/images/Logo.png",
        width: 1200,
        height: 630,
        alt: "ParagonLabs Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ParagonLabs | Digital Marketing & Growth",
    description: "Elevating brands through data-driven digital marketing and growth strategies.",
    images: ["/images/Logo.png"],
    creator: "@paragonlabs",
  },
  icons: {
    icon: "/images/fav-icon.png",
    shortcut: "/images/fav-icon.png",
    apple: "/images/fav-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
      suppressHydrationWarning
    >
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} suppressHydrationWarning>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
