import { create } from "zustand";

interface ModalState {
  data?: null;
  type: "menu" | "new" | "edit" | "detail";
  setType: (type: "menu" | "new" | "edit" | "detail") => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const useModal = create<ModalState>((set) => ({
  type: "menu",
  setType: (type: "menu" | "new" | "edit" | "detail") => set({ type }),
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));

export default useModal;
