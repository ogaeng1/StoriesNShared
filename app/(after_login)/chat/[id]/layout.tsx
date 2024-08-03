import { Metadata } from "next";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const chatId = params.id;

  const chatRoomDoc = await getDoc(doc(collection(db, "chatRooms"), chatId));
  let title = `대화방 - ${chatId}`;
  let description = "상대방과 대화를 나누어 보세요.";

  if (chatRoomDoc.exists()) {
    const chatRoomData = chatRoomDoc.data();
    title = chatRoomData?.name || title;
    description = chatRoomData?.description || description;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://stories-n-shared.vercel.app/chat/${chatId}`,
    },
  };
};

const ChatRoomLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default ChatRoomLayout;
