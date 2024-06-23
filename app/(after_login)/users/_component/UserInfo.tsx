"use client";

import Image from "next/image";
import Avatar from "@/components/UI/Avatar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";

const UserInfo = () => {
  const [profileImg, setProfileImg] = useState(null);
  const [userNickname, setUserNickName] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getUserProfile = async () => {
      const userQuery = query(collection(db, "users"), where("id", "==", id));
      const queryRes = await getDocs(userQuery);

      if (!queryRes.empty) {
        const userDoc = queryRes.docs[0];
        const userInfo = userDoc.data();
        setProfileImg(userInfo.profileImg);
        setUserNickName(userInfo.nickname);
      }
    };
    getUserProfile();
  }, [id]);

  return (
    <div className="h-[128px] p-[10px_25px]">
      <div className="h-full flex items-center justify-between">
        <div>
          {userNickname && (
            <div>
              <div>{userNickname}</div>
              <div className="flex gap-2 mt-2">
                <span>팔로워 xx명</span>
                <span>팔로잉 xx명</span>
              </div>
            </div>
          )}
        </div>
        <Avatar variant="profile">
          {profileImg && (
            <Image
              src={profileImg}
              alt="마이페이지 프로필 사진"
              width={64}
              height={64}
              className="rounded-[50%]"
            />
          )}
        </Avatar>
      </div>
      <button
        className="w-full p-2 border rounded-md"
        onClick={() => alert("미구현이라니까 왜누름?")}
      >
        프로필 수정(아직 미구현)
      </button>
    </div>
  );
};

export default UserInfo;
