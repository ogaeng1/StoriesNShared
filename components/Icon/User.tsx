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
      className="w-[64px] h-[64px] rounded-md flex justify-center items-center hover:shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]"
    >
      <LuUser2 className="text-[32px]" />
    </Link>
  );
};

export default UserIcon;
