"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import useAuthValid from "@/store/authValid";
import Main from "../../_component/Main";
import Error from "../[id]/error";
import UserInfo from "./UserInfo";

const UserExistValid = () => {
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
  }, [id]);

  return userExist ? (
    <Main>
      <UserInfo />
    </Main>
  ) : (
    <Error />
  );
};

export default UserExistValid;
