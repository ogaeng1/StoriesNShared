import { db } from "@/firebase/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";

const PAGE_SIZE = 10;

export const fetchPosts = async (
  pageParam: QueryDocumentSnapshot<DocumentData> | null
) => {
  const postsRef = collection(db, "feeds");
  let postsQuery = query(
    postsRef,
    orderBy("createdAt", "desc"),
    limit(PAGE_SIZE)
  );

  if (pageParam) {
    postsQuery = query(
      postsRef,
      orderBy("createdAt", "desc"),
      startAfter(pageParam),
      limit(PAGE_SIZE)
    );
  }

  const querySnapshot = await getDocs(postsQuery);
  const posts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  return { posts, nextCursor: lastVisible };
};
