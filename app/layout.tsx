import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shmoerdle",
  description: "A wordle clone built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <Head>
        <Link rel="preload" href="/shmoerdle.png" as="image" type="image/png" />
        <Link rel="preload" href="/globals.css" as="style" type="text/css" />
      </Head>
      <body className="min-h-full flex flex-col">
        <Analytics />
        <div className="bg-zinc-200 font-sans dark:bg-black">{children}</div>
        <p className="text-center text-sm text-gray-700 w-full fixed-bottom  bg-zinc-200 font-sans dark:bg-black py-4">
          Rob Hine, 2026.{" "}
          <a
            href="https://github.com/rob748586/shmoerdle"
            className="text-blue-700 underline"
          >
            View source code on GitHub
          </a>
        </p>
      </body>
    </html>
  );
}
