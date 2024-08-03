import type { Metadata } from "next";
import { db } from "@/firebase/firebase";
import { doc, getDoc, collection } from "firebase/firestore";

export const genereatedMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const userId = params.id;

  const userDoc = await getDoc(doc(collection(db, "users"), userId));
  let nickname = "유저";

  if (userDoc.exists()) {
    const userData = userDoc.data();
    nickname = userData?.nickname || nickname;
  }

  return {
    title: `프로필`,
    description: `${nickname}님의 프로필 페이지입니다.`,
    openGraph: {
      title: `프로필 - ${nickname}`,
      description: `${nickname}님의 프로필 페이지입니다.`,
      url: `https://stories-n-shared.vercel.app/user/${userId}`,
    },
  };
};

const UserProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default UserProfileLayout;
