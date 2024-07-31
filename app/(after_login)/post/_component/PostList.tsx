"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "@/service/getPosts";
import PostCard from "./PostCard";
import { Feed } from "./types";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const PostList = () => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["feeds"],
      queryFn: getPosts,
      staleTime: 1000 * 60 * 1,
      gcTime: 1000 * 60 * 1,
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
