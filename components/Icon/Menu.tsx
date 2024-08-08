"use client";

import { HiMenuAlt2 } from "react-icons/hi";
import useModal from "@/store/modal";
import Button from "../UI/Button";

const MenuIcon = () => {
  const { setType, isOpen, setIsOpen } = useModal();

  return (
    <Button
      className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] rounded-md flex justify-center items-center hover:shadow-[inset_0_0_10px_rgba(128,128,128,0.5)]"
      onClick={() => {
        setIsOpen(!isOpen), setType("menu");
      }}
      aria-label="menu"
    >
      <HiMenuAlt2 className="text-[20px] sm:text-[25px] md:text-[32px]" />
    </Button>
  );
};

export default MenuIcon;
