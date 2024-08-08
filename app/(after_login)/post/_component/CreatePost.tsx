"use client";

import Button from "@/components/UI/Button";
import useModal from "@/store/modal";

const CreatePost = () => {
  const { setType, isOpen, setIsOpen } = useModal();
  return (
    <Button
      className="h-[50px] border sm:h-[40px] md:h-[47px] border rounded-md my-2 px-4 sm:px-6 md:px-8 text-sm sm:text-base md:text-md"
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
