"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LuUser2 } from "react-icons/lu";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";

const UserIcon = () => {
  const [curUser, setCurUser] = useState("");

  useEffect(() => {
    const isLoginValid = onAuthStateChanged(auth, (user) => {
      if (user) setCurUser(user.uid);
    });
    return () => isLoginValid();
  }, []);

  return (
    <Link
      href={`/users/${curUser}`}
      className="w-[32px] h-[32px] flex justify-center items-center"
    >
      <LuUser2 className="text-[32px]" />
    </Link>
  );
};

export default UserIcon;
