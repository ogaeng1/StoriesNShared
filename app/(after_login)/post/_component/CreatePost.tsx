"use client";

import Button from "@/components/UI/Button";
import useModal from "@/store/modal";

const CreatePost = () => {
  const { setType, isOpen, setIsOpen } = useModal();
  return (
    <Button
      className="h-[80px] border rounded-md"
      onClick={() => {
        setIsOpen(!isOpen);
        setType("new");
      }}
    >
      게시글 작성
    </Button>
  );
};

export default CreatePost;
