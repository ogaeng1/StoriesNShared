import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";

interface User {
  id: string;
  nickname: string;
  bio: string;
  profileImg: string;
}

export const getUserSearch = async (): Promise<User[]> => {
  const userValid = collection(db, "users");
  const userQuery = await getDocs(userValid);
  const users = userQuery.docs.map((doc) => {
    const data = doc.data();
    return {
      id: data.id,
      nickname: data.nickname,
      bio: data.bio,
      profileImg: data.profileImg,
    };
  });
  return users;
};
