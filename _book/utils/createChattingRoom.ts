import { db } from "@/firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

export const createChatRoom = async (participants: string[]) => {
  const q = query(
    collection(db, "chatting"),
    where("participants", "array-contains", participants[0])
  );
  const querySnapshot = await getDocs(q);
  let existingChatRoom = null as { id: string } | null;

  querySnapshot.forEach((doc) => {
    if (doc.data().participants.includes(participants[1])) {
      existingChatRoom = doc;
    }
  });

  if (existingChatRoom) {
    return existingChatRoom.id;
  }

  const chatRoomData = {
    participants,
    createdAt: serverTimestamp(),
    messages: [],
  };

  const chatRoomRef = await addDoc(collection(db, "chatting"), chatRoomData);
  return chatRoomRef.id;
};
