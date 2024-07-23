"use client";

import { HiMenuAlt2 } from "react-icons/hi";
import useModal from "@/store/modal";
import Button from "../UI/Button";

const MenuIcon = () => {
  const { setType, isOpen, setIsOpen } = useModal();

  return (
    <Button
      className="w-[60px] h-[60px] rounded-md flex justify-center items-center hover:shadow-[inset_0_0_10px_rgba(128,128,128,0.5)]"
      onClick={() => {
        setIsOpen(!isOpen), setType("menu");
      }}
    >
      <HiMenuAlt2 className="text-[32px]" />
    </Button>
  );
};

export default MenuIcon;
