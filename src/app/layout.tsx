import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import "./globals.css";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
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
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${pretendard.variable} ${jetbrainsMono.variable} flex min-h-screen flex-col font-mono antialiased`}
      >
        <Nav />
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 pt-16 pb-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
