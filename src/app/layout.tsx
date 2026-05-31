import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DevX — Software Creation. Reimagined.",
  description: "DevX is the future of software creation. Describe your idea and DevX designs, builds, tests, and deploys production-ready systems automatically.",
  openGraph: {
    title: "DevX — Software Creation. Reimagined.",
    description: "The AI-native operating system for creating production-ready software systems in minutes.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevX — Software Creation. Reimagined.",
    description: "Describe your idea and DevX designs, builds, tests, and deploys production-ready systems automatically.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-black selection:bg-[#7c5cff] selection:text-white">
      <head>
        {/* Load Satoshi font directly from Google Fonts / CDN for elegant headings */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased text-white bg-black`}
        id="devx-root"
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
