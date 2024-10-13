import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

export const metadata = {
  title: "AIチャットルーム管理 - ChatGPTなどのAIチャットルーム管理アプリ",
  description:
    "AIチャットルーム管理は、ChatGPTなどのルームを整理・管理するための便利なアプリです。シンプルで使いやすいインターフェースでルームを簡単に管理。",
  keywords:
    "ChatGPT, ルーム管理, セッション,セッション管理,AIチャット, ルーム整理, AI,",
  robots: "index, follow",
  author: "あなたの名前または会社名",
  metadataBase: new URL('https://your-domain.com'),  // 本番環境のURLを指定
  openGraph: {
    title: "AIチャットルーム管理",
    description: "AIのチャットルームを効率的に管理できるアプリ",
    type: "website",
    url: "https://your-domain.com",
    images: [
      {
        url: "/favicon.png",
        width: 800,
        height: 600,
        alt: "AIチャットルーム管理のロゴ",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.png" />
        <GoogleAnalytics/>
      </head>
      <body className="bg-[#212121] min-h-screen flex flex-col">
        <header className="bg-[#171717] text-[#b4b4b4] py-4 fixed w-full z-50 flex">
          <img
            src="/favicon-white.png"
            alt="AIチャットルーム管理"
            width={32}
            height={32}
            className="h-8 mx-8"
          />
          <nav className="container">
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
