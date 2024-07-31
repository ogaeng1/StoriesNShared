import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const getPostDetailById = async ({ queryKey }: any) => {
  const postId = queryKey[1];
  const docRef = doc(db, "feeds", postId);
  const res = await getDoc(docRef);

  return res.data();
};
