"use client";

import { useRouter } from "next/navigation";
import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";
import Button from "@/components/UI/Button";
import useModal from "@/store/modal";

const LogoutButton = () => {
  const { isOpen, setIsOpen } = useModal();
  const router = useRouter();

  const userSignOut = async () => {
    await signOut(auth);
    setIsOpen(!isOpen);
    router.push("/");
  };

  return (
    <Button
      type="button"
      variant="primary"
      className="border p-2 rounded-md"
      onClick={userSignOut}
    >
      로그아웃
    </Button>
  );
};

export default LogoutButton;
