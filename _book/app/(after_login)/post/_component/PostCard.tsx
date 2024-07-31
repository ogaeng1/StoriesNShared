"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLike } from "@/utils/likePost";
import { Feed } from "./types";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getCreatedAt } from "@/utils/getCreatedAt";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { BiMessageRounded } from "react-icons/bi";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { notify } from "@/components/UI/Toast";

type PostCardProps = {
  data: Feed;
};
const PostCard = ({ data }: PostCardProps) => {
  const [nickname, setNickname] = useState("");
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: postLike,
    onMutate: async ({ postId, userId }) => {
      await queryClient.cancelQueries({ queryKey: ["feeds"] });

      const previousFeeds = queryClient.getQueryData(["feeds"]);
      queryClient.setQueryData(["feeds"], (oldData: any) => {
        if (!oldData || !oldData.pages) {
          return oldData;
        }

        const newPages = oldData.pages.map((page: any) => {
          if (!page.data) {
            return page;
          }

          return {
            ...page,
            data: page.data.map((feed: any) => {
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
            }),
          };
        });

        return {
          ...oldData,
          pages: newPages,
        };
      });

      return { previousFeeds };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["feeds"], context?.previousFeeds);
      notify("error", "요청에 실패했습니다.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
    },
  });

  const handleLike = (postId: string) => {
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

  const isLiked = data.likeUser.includes(nickname);
  return (
    <Link href={`/post/${data.id}`} key={data.id}>
      <div className="border-b-[1px] border-tertiary mt-4">
        <div className="flex gap-2">
          <Image
            src={data.userProfileImg}
            alt="작성자 프로필 이미지"
            width={36}
            height={36}
            className="w-[36px] h-[36px] border rounded-[50%]"
          />
          <div>
            <div className="flex gap-3">
              <div className="font-bold">{data.userId}</div>
              <div className="text-gray-600">
                {getCreatedAt(data.createdAt.seconds)}
              </div>
            </div>
            {data.postImg.length === 0 ? (
              <div className="mt-5">
                <div>{data.content}</div>
              </div>
            ) : (
              <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
                {data.content}
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
            {data.postImg.map((img) => (
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
                  handleLike(data.id);
                }}
              />
            ) : (
              <IoMdHeartEmpty
                onClick={(e) => {
                  e.preventDefault();
                  handleLike(data.id);
                }}
              />
            )}
            <span>{data.likeCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <BiMessageRounded />
            <span>{data.commentCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
