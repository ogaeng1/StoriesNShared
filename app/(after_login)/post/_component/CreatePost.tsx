"use client";

import Button from "@/components/UI/Button";
import useModal from "@/store/modal";

const CreatePost = () => {
  const { setType, isOpen, setIsOpen } = useModal();
  return (
    <Button
      className="h-[67px] border rounded-md my-2"
      id="create-post"
      onClick={() => {
        setIsOpen(!isOpen);
        setType("new");
      }}
    >
      내 이야기 공유하기
    </Button>
  );
};

export default CreatePost;
