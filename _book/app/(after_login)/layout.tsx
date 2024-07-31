"use client";

import SplashScreen from "@/components/UI/SplashScreen";
import { auth } from "@/firebase/firebase";
import useAuthValid from "@/store/authValid";
import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";

type Props = { children: ReactNode; modal: ReactNode };

export default function Layout({ children, modal }: Props) {
  const { isLogin, setIsLogin } = useAuthValid();
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const isValid = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
      setLoading(false);
    });

    return () => isValid();
  }, [isLogin]);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <>
      {showSplash && <SplashScreen />}
      <div className="bg-primary">
        <div
          className={`transition-opacity duration-200 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        >
          {children}
          {modal}
        </div>
      </div>
    </>
  );
}
