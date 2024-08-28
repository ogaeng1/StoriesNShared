import { Feed } from "@/app/(after_login)/post/_component/types";
import { db } from "@/firebase/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

export const getPosts = async ({ pageParam }: any) => {
  const postsCollection = collection(db, "feeds");
  let postsQuery;
  if (pageParam) {
    postsQuery = query(
      postsCollection,
      orderBy("createdAt", "desc"),
      startAfter(pageParam),
      limit(10)
    );
  } else {
    postsQuery = query(
      postsCollection,
      orderBy("createdAt", "desc"),
      limit(10)
    );
  }
  const querySnapshot = await getDocs(postsQuery);
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  const posts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Feed[];
  return { posts, lastVisible };
};
