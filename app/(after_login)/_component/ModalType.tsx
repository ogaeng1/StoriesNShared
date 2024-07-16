"use client";

import Modal from "@/components/UI/Modal";
import useModal from "@/store/modal";
import MenuModalContent from "./MenuModalContent";
import NewModalContent from "../post/_component/NewModalContent";
import FollowingList from "../users/_component/FollowingList";
import FollowerList from "../users/_component/FollowerList";

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
      {isOpen && type === "following" && (
        <Modal type={type} isOverlay>
          <FollowingList />
        </Modal>
      )}
      {isOpen && type === "follower" && (
        <Modal type={type} isOverlay>
          <FollowerList />
        </Modal>
      )}
    </>
  );
};

export default ModalType;
