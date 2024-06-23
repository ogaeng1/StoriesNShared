"use client";

import React, { ReactNode, useEffect } from "react";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import BeforeLogin from "@/app/(before_login)/_component/BeforeMain";
import SideBar from "@/components/Sidebar";
import Container from "./Container";
import useAuthValid from "@/store/authValid";
import LogoutButton from "./LogOut";

interface MainProps {
  children: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  const { isLogin, setIsLogin } = useAuthValid();

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
    <div className="flex">
      <SideBar />
      <div className="flex-1 flex items-center justify-center">
        <Container>{children}</Container>
        <LogoutButton />
      </div>
    </div>
  ) : (
    <BeforeLogin />
  );
};

export default Main;
