"use client";

import { HTMLAttributes, useEffect } from "react";
import { createPortal } from "react-dom";
import useModal from "@/store/modal";

type ModalType =
  | "menu"
  | "new"
  | "edit"
  | "detail_menu"
  | "comment_menu"
  | "following"
  | "follower";

interface ModalState extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  type: ModalType;
  isOverlay?: boolean;
}

const variants = {
  menu: "w-[200px] h-[200px] border bg-white rounded-md p-3",
  new: "",
  edit: "",
  detail_menu: "",
  comment_menu: "",
  following:
    "w-[273px] min-h-[298px] max-h-[324px] overflow-auto scrollbar-hide border bg-white rounded-md p-3",
  follower:
    "w-[273px] min-h-[298px] max-h-[324px] overflow-auto scrollbar-hide border bg-white rounded-md p-3",
};

const Modal = ({
  children,
  isOverlay = false,
  type = "menu",
  className,
}: ModalState) => {
  const { isOpen, setIsOpen } = useModal();
  const container = document.getElementById("modal");

  const modalHandler = () => {
    setIsOpen(!isOpen);
  };

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const preventScroll = () => {
    const currentScrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${currentScrollY}px`;
    document.body.style.overflowY = "scroll";
    return currentScrollY;
  };

  const allowScroll = (prevScrollY: number) => {
    document.body.style.position = "";
    document.body.style.width = "";
    document.body.style.top = "";
    document.body.style.overflowY = "";
    window.scrollTo(0, prevScrollY);
  };

  useEffect(() => {
    const prevScrollY = preventScroll();
    return () => {
      allowScroll(prevScrollY);
    };
  }, []);

  if (!container) return null;

  return createPortal(
    <div
      className={`z-[9999] fixed w-[100vw] h-screen flex justify-center items-center top-0 left-0 right-0 bottom-0 ${
        type !== "detail_menu" && "bg-[rgba(0,0,0,0.4)]"
      }`}
      onClick={modalHandler}
    >
      <div
        className={`${variants[type]} ${className} ${
          type === "detail_menu" && "absolute"
        }`}
        onClick={stopPropagation}
      >
        {children}
      </div>
    </div>,
    container
  );
};

export default Modal;
