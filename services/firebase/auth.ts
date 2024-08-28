import { notify } from "@/components/UI/Toast";
import { auth } from "@/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { LoginInput } from "./types";
import { useUserStore } from "@/store/auth";

export const signIn = async ({ email, password }: LoginInput) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (user) {
      const { fetchUser } = useUserStore.getState();
      await fetchUser(user.uid);
    }
    return true;
  } catch (error: unknown) {
    const { code } = error as FirebaseError;
    switch (code) {
      case "auth/user-not-found":
      case "auth/invalid-password":
      case "auth/invalid-email":
      case "auth/invalid-credential":
        notify("error", "이메일 혹은 비밀번호를 확인하세요.");
        break;
      case "auth/internal-error":
        notify("error", "잘못된 요청입니다.");
        break;
      default:
        notify("error", "로그인에 실패하였습니다.");
    }
    return false;
  }
};
