import { db } from "@/firebase/firebase";
import {
  collection,
  getDocs,
  doc,
  DocumentData,
  query,
  where,
  getDoc,
} from "firebase/firestore";

const fetchUsersByIds = async (userIds: string[]): Promise<DocumentData[]> => {
  if (userIds.length === 0) return [];

  const users: DocumentData[] = [];

  for (const id of userIds) {
    const userRef = doc(db, "users", id);
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      users.push({
        id: userSnapshot.id,
        ...userSnapshot.data(),
      });
    }
  }
  return users;
};

export const getFollowingList = async (userId: string) => {
  const userDoc = await getDocs(
    query(collection(db, "users"), where("id", "==", userId))
  );
  if (!userDoc.empty) {
    const userData = userDoc.docs[0].data();
    const followingUsers = await fetchUsersByIds(userData.following);
    return followingUsers;
  }
  throw new Error("User not found");
};

export const getFollowerList = async (userId: string) => {
  const userDoc = await getDocs(
    query(collection(db, "users"), where("id", "==", userId))
  );
  if (!userDoc.empty) {
    const userData = userDoc.docs[0].data();
    return await fetchUsersByIds(userData.follower);
  }
  throw new Error("User not found");
};

export const getPostsByNicknames = async (
  nicknames: string[]
): Promise<DocumentData[]> => {
  if (nicknames.length === 0) return [];
  const postsRef = collection(db, "feeds");

  const posts: DocumentData[] = [];
  for (const nickname of nicknames) {
    const postQuery = query(postsRef, where("userId", "==", nickname));
    const postSnapshot = await getDocs(postQuery);
    postSnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
  }

  return posts;
};
