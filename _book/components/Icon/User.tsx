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
      className="w-[60px] h-[60px] rounded-md flex justify-center items-center hover:shadow-[inset_0_0_10px_rgba(128,128,128,0.5)]"
    >
      <LuUser2 className="text-[32px]" />
    </Link>
  );
};

export default UserIcon;
