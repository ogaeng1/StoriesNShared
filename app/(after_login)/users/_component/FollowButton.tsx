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
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@/components/UI/Button";

type FollowButtonProps = {
  currentUserNickname: string;
  targetUserNickname: string;
};

const FollowButton = ({
  currentUserNickname,
  targetUserNickname,
}: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [targetUserId, setTargetUserId] = useState<string>("");

  const queryClient = useQueryClient();

  const fetchUserIdByNickname = async (nickname: string): Promise<string> => {
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
        const fetchedCurrentUserId = await fetchUserIdByNickname(
          currentUserNickname
        );
        setCurrentUserId(fetchedCurrentUserId);

        const fetchedTargetUserId = await fetchUserIdByNickname(
          targetUserNickname
        );
        setTargetUserId(fetchedTargetUserId);

        await checkFollowing(fetchedCurrentUserId, fetchedTargetUserId);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserIds();
  }, [currentUserNickname, targetUserNickname]);

  const handleFollow = async () => {
    if (!currentUserId || !targetUserId) return;
    const currentUserRef = doc(db, "users", currentUserId);
    const targetUserRef = doc(db, "users", targetUserId);
    if (isFollowing) {
      await updateDoc(currentUserRef, { following: arrayRemove(targetUserId) });
      await updateDoc(targetUserRef, { follower: arrayRemove(currentUserId) });
      setIsFollowing(false);
    } else {
      await updateDoc(currentUserRef, { following: arrayUnion(targetUserId) });
      await updateDoc(targetUserRef, { follower: arrayUnion(currentUserId) });
      setIsFollowing(true);
    }
  };

  const mutation = useMutation({
    mutationFn: handleFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", currentUserId] });
      queryClient.invalidateQueries({ queryKey: ["user", targetUserId] });
    },
    onError: (error: Error) => {
      console.error("Follow/unfollow failed:", error);
    },
  });

  return (
    <Button variant="followButton" onClick={() => mutation.mutate()}>
      {isFollowing ? "팔로우 끊기" : "팔로우"}
    </Button>
  );
};

export default FollowButton;
