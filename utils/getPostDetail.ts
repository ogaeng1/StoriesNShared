import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const getPostById = async ({ queryKey }: any) => {
  const postId = queryKey[1];
  const docRef = doc(db, "feeds", postId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("존재하지 않는 게시글입니다.");
  }
};
