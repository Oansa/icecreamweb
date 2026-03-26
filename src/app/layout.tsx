import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Ice Cream — No-Code AI Trading Agents",
  description:
    "Ice Cream is a no-code AI blockchain trading agent platform. Build, deploy, and track agents in minutes.",
  metadataBase: new URL("https://icecream.example"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
