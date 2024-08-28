"use client";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLike } from "@/utils/likePost";
import Button from "@/components/UI/Button";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { getCreatedAt } from "@/utils/getCreatedAt";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Pagination } from "swiper/modules";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import useModal from "@/store/modal";
import DetailMenuModal from "./DetailMenuModal";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { notify } from "@/components/UI/Toast";
import { useGetPost } from "@/services/hooks/usePostDetail";
import { useUserStore } from "@/store/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";

const DetailModalContent = () => {
  const { curUser } = useUserStore();
  const { type, setType, isOpen, setIsOpen } = useModal();
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const modalHandler = () => {
    router.back();
  };
  const { postDetail } = useGetPost(id as string);

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

  const handleLike = () => {
    if (curUser) {
      likeMutation.mutate({ postId: id as string, userId: curUser.nickname });
    }
  };

  const isLiked = postDetail?.likeUser?.includes(curUser?.nickname);

  const comments = postDetail?.comment ?? [];

  const detailMenuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      detailMenuRef.current &&
      !detailMenuRef.current.contains(event.target as Node)
    ) {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    if (type === "detail_menu") {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { fetchUser } = useUserStore.getState();
        await fetchUser(user.uid);
      }
    });

    return () => unsubscribe();
  }, [curUser]);

  return (
    <div className="z-[999] fixed w-[100vw] h-screen flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.4)]">
      <div className="w-[487px] max-h-[612px] border rounded-md bg-secondary overflow-auto scrollbar-hide text-white">
        <div className="flex items-center sticky top-0 z-10 bg-secondary p-2 mb-2">
          <Button onClick={modalHandler}>✖</Button>
        </div>
        <div className="px-3">
          <div className="flex gap-3 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-[42px] h-[42px] rounded-[50%]">
                <Image
                  src={postDetail?.userProfileImg}
                  alt="게시글 작성자 프로필 사진"
                  width={42}
                  height={42}
                  className="rounded-[50%]"
                />
              </div>
              <div>
                <div className="font-bold">{postDetail?.userId}</div>
                <div className="text-slate-400">
                  {getCreatedAt(postDetail?.createdAt.seconds)}
                </div>
              </div>
            </div>
            {curUser?.nickname === postDetail?.userId && (
              <div className="relative flex items-center justify-center">
                <Button
                  className="text-[30px]"
                  onClick={() => {
                    setType("detail_menu");
                    setIsOpen(!isOpen);
                  }}
                >
                  <HiOutlineDotsVertical />
                </Button>
                {isOpen && type === "detail_menu" && (
                  <div ref={detailMenuRef} className="absolute top-8 right-2">
                    <DetailMenuModal
                      postId={id as string}
                      postImg={postDetail?.postImg}
                      defaultContent={postDetail?.content}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 px-3">{postDetail?.content}</div>
        <div className="flex my-3 px-3">
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            pagination={{ type: "bullets" }}
            className="rounded-md"
          >
            {postDetail?.postImg.map((img: any) => (
              <SwiperSlide key={img} className="w-[411px]">
                <Image
                  src={img}
                  alt="게시글 이미지"
                  width={411}
                  height={300}
                  className="rounded-md w-full border h-[300px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex items-center gap-2 px-3">
          <Button onClick={handleLike}>
            {isLiked ? (
              <IoMdHeart className="text-red-500" />
            ) : (
              <IoMdHeartEmpty />
            )}
          </Button>
          <div>{postDetail?.likeCount}</div>
        </div>
        <div className="flex items-center gap-2 mt-3 px-3">
          <div>댓글</div>
          <div>{comments.length}개</div>
        </div>
        <hr className="my-2 mx-3" />
        <CommentForm
          profileImg={curUser?.profileImg as string}
          postId={id as string}
          nickname={curUser?.nickname as string}
        />
        <CommentList postId={id as string} />
      </div>
    </div>
  );
};

export default DetailModalContent;
