"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { postLike } from "@/utils/likePost";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getCreatedAt } from "@/utils/getCreatedAt";
import { getFollowingList, getPostsByNicknames } from "@/utils/getFollowList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { BiMessageRounded } from "react-icons/bi";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { notify } from "@/components/UI/Toast";
import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const FollowFeed = () => {
  const [nickname, setNickname] = useState("");
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    data: following,
    isLoading: isLoadingFollowing,
    error: followingError,
  } = useQuery({
    queryKey: ["following", id],
    queryFn: () => getFollowingList(id as string),
    enabled: !!id,
  });

  const nicknames = following ? following.map((user) => user.nickname) : [];

  const {
    data: posts,
    isLoading: isLoadingPosts,
    error: postsError,
  } = useQuery({
    queryKey: ["followingFeeds"],
    queryFn: () => getPostsByNicknames(nicknames),
    enabled: !!following && following.length > 0,
  });

  const likeMutation = useMutation({
    mutationFn: postLike,
    onMutate: async ({ postId, userId }) => {
      await queryClient.cancelQueries({ queryKey: ["followingFeeds"] });
      await queryClient.cancelQueries({ queryKey: ["followingFeeds", postId] });

      const previousFeeds = queryClient.getQueryData(["followingFeeds"]);
      const previousFeed = queryClient.getQueryData(["followingFeeds", postId]);

      queryClient.setQueryData(["followingFeeds"], (oldData: any) => {
        return oldData.map((feed: any) => {
          if (feed.id === postId) {
            const isLiked = feed.likeUser.includes(userId);
            return {
              ...feed,
              likeCount: isLiked ? feed.likeCount - 1 : feed.likeCount + 1,
              likeUser: isLiked
                ? feed.likeUser.filter((user: string) => user !== userId)
                : [...feed.likeUser, userId],
            };
          }
          return feed;
        });
      });

      queryClient.setQueryData(["followingFeeds", postId], (oldData: any) => {
        if (oldData) {
          const isLiked = oldData.likeUser.includes(userId);
          return {
            ...oldData,
            likeCount: isLiked ? oldData.likeCount - 1 : oldData.likeCount + 1,
            likeUser: isLiked
              ? oldData.likeUser.filter((user: string) => user !== userId)
              : [...oldData.likeUser, userId],
          };
        }
        return oldData;
      });

      return { previousFeeds, previousFeed };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["followingFeeds"], context?.previousFeeds);
      queryClient.setQueryData(
        ["followingFeeds", variables.postId],
        context?.previousFeed
      );
      notify("error", "요청에 실패했습니다.");
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["followingFeeds"] });
      queryClient.invalidateQueries({
        queryKey: ["followingFeeds", variables.postId],
      });
    },
  });

  const handleLike = (postId: string) => {
    console.log("handleLike - postId:", postId, "nickname:", nickname);
    if (nickname) {
      likeMutation.mutate({ postId, userId: nickname });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          setNickname(userDoc.data().nickname || "");
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ul>
      {posts?.map((feed) => {
        const isLiked = feed.likeUser.includes(nickname);
        return (
          <Link href={`/post/${feed.id}`} key={feed.id}>
            <li className="border-b-[1px] border-tertiary mt-4">
              <div className="flex gap-2">
                <Image
                  src={feed.userProfileImg}
                  alt="작성자 프로필 이미지"
                  width={36}
                  height={36}
                  className="w-[36px] h-[36px] border rounded-[50%]"
                />
                <div>
                  <div className="flex gap-3">
                    <div className="font-bold">{feed.userId}</div>
                    <div className="text-gray-600">
                      {getCreatedAt(feed.createdAt.seconds)}
                    </div>
                  </div>
                  {feed.postImg.length === 0 ? (
                    <div className="mt-5">
                      <div>{feed.content}</div>
                    </div>
                  ) : (
                    <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
                      {feed.content}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex mt-3">
                <div className="w-[8%]"></div>
                <Swiper
                  modules={[Pagination]}
                  slidesPerView={1}
                  pagination={{ type: "bullets" }}
                  className="rounded-md w-[84%]"
                >
                  {feed.postImg.map((img: any) => (
                    <SwiperSlide key={img} className="w-[224px]">
                      <Image
                        src={img}
                        alt="포스트 이미지"
                        width={224}
                        height={300}
                        className="w-full h-[300px]"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="w-[8%]"></div>
              </div>
              <div className="my-3 mx-10 flex gap-5 text-[20px]">
                <div className="flex items-center gap-2">
                  {isLiked ? (
                    <IoMdHeart
                      className="text-red-500"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLike(feed.id);
                      }}
                    />
                  ) : (
                    <IoMdHeartEmpty
                      onClick={(e) => {
                        e.preventDefault();
                        handleLike(feed.id);
                      }}
                    />
                  )}
                  <span>{feed.likeCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BiMessageRounded />
                  <span>{feed.commentCount}</span>
                </div>
              </div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default FollowFeed;
