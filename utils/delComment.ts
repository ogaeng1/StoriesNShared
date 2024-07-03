import { doc, updateDoc, arrayRemove, increment } from "firebase/firestore";
import { db } from "@/firebase/firebase";

type Props = { postId: string; comment: any };

export const deleteComment = async ({ postId, comment }: Props) => {
  const postRef = doc(db, "feeds", postId);
  await updateDoc(postRef, {
    comment: arrayRemove(comment),
    commentCount: increment(-1),
  });
};
