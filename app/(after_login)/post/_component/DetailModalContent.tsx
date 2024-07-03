"use client";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPostById } from "@/utils/getPostDetail";
import { postLike } from "@/utils/likePost";
import Button from "@/components/UI/Button";
import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
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

const DetailModalContent = () => {
  const [nickname, setNickname] = useState("");
  const [curProfile, setCurProfile] = useState("");
  const { type, setType, isOpen, setIsOpen } = useModal();
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const modalHandler = () => {
    router.back();
  };

  const { data } = useQuery({
    queryKey: ["feeds", id],
    queryFn: getPostById,
  });

  const likeMutation = useMutation({
    mutationFn: postLike,
    onMutate: async ({ postId, userId }) => {
      await queryClient.cancelQueries({ queryKey: ["feeds"] });

      const previousFeeds = queryClient.getQueryData(["feeds"]);

      queryClient.setQueryData(["feeds"], (oldData: any) => {
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
    if (nickname) {
      likeMutation.mutate({ postId: id as string, userId: nickname });
    }
  };

  const isLiked = data?.likeUser?.includes(nickname);

  const comments = data?.comment ?? [];

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
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          setNickname(userDoc.data().nickname || "");
          setCurProfile(userDoc.data().profileImg || "");
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="z-[999] fixed w-[100vw] h-screen flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.4)]">
      <div className="w-[487px] h-[750px] border rounded-md bg-white overflow-auto scrollbar-hide">
        <div className="flex items-center sticky top-0 bg-[aliceblue] z-10 border-b-[1px] p-2 mb-2">
          <Button onClick={modalHandler}>❌</Button>
        </div>
        <div className="px-3">
          <div className="flex gap-3 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-[42px] h-[42px] rounded-[50%]">
                <Image
                  src={data?.userProfileImg}
                  alt="게시글 작성자 프로필 사진"
                  width={42}
                  height={42}
                  className="rounded-[50%]"
                />
              </div>
              <div>
                <div className="font-bold">{data?.userId}</div>
                <div className="text-gray-600">
                  {getCreatedAt(data?.createdAt.seconds)}
                </div>
              </div>
            </div>
            {nickname === data?.userId && (
              <div className="relative flex items-center justify-center">
                <Button
                  className="text-[30px] hover:text-slate-700"
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
                      postImg={data?.postImg}
                      defaultContent={data?.content}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 px-3">{data?.content}</div>
        <div className="flex my-3 px-3">
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            pagination={{ type: "bullets" }}
            className="rounded-md"
          >
            {data?.postImg.map((img: any) => (
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
          <div>{data?.likeCount}</div>
        </div>
        <div className="flex items-center gap-2 mt-3 px-3">
          <div>댓글</div>
          <div>{comments.length}개</div>
        </div>
        <hr className="my-2 mx-3" />
        <CommentForm
          profileImg={curProfile}
          postId={id as string}
          nickname={nickname}
        />
        <CommentList postId={id as string} />
      </div>
    </div>
  );
};

export default DetailModalContent;
