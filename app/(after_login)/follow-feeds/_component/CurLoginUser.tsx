"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import useAuthValid from "@/store/authValid";
import FollowFeed from "./FollowFeed";

const CurLoginUser = () => {
  const { userExist, setUserExist } = useAuthValid();
  const { id } = useParams();

  useEffect(() => {
    const userExistValid = async () => {
      if (id) {
        const idValid = query(collection(db, "users"), where("id", "==", id));
        const idQuery = await getDocs(idValid);

        if (!idQuery.empty) {
          setUserExist(true);
        }
      }
    };

    userExistValid();
  }, []);

  return userExist && <FollowFeed />;
};

export default CurLoginUser;
