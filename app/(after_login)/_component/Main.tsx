"use client";

import React, { ReactNode, useEffect } from "react";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import BeforeLogin from "@/app/(before_login)/_component/BeforeMain";
import SideBar from "@/components/Sidebar";
import Container from "./Container";
import useAuthValid from "@/store/authValid";
import useModal from "@/store/modal";
import ModalType from "./ModalType";
import CreatePost from "../post/_component/CreatePost";
import PostList from "../post/_component/PostList";

const Main = () => {
  const { isLogin, setIsLogin } = useAuthValid();
  const { isOpen } = useModal();

  useEffect(() => {
    const isValid = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });

    return () => isValid();
  }, [isLogin]);

  return isLogin ? (
    <div className="flex min-w-[438px] min-h-[100vh] h-full overflow-x-hidden">
      <SideBar />
      <div className="flex-1 flex items-center justify-center">
        <Container>
          <CreatePost />
          <PostList />
        </Container>
      </div>
      <div id="modal" />
      {isOpen && <ModalType />}
    </div>
  ) : (
    <BeforeLogin />
  );
};

export default Main;
