"use client";

import { useState, useEffect } from "react";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  query,
  collection,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db, auth } from "@/firebase/firebase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "@/components/UI/Button";
import Image from "next/image";
import Avatar from "@/components/UI/Avatar";
import useModal from "@/store/modal";
import { onAuthStateChanged } from "firebase/auth";
import { createChatRoom } from "@/utils/createChattingRoom";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  nickname: string;
  email: string;
  profileImg: string;
  follower: string[];
  following: string[];
  bio: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

type Props = { userId: string };

const UserInfo = ({ userId }: Props) => {
  const [curUser, setCurUser] = useState<string>("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [targetUserId, setTargetUserId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { isOpen, setIsOpen, setType } = useModal();
  const router = useRouter();
  const queryClient = useQueryClient();

  const fetchUserById = async (userId: string) => {
    const userQuery = query(collection(db, "users"), where("id", "==", userId));
    const queryRes = await getDocs(userQuery);

    if (!queryRes.empty) {
      const userDoc = queryRes.docs[0];
      return userDoc.data() as User;
    }

    throw new Error("User not found");
  };

  const fetchUserIdByNickname = async (nickname: string) => {
    const userQuery = query(
      collection(db, "users"),
      where("nickname", "==", nickname)
    );
    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return userDoc.id;
    }

    throw new Error("User not found");
  };

  const checkFollowing = async (
    currentUserId: string,
    targetUserId: string
  ) => {
    if (!currentUserId || !targetUserId) return;

    const docRef = doc(db, "users", currentUserId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setIsFollowing(docSnap.data().following.includes(targetUserId));
    }
  };

  useEffect(() => {
    const fetchUserIds = async () => {
      try {
        const fetchedCurrentUserId = await fetchUserIdByNickname(curUser);
        setCurrentUserId(fetchedCurrentUserId);

        const fetchedTargetUserId = await fetchUserIdByNickname(
          user?.nickname as string
        );
        setTargetUserId(fetchedTargetUserId);

        await checkFollowing(fetchedCurrentUserId, fetchedTargetUserId);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserIds();
  }, [curUser]);

  const handleFollow = async () => {
    if (!currentUserId || !targetUserId) return;

    const currentUserRef = doc(db, "users", currentUserId);
    const targetUserRef = doc(db, "users", targetUserId);

    if (isFollowing) {
      await updateDoc(currentUserRef, {
        following: arrayRemove(targetUserId),
      });
      await updateDoc(targetUserRef, {
        follower: arrayRemove(currentUserId),
      });
      setIsFollowing(false);
    } else {
      await updateDoc(currentUserRef, {
        following: arrayUnion(targetUserId),
      });
      await updateDoc(targetUserRef, {
        follower: arrayUnion(currentUserId),
      });
      setIsFollowing(true);
    }
  };

  const handleMessage = async () => {
    if (!curUser || !user?.nickname) return;

    const roomId = await createChatRoom([curUser, user.nickname]);
    router.push(`/chat/${roomId}`);
  };

  const mutation = useMutation({
    mutationFn: handleFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
    },
    onError: (error: Error) => {
      console.error("Follow/unfollow failed:", error);
    },
  });

  const { data: user, refetch } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId),
  });

  useEffect(() => {
    refetch();
  }, [queryClient]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const nickname = userDoc.data().nickname;
          setCurUser(nickname);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  if (!loading && user) {
    return (
      <div className="h-[128px] p-[10px_25px]">
        <div className="flex justify-center">{user.nickname}</div>
        <div className="h-full flex items-center">
          <Avatar variant="profile">
            {user.profileImg && (
              <Image
                src={user.profileImg}
                alt="마이페이지 프로필 사진"
                width={64}
                height={64}
                className="rounded-[50%]"
              />
            )}
          </Avatar>
          <div className="flex gap-3 items-center ml-5 font-semibold">
            <Button
              className="flex flex-col items-center"
              onClick={() => {
                setIsOpen(!isOpen);
                setType("follower");
              }}
            >
              <div>{user.follower.length}</div>
              <div>팔로워</div>
            </Button>
            <Button
              className="flex flex-col items-center"
              onClick={() => {
                setIsOpen(!isOpen);
                setType("following");
              }}
            >
              <div>{user.following.length}</div>
              <div>팔로잉</div>
            </Button>
          </div>
        </div>
        {curUser !== user.nickname && (
          <div className="flex gap-3 justify-between items-center">
            <Button variant="followButton" onClick={() => mutation.mutate()}>
              {isFollowing ? "팔로우 끊기" : "팔로우"}
            </Button>
            <Button variant="messageButton" onClick={handleMessage}>
              메시지
            </Button>
          </div>
        )}
        <div>{user.bio}</div>
      </div>
    );
  }
};

export default UserInfo;
