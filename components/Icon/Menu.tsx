"use client";

import { HiMenuAlt2 } from "react-icons/hi";
import useModal from "@/store/modal";
import Button from "../UI/Button";

const MenuIcon = () => {
  const { setType, isOpen, setIsOpen } = useModal();

  return (
    <Button
      className="w-[64px] h-[64px] rounded-md flex justify-center items-center hover:shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]"
      onClick={() => {
        setIsOpen(!isOpen), setType("menu");
      }}
    >
      <HiMenuAlt2 className="text-[32px]" />
    </Button>
  );
};

export default MenuIcon;
