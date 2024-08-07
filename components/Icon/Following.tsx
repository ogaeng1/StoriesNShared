"use client";

import { LuUserCheck2 } from "react-icons/lu";
import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";

const FollowingIcon = () => {
  const [curUser, setCurUser] = useState("");

  useEffect(() => {
    const isLoginValid = onAuthStateChanged(auth, (user) => {
      if (user) setCurUser(user.uid);
    });
    return () => isLoginValid();
  }, []);

  return (
    <Link
      href={`/follow-feeds/${curUser}`}
      className="w-[60px] h-[60px] rounded-md flex justify-center items-center hover:shadow-[inset_0_0_10px_rgba(128,128,128,0.5)]"
      aria-label="follow-feeds"
    >
      <LuUserCheck2 className="text-[32px]" />
    </Link>
  );
};

export default FollowingIcon;
