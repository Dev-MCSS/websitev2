import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const metropolis = localFont({
  src: [
    {
      path: "../public/fonts/metropolis.light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/metropolis.regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/metropolis.medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/metropolis.semi-bold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/metropolis.bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-metropolis",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MCSS - McGill Chinese Students' Society",
  description: "MCSS, McGill Chinese Students' Society is the largest and most influential cultural student organization in Eastern Canada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${metropolis.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
