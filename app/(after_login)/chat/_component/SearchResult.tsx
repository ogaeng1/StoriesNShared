"use client";

import { useRouter } from "next/navigation";
import { ResultProps } from "../../search-user/_component/types";
import Image from "next/image";
import { RiChatNewLine } from "react-icons/ri";
import { PiSpinnerGapBold } from "react-icons/pi";
import Button from "@/components/UI/Button";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { createChatRoom } from "@/utils/createChattingRoom";

const SearchResult = ({ searchResult, loading, keyword }: ResultProps) => {
  const [curUserNickname, setCurUserNickName] = useState("");
  const router = useRouter();

  const handleCreateChatRoom = async (participants: string[]) => {
    console.log("Creating chat room with participants:", participants);
    const roomId = await createChatRoom(participants);
    router.push(`/chat/${roomId}`);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          setCurUserNickName(userDoc.data().nickname || "");
        }
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <>
      {!loading && searchResult.length > 0 && (
        <ul className="absolute top-full w-full bg-secondary text-white rounded shadow-lg">
          {searchResult.map((user) => (
            <li
              key={user.id}
              className="p-[10px_15px] border-t border-gray-200 flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <div className="w-[45px] h-[45px] rounded-[50%] border">
                  <Image
                    src={user.profileImg}
                    alt="프로필 이미지"
                    width={45}
                    height={45}
                    className="rounded-[50%]"
                  />
                </div>
                <div>
                  <div className="font-bold">{user.nickname}</div>
                </div>
              </div>
              {curUserNickname === user.nickname ? (
                <Button onClick={() => alert("자신과는 대화할 수 없습니다.")}>
                  <RiChatNewLine className="text-[26px]" />
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    handleCreateChatRoom([curUserNickname, user.nickname])
                  }
                >
                  <RiChatNewLine className="text-[26px]" />
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}
      {loading && (
        <div className="w-full absolute top-full bg-secondary text-white">
          <div className="border p-[10px_15px] flex justify-center items-center text-2xl">
            <PiSpinnerGapBold className="animate-spinner" />
          </div>
        </div>
      )}
      {!loading && searchResult.length === 0 && keyword.length > 0 && (
        <div className="w-full absolute top-full bg-secondary text-white">
          <div className="border p-[10px_15px] flex justify-center items-center text-xl">
            검색 결과가 없습니다.
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResult;
