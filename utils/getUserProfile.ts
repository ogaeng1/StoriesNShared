import { db } from "@/firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const getUserProfile = async (nickname: string) => {
  const q = query(collection(db, "users"), where("nickname", "==", nickname));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    return {
      nickname: userDoc.data().nickname,
      profileImg: userDoc.data().profileImg,
    };
  }

  throw new Error("User not found");
};
