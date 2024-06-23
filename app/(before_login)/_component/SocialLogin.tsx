"use client";

import Button from "@/components/UI/Button";
import { auth, db, storage } from "@/firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";

const SocialLogin = () => {
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();

    const google = signInWithPopup(auth, provider);
    const user = (await google).user;

    const userExistValid = query(
      collection(db, "users"),
      where("id", "==", user.uid)
    );
    const userQuery = await getDocs(userExistValid);

    if (userQuery.empty) {
      if (user.photoURL) {
        const img = await fetch(user.photoURL);
        const blob = await img.blob();

        const storageRef = ref(
          storage,
          `profile_images/${user.uid}/${user.photoURL}`
        );
        await uploadBytes(storageRef, blob);
        const downloadImg = await getDownloadURL(storageRef);

        const userInfo = {
          id: user.uid,
          email: user.email,
          nickname: user.displayName,
          profileImg: downloadImg,
          bio: "반가워요~!",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };
        await addDoc(collection(db, "users"), userInfo);
      }
    }
  };
  return (
    <>
      <Button variant="google_login" onClick={googleLogin}>
        <Image
          src="/assets/icons/google.png"
          alt="구글 로그인 로고"
          width={24}
          height={24}
        />
        Google로 시작하기
      </Button>
    </>
  );
};

export default SocialLogin;
