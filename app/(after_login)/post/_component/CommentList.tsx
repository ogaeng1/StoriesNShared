"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPostById } from "@/utils/getPostDetail";
import Image from "next/image";
import { getCreatedAt } from "@/utils/getCreatedAt";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import useModal from "@/store/modal";
import Button from "@/components/UI/Button";
import { deleteComment } from "@/utils/delComment";
import { notify } from "@/components/UI/Toast";
import Swal from "sweetalert2";
import { updateComment } from "@/utils/updateComment";
import Input from "@/components/UI/Input";

type Props = { postId: string };

const CommentList = ({ postId }: Props) => {
  const { type, setType, isOpen, setIsOpen } = useModal();
  const [nickname, setNickname] = useState("");
  const commentMenuRef = useRef<HTMLDivElement>(null);
  const [selectedComment, setSelectedComment] = useState<string | null>(null);
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["feeds", postId],
    queryFn: getPostById,
  });

  const { mutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeds", postId] });
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
      notify("success", "삭제되었습니다.");
    },
    onError: () => {
      notify("error", "요청에 실패했습니다.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeds", postId] });
      notify("success", "수정되었습니다.");
      setEditCommentId(null);
    },
    onError: () => {
      notify("error", "수정에 실패했습니다.");
    },
  });

  const delCommentButton = (comment: any) => {
    Swal.fire({
      icon: "warning",
      title: "삭제하면 되돌릴 수 없습니다.",
      text: "삭제 하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "확인",
      confirmButtonColor: "#429f50",
      cancelButtonColor: "red",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        mutate({ postId, comment });
      }
    });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      commentMenuRef.current &&
      !commentMenuRef.current.contains(event.target as Node)
    ) {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    if (type === "comment_menu") {
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
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const comments = data?.comment ?? [];
  const feedUser = data?.userId ?? "";

  const recentComments = comments.slice().sort((a: any, b: any) => {
    return b.createdAt.seconds - a.createdAt.seconds;
  });

  return (
    <ul className="mt-5 px-3">
      {recentComments.map((el: any) => (
        <li key={el.content} className="flex gap-2 mt-3">
          <div className="w-[32px] h-[32px] rounded-[50%]">
            <Image
              src={el.profileImg}
              alt="프로필 사진"
              width={32}
              height={32}
              className="rounded-[50%]"
            />
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold">{el.userId}</span>
                <span className="text-slate-400">
                  {getCreatedAt(el.createdAt.seconds)}
                </span>
              </div>
              {(nickname === el.userId || nickname === feedUser) && (
                <div className="mr-3 relative">
                  <Button
                    className="hover:text-slate-700"
                    onClick={() => {
                      setType("comment_menu");
                      setIsOpen(!isOpen);
                      setSelectedComment(el.id);
                    }}
                  >
                    <HiOutlineDotsVertical />
                  </Button>
                  {isOpen &&
                    type === "comment_menu" &&
                    selectedComment === el.id && (
                      <div
                        ref={commentMenuRef}
                        className="absolute top-7 right-0 border bg-white"
                      >
                        {(nickname === el.userId || nickname === feedUser) && (
                          <div className="w-[50px] border rounded flex flex-col items-center justify-center">
                            <Button onClick={() => delCommentButton(el)}>
                              삭제
                            </Button>
                            {nickname === el.userId && (
                              <Button
                                onClick={() => {
                                  setEditCommentId(el.id);
                                  setEditContent(el.content);
                                }}
                              >
                                수정
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                </div>
              )}
            </div>
            {editCommentId === el.id ? (
              <div className="flex items-center gap-2">
                <Input
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateMutation.mutate({
                        postId,
                        commentId: el.id,
                        newContent: editContent,
                      });
                    }
                  }}
                  className="border p-1"
                />
                <Button
                  onClick={() =>
                    updateMutation.mutate({
                      postId,
                      commentId: el.id,
                      newContent: editContent,
                    })
                  }
                >
                  확인
                </Button>
                <Button onClick={() => setEditCommentId(null)}>취소</Button>
              </div>
            ) : (
              <div>{el.content}</div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
