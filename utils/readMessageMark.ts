import { db } from "@/firebase/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export const readMessageMark = async (
  chatRoomId: string,
  messageId: string,
  reader: string
) => {
  const messageRef = doc(db, "chatting", chatRoomId, "messages", messageId);
  await updateDoc(messageRef, {
    readBy: arrayUnion(reader),
  });
};
