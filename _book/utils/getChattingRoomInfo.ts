import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getChatRoomInfo = async (chatRoomId: string) => {
  const chatRoomDoc = await getDoc(doc(db, "chatting", chatRoomId));
  if (chatRoomDoc.exists()) {
    return chatRoomDoc.data();
  } else {
    throw new Error("Chat room not found");
  }
};
