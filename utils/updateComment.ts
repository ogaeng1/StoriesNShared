import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const updateComment = async ({
  postId,
  commentId,
  newContent,
}: {
  postId: string;
  commentId: string;
  newContent: string;
}) => {
  const postRef = doc(db, "feeds", postId);
  const postDoc = await getDoc(postRef);
  if (postDoc.exists()) {
    const postData = postDoc.data();
    const updatedComments = postData.comment.map((comment: any) =>
      comment.id === commentId
        ? { ...comment, content: newContent, updatedAt: new Date() }
        : comment
    );
    await updateDoc(postRef, { comment: updatedComments });
  }
};
