"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import {
  collection,
  query,
  orderBy,
  getDocs,
  startAfter,
  limit,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import PostCard from "./PostCard";
import { Feed } from "./types";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const PostList = () => {
  const { ref, inView } = useInView();
  const getPosts = async ({ pageParam }: any) => {
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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["feeds"],
      queryFn: getPosts,
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage?.lastVisible || null,
    });
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <>
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.posts.map((post: Feed) => (
            <PostCard key={post.id} data={post} />
          ))}
        </div>
      ))}
      <div ref={hasNextPage && !isFetchingNextPage ? ref : null} />
    </>
  );
};

export default PostList;
