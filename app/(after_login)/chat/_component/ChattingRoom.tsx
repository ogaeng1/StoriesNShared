"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { sendMessage, subscribeToMessages } from "@/utils/sendMessage";
import { readMessageMark } from "@/utils/readMessageMark";
import { auth, db } from "@/firebase/firebase";
import { useParams } from "next/navigation";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Image from "next/image";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { FiSend } from "react-icons/fi";
import ChattingRoomHeader from "./ChattingRoomHearder";
import { groupMessagesByDate } from "@/utils/messageDateGroup";
import Container from "../../_component/Container";
import ModalType from "../../_component/ModalType";
import Navbar from "@/components/Navbar";
import useModal from "@/store/modal";

const ChattingRoom = () => {
  const { isOpen } = useModal();
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userProfile, setUserProfile] = useState<{
    nickname: string;
    profileImg: string;
  } | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          setUserProfile({
            nickname: userData.nickname,
            profileImg: userData.profileImg,
          });
        }
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (id) {
      const unsubscribe = subscribeToMessages(id as string, setMessages);
      return () => unsubscribe();
    }
  }, [id]);

  useEffect(() => {
    const markAllMessagesAsRead = async () => {
      if (id && userProfile?.nickname) {
        for (const message of messages) {
          if (!message.readBy.includes(userProfile.nickname)) {
            await readMessageMark(
              id as string,
              message.id,
              userProfile.nickname
            );
          }
        }
      }
    };

    markAllMessagesAsRead();
  }, [id, messages, userProfile]);

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (user && newMessage.trim()) {
      await sendMessage(
        id as string,
        userProfile?.nickname as string,
        userProfile?.profileImg as string,
        newMessage.trim()
      );
    }
    setNewMessage("");
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <>
      <div className="flex justify-center min-w-[437px] min-h-[100vh] h-full">
        <div className="flex-col flex items-center justify-center">
          <Navbar />
          <Container>
            <ChattingRoomHeader />
            <hr />
            <div className="min-h-[80%] overflow-auto scrollbar-hide">
              {Object.entries(groupedMessages).map(([date, messages]) => (
                <div key={date}>
                  <div className="text-center my-5">
                    <span className="bg-secondary rounded-2xl px-3 py-1">
                      {date}
                    </span>
                  </div>
                  {messages.map((message: DocumentData) => (
                    <div
                      key={message.id}
                      className={`flex items-center mb-2 ${
                        message.sender === userProfile?.nickname
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.sender !== userProfile?.nickname && (
                        <Image
                          src={message.senderProfileImg}
                          alt="프로필 이미지"
                          width={36}
                          height={36}
                          className="rounded-[50%] border mr-2"
                        />
                      )}
                      <div>
                        <strong>{message.sender}</strong>
                        <div
                          className={`p-2 rounded-lg max-w-80 break-words ${
                            message.sender === userProfile?.nickname
                              ? "bg-tertiary"
                              : "bg-secondary"
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                      {message.sender === userProfile?.nickname && (
                        <Image
                          src={message.senderProfileImg}
                          alt="프로필 이미지"
                          width={36}
                          height={36}
                          className="rounded-[50%] border ml-2"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <form
              onSubmit={handleSendMessage}
              className="flex justify-end items-center h-10 relative mt-5"
            >
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="메시지를 입력하세요"
                className="w-full h-[45px] py-[16px] px-3 bg-secondary text-white pr-12"
              />
              <Button type="submit" className="w-10 h-full text-2xl absolute">
                <FiSend />
              </Button>
            </form>
          </Container>
        </div>
      </div>
      <div id="modal" />
      {isOpen && <ModalType />}
    </>
  );
};

export default ChattingRoom;
