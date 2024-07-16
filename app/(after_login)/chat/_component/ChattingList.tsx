"use client";

import { useEffect, useState } from "react";
import { getInvolveChatRoom } from "@/utils/getInvolveChatRoom";
import { getUserProfile } from "@/utils/getUserProfile";
import { auth } from "@/firebase/firebase";
import { MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Image from "next/image";

type ChatRoom = {
  id: string;
  participants: string[];
  createdAt: { seconds: number; nanoseconds: number };
};

interface ChatRoomWithProfile extends ChatRoom {
  opponentProfileImg: string;
  unreadCount: number;
}

const ChattingList = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoomWithProfile[]>([]);
  const [userNickname, setUserNickname] = useState("");

  useEffect(() => {
    const fetchUserNickname = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          setUserNickname(userDoc.data().nickname);
        }
      }
    };

    fetchUserNickname();
  }, []);

  useEffect(() => {
    const fetchChatRooms = async () => {
      if (userNickname) {
        const rooms = await getInvolveChatRoom(userNickname);
        const roomsWithProfiles = await Promise.all(
          rooms.map(async (room) => {
            const opponentNickname = room.participants.find(
              (p) => p !== userNickname
            );
            const opponentProfile = await getUserProfile(opponentNickname!);

            // Fetch all messages and filter unread messages
            const messagesQuery = query(
              collection(db, "chatting", room.id, "messages")
            );
            const messagesSnapshot = await getDocs(messagesQuery);
            const unreadCount = messagesSnapshot.docs.filter(
              (doc) => !doc.data().readBy.includes(userNickname)
            ).length;

            return {
              ...room,
              opponentProfileImg: opponentProfile.profileImg,
              unreadCount,
            };
          })
        );
        setChatRooms(roomsWithProfiles);
      }
    };

    fetchChatRooms();
  }, [userNickname]);

  return (
    <div>
      <h1 className="mt-10 mb-3 text-2xl font-bold">내 채팅</h1>
      {chatRooms.map((room) => (
        <Link
          href={`/chat/${room.id}`}
          key={room.id}
          className="mb-2 h-16 border rounded-md flex justify-between items-center"
        >
          <div className="flex items-center">
            <Image
              src={room.opponentProfileImg}
              alt="프로필 이미지"
              width={36}
              height={36}
              className="rounded-full border mr-2"
            />
            <span>
              {room.participants.filter((p) => p !== userNickname).join(", ")}
            </span>
          </div>
          <div>
            <div className="text-2xl">
              <MdKeyboardArrowRight />
            </div>
            {room.unreadCount > 0 && (
              <div className="w-5 h-5 flex justify-center items-center bg-red-500 text-white rounded-[50%] text-sm">
                {room.unreadCount}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ChattingList;
