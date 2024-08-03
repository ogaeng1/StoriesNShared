import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StoryNshared - 대화목록",
  description: "대화하고 싶은 사람을 찾고, 대화를 시작하세요.",
  openGraph: {
    title: "StoryNshared",
    description: "대화하고 싶은 사람을 찾고, 대화를 시작하세요.",
    url: "https://stories-n-shared.vercel.app/",
  },
};

const ChatLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex justify-center min-w-[437px] min-h-[100vh] h-full">
      <div className="flex-col flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default ChatLayout;
