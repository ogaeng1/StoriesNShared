"use client";

import Container from "../_component/Container";
import SearchUser from "./_component/SearchUser";
import ChattingList from "./_component/ChattingList";
import Navbar from "@/components/Navbar";
import ModalType from "../_component/ModalType";
import useModal from "@/store/modal";

const ChatList = () => {
  const { isOpen } = useModal();
  return (
    <>
      <div className="flex justify-center min-w-[437px] min-h-[100vh] h-full">
        <div className="flex-col flex items-center justify-center">
          <Navbar />
          <Container>
            <SearchUser />
            <ChattingList />
          </Container>
        </div>
      </div>
      <div id="modal" />
      {isOpen && <ModalType />}
    </>
  );
};

export default ChatList;
