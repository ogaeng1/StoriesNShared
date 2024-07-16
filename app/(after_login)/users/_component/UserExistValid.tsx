"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import useAuthValid from "@/store/authValid";
import Error from "../[id]/error";
import UserInfo from "./UserInfo";
import SideBar from "@/components/Sidebar";
import Container from "../../_component/Container";
import ModalType from "../../_component/ModalType";
import useModal from "@/store/modal";

const UserExistValid = () => {
  const { userExist, setUserExist } = useAuthValid();
  const { id } = useParams();
  const { isOpen } = useModal();

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

  return userExist ? (
    <div className="flex min-w-[438px] min-h-[100vh] h-full overflow-x-hidden">
      <SideBar />
      <div className="flex-1 flex items-center justify-center">
        <Container>
          <UserInfo userId={id as string} />
        </Container>
      </div>
      <div id="modal" />
      {isOpen && <ModalType />}
    </div>
  ) : (
    <Error />
  );
};

export default UserExistValid;
