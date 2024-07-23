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
    console.log("Attempting to like post:", postId, "by user:", userId);

    const postRef = doc(db, "feeds", postId);
    const postDoc = await getDoc(postRef);

    if (postDoc.exists()) {
      const postData = postDoc.data();
      const isLiked = postData.likeUser.includes(userId);

      console.log("Post data:", postData);
      console.log("Is post liked by user:", isLiked);

      await updateDoc(postRef, {
        likeUser: isLiked ? arrayRemove(userId) : arrayUnion(userId),
        likeCount: isLiked ? postData.likeCount - 1 : postData.likeCount + 1,
      });

      console.log("Successfully updated like status");
    } else {
      console.error("Post does not exist");
      throw new Error("Post does not exist");
    }
  } catch (error) {
    console.error("Failed to update like:", error);
    throw error;
  }
};
