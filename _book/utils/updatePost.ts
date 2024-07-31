import { updateDoc, doc } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "@/firebase/firebase";

export const updatePost = async (
  postId: string,
  newContent: string,
  newImages: File[],
  oldImages: string[]
) => {
  // 기존 이미지를 삭제
  const deleteImagePromises = oldImages.map((imgUrl) => {
    const imgRef = ref(storage, imgUrl);
    return deleteObject(imgRef);
  });
  await Promise.all(deleteImagePromises);

  // 새 이미지를 업로드
  const uploadImagePromises = newImages.map(async (file) => {
    const storageRef = ref(storage, `feed_image/${postId}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  });
  const newImageUrls = await Promise.all(uploadImagePromises);

  // Firestore 문서 업데이트
  await updateDoc(doc(db, "feeds", postId), {
    content: newContent,
    postImg: newImageUrls,
  });
};
