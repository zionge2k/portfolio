import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import "./globals.css";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "이성 | Portfolio",
  description: "개발자 이성의 포트폴리오",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="theme-color" content="#eff1f5" />
      </head>
      <body
        className={`${pretendard.variable} ${inter.variable} font-sans antialiased`}
      >
        <Nav />
        <main className="mx-auto max-w-3xl px-6 py-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
