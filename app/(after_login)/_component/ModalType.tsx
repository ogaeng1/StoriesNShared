"use client";

import Modal from "@/components/UI/Modal";
import useModal from "@/store/modal";
import MenuModalContent from "./MenuModalContent";
import NewModalContent from "../post/_component/NewModalContent";

const ModalType = () => {
  const { type, isOpen } = useModal();
  return (
    <>
      {isOpen && type === "menu" && (
        <Modal type={type} isOverlay>
          <MenuModalContent />
        </Modal>
      )}
      {isOpen && type === "new" && (
        <Modal type={type} isOverlay>
          <NewModalContent />
        </Modal>
      )}
    </>
  );
};

export default ModalType;
