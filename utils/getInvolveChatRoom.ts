import { db } from "@/firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

type ChatRoom = {
  id: string;
  participants: string[];
  createdAt: { seconds: number; nanoseconds: number };
};

export const getInvolveChatRoom = async (
  userNickname: string
): Promise<ChatRoom[]> => {
  const q = query(
    collection(db, "chatting"),
    where("participants", "array-contains", userNickname)
  );
  const querySnapshot = await getDocs(q);

  const chatRooms = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    participants: doc.data().participants,
    createdAt: doc.data().createdAt,
  })) as ChatRoom[];

  return chatRooms;
};
