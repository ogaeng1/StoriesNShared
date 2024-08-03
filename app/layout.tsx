import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import ToastContainer from "@/components/UI/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StoryNshared",
  description: "나의 이야기를 공유하고, 다른 사람들과 소통해 보세요.",
  icons: {
    icon: "/assets/icons/logo.png",
  },
  generator: "Next.js",
  applicationName: "StoryNshared",
  keywords: ["소통", "공유", "일상", "이야기", "대화", "커뮤니티", "공감"],
  openGraph: {
    title: "StoryNshared",
    description: "나의 이야기를 공유하고, 다른 사람들과 소통해 보세요.",
    url: "https://stories-n-shared.vercel.app/",
    siteName: "StoryNshared",
    images: [
      {
        url: "/assets/icons/logo.png",
        width: 800,
        height: 600,
        alt: "로고",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
