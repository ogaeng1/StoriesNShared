"use client";

import Button from "@/components/UI/Button";
import { auth, db, storage } from "@/firebase/firebase";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
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
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

const SocialLogin = () => {
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();

    const google = await signInWithPopup(auth, provider);
    const user = google.user;

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

  const githubLogin = async () => {
    const provider = new GithubAuthProvider();

    const github = await signInWithPopup(auth, provider);
    const user = github.user;

    const userCredential = GithubAuthProvider.credentialFromResult(github);
    const token = userCredential?.accessToken;

    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    const githubUser = await response.json();
    const nickname = githubUser.login;

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
          nickname: nickname,
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
    <div className="flex flex-col gap-3">
      <Button variant="google_login" onClick={googleLogin}>
        <Image
          src="/assets/icons/google.png"
          alt="구글 로그인 로고"
          width={32}
          height={32}
          className="border bg-white rounded-[50%]"
        />
        Google로 시작하기
        <MdKeyboardArrowRight className="text-xl" />
      </Button>
      <Button variant="google_login" onClick={githubLogin}>
        <Image
          src="/assets/icons/github.png"
          alt="깃허브 로그인 로고"
          width={32}
          height={32}
          className="border bg-white rounded-[50%]"
        />
        Github로 시작하기
        <MdKeyboardArrowRight className="text-xl" />
      </Button>
      <div className="flex justify-center">
        <span className="text-white">아직 회원이 아니신가요?</span>
        <Link className="pl-2 text-blue-500 font-bold" href="/signup">
          가입하기
        </Link>
      </div>
    </div>
  );
};

export default SocialLogin;
