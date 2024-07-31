import { db } from "@/firebase/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  doc,
  DocumentData,
} from "firebase/firestore";

export const sendMessage = async (
  chatRoomId: string,
  sender: string,
  senderProfileImg: string,
  text: string
) => {
  const messageData = {
    sender,
    senderProfileImg,
    text,
    timestamp: serverTimestamp(),
    readBy: [sender],
  };

  await addDoc(collection(db, "chatting", chatRoomId, "messages"), messageData);
};

export const subscribeToMessages = (
  chatRoomId: string,
  callback: (messages: DocumentData[]) => void
) => {
  const q = query(
    collection(db, "chatting", chatRoomId, "messages"),
    orderBy("timestamp")
  );
  return onSnapshot(q, (querySnapshot) => {
    const messages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(messages);
  });
};
