import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StoryNshared - 유저 검색",
  description: "원하는 유저를 검색하고, 프로필을 확인할 수 있습니다.",
  openGraph: {
    title: "StoryNshared - 유저 검색",
    description: "원하는 유저를 검색하고, 프로필을 확인할 수 있습니다.",
    url: "https://stories-n-shared.vercel.app/search-user",
  },
};

const SearchingUserLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <>{children}</>;
};

export default SearchingUserLayout;
