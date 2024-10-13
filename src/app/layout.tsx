import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export const metadata = {
  title: 'AIチャットルーム管理',
  description: 'ChatGPTのルームを管理するアプリ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-[#212121] min-h-screen flex flex-col">
        <header className="bg-[#171717] text-[#b4b4b4] py-4 fixed w-full z-50">
          <nav className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">AIチャットルーム管理</h1>
          </nav>
        </header>
        <main className="container mx-auto flex-grow py-8  ">{children}</main>
        <footer className="bg-[#171717] text-[#b4b4b4] py-4 text-center">
          <p>&copy; 2024 AIチャットルーム管理</p>
        </footer>
      </body>
    </html>
  );
}