"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "@/services/getPosts";
import PostCard from "./PostCard";
import { Feed } from "./types";
import { useCallback } from "react";
import { Virtuoso } from "react-virtuoso";

const PostList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["feeds"],
      queryFn: getPosts,
      staleTime: 1000 * 60 * 1,
      gcTime: 1000 * 60 * 1,
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage?.lastVisible || null,
    });

  const loadMoreData = useCallback(() => {
    return setTimeout(() => {
      fetchNextPage();
    }, 500);
  }, []);

  return (
    <Virtuoso
      style={{ height: "100vh" }}
      useWindowScroll
      data={data?.pages.flatMap((page) => page.posts)}
      endReached={loadMoreData}
      itemContent={(index, post: Feed) => (
        <PostCard key={post.id} data={post} />
      )}
    />
  );
};

export default PostList;
