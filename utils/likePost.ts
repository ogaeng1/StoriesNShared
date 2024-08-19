import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

interface LikePostParams {
  postId: string;
  userId: string;
}

export const postLike = async ({ postId, userId }: LikePostParams) => {
  try {
    const postRef = doc(db, "feeds", postId);
    const postDoc = await getDoc(postRef);

    if (postDoc.exists()) {
      const postData = postDoc.data();
      const isLiked = postData.likeUser.includes(userId);

      await updateDoc(postRef, {
        likeUser: isLiked ? arrayRemove(userId) : arrayUnion(userId),
        likeCount: isLiked ? postData.likeCount - 1 : postData.likeCount + 1,
      });
    } else {
      throw new Error("Post does not exist");
    }
  } catch (error) {
    console.error("Failed to update like:", error);
    throw error;
  }
};
