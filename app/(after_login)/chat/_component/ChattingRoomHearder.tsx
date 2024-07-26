"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { getChatRoomInfo } from "@/utils/getChattingRoomInfo";
import { auth, db } from "@/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const ChattingRoomHeader = () => {
  const { id } = useParams();
  const [otherUserNickname, setOtherUserNickname] = useState("");

  useEffect(() => {
    const getCurrentUserNickname = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          return userDoc.data().nickname;
        }
      }
      return null;
    };

    const getChattingRoomInfo = async () => {
      try {
        const chatRoomInfo = await getChatRoomInfo(id as string);
        const currentUser = await getCurrentUserNickname();
        if (currentUser) {
          const otherUser = chatRoomInfo.participants.find(
            (participant: string) => participant !== currentUser
          );
          setOtherUserNickname(otherUser);
        }
      } catch (error) {}
    };
    getChattingRoomInfo();
  }, [id]);

  return (
    <div className="h-16 flex items-center text-xl justify-between">
      <Link href="/chat">
        <IoArrowBack />
      </Link>
      <div>{otherUserNickname}</div>
      <div></div>
    </div>
  );
};

export default ChattingRoomHeader;
