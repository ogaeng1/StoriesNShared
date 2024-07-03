import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "@/firebase/firebase";

export const deletePost = async (postId: string, postImg: string[]) => {
  await deleteDoc(doc(db, "feeds", postId));

  const deleteImagePromises = postImg.map((imgUrl) => {
    const imgRef = ref(storage, imgUrl);
    return deleteObject(imgRef);
  });

  await Promise.all(deleteImagePromises);
};
