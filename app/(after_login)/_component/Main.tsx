"use client";

import React from "react";
import BeforeLogin from "@/app/(before_login)/_component/BeforeMain";
import Container from "./Container";
import useAuthValid from "@/store/authValid";
import useModal from "@/store/modal";
import ModalType from "./ModalType";
import CreatePost from "../post/_component/CreatePost";
import PostList from "../post/_component/PostList";
import Navbar from "@/components/Navbar";

const Main = () => {
  const { isLogin } = useAuthValid();
  const { isOpen } = useModal();

  return isLogin ? (
    <>
      <div className="flex justify-center min-w-[437px] min-h-[100vh] h-full">
        <div className="flex-col flex items-center justify-center">
          <Navbar />
          <Container>
            <CreatePost />
            <PostList />
          </Container>
        </div>
      </div>
      <div id="modal" />
      {isOpen && <ModalType />}
    </>
  ) : (
    <BeforeLogin />
  );
};

export default Main;
