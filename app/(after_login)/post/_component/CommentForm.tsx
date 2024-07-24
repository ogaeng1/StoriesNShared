"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDoc, arrayUnion, doc, increment } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { notify } from "@/components/UI/Toast";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { FiSend } from "react-icons/fi";
import Image from "next/image";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Props = { profileImg: string; postId: string; nickname: string };
type CommentProps = {
  profileImg: string;
  postId: string;
  nickname: string;
  comment: string;
};

const CommentForm = ({ profileImg, postId, nickname }: Props) => {
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const addComment = async ({
    postId,
    comment,
    profileImg,
    nickname,
  }: CommentProps) => {
    const postRef = doc(db, "feeds", postId);
    await updateDoc(postRef, {
      comment: arrayUnion({
        id: uuidv4(),
        profileImg,
        userId: nickname,
        content: comment,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      commentCount: increment(1),
    });
  };

  const { mutate } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeds", postId] });
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
      setComment("");
    },
    onError: () => {
      notify("error", "댓글 작성에 실패했습니다.");
    },
  });

  const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim() === "") {
      notify("warning", "댓글을 입력해주세요.");
      return;
    }
    mutate({ postId, comment, profileImg, nickname });
  };

  return (
    <div className="flex items-center gap-2 mt-2 mx-3">
      <Image
        src={profileImg}
        alt="유저 프로필 사진"
        width={38}
        height={38}
        className="rounded-[50%]"
      />
      <form
        className="flex w-full items-center justify-between"
        onSubmit={handleComment}
      >
        <Input
          type="text"
          placeholder="댓글을 입력하세요"
          className="w-full h-[38px] border box-border px-2 bg-secondary"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button className="hover:scale-110 duration-200" type="submit">
          <FiSend className="text-2xl" />
        </Button>
      </form>
    </div>
  );
};

export default CommentForm;
