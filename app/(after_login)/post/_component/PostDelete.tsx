"use client";

import Swal from "sweetalert2";
import Button from "@/components/UI/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/utils/delPost";
import { useRouter } from "next/navigation";
import { notify } from "@/components/UI/Toast";
import { DelProps } from "./types";

const PostDelete = ({ postId, postImg }: DelProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: () => deletePost(postId, postImg),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
      router.back();
      notify("success", "삭제되었습니다.");
    },
    onError: () => {
      notify("error", "요청에 실패했습니다.");
    },
  });

  const delPostButton = () => {
    Swal.fire({
      icon: "warning",
      title: "삭제하면 복구할 수 없습니다.",
      text: "삭제 하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "확인",
      confirmButtonColor: "#429f50",
      cancelButtonColor: "red",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        mutation.mutate();
      }
    });
  };
  return (
    <Button onClick={() => delPostButton()} className="text-red-500">
      삭제
    </Button>
  );
};

export default PostDelete;
