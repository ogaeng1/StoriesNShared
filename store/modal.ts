import { create } from "zustand";

interface ModalState {
  data?: null;
  type:
    | "menu"
    | "new"
    | "edit"
    | "detail_menu"
    | "comment_menu"
    | "following"
    | "follower";
  setType: (
    type:
      | "menu"
      | "new"
      | "edit"
      | "detail_menu"
      | "comment_menu"
      | "following"
      | "follower"
  ) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const useModal = create<ModalState>((set) => ({
  type: "menu",
  setType: (
    type:
      | "menu"
      | "new"
      | "edit"
      | "detail_menu"
      | "comment_menu"
      | "following"
      | "follower"
  ) => set({ type }),
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));

export default useModal;
