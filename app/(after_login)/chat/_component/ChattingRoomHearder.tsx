"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { getChatRoomInfo } from "@/utils/getChattingRoomInfo";
import { auth } from "@/firebase/firebase";

const ChattingRoomHeader = () => {
  const { id } = useParams();
  const [otherUserNickname, setOtherUserNickname] = useState("");

  useEffect(() => {
    const fetchChatRoomInfo = async () => {
      try {
        const chatRoomInfo = await getChatRoomInfo(id as string);
        const currentUser = auth.currentUser;
        if (currentUser) {
          const otherUser = chatRoomInfo.participants.find(
            (participant: string) => participant !== currentUser.displayName
          );
          setOtherUserNickname(otherUser);
        }
      } catch (error) {}
    };

    fetchChatRoomInfo();
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
