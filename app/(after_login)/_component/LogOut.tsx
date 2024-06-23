"use client";

import { useRouter } from "next/navigation";
import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";
import Button from "@/components/UI/Button";

const LogoutButton = () => {
  const router = useRouter();

  const userSignOut = async () => {
    await signOut(auth);
    alert("로그아웃 함");
    router.push("/");
  };

  return (
    <Button
      type="button"
      variant="primary"
      className="border p-2"
      onClick={userSignOut}
    >
      로그아웃
    </Button>
  );
};

export default LogoutButton;
