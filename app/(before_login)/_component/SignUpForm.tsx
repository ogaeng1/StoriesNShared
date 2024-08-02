"use client";

import { auth, db, storage } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import useSignUpStore from "@/store/signup";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Input from "@/components/UI/Input";
import Link from "next/link";
import Textarea from "@/components/UI/Textarea";
import Button from "@/components/UI/Button";
import { notify } from "@/components/UI/Toast";

interface IUserInfo {
  email: string;
  password: string;
  nickname: string;
  profileImg: string | null;
  bio: string;
}

const SignUpForm = () => {
  const {
    email,
    password,
    nickname,
    bio,
    profileImg,
    follower,
    following,
    setBio,
    setEmail,
    setNickname,
    setPassword,
    setProfileImg,
  } = useSignUpStore();
  const [profile, setProfile] = useState<File | null>(null);

  const router = useRouter();

  const profileImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files ? e.target.files[0] : null;
    if (img) {
      setProfile(img);
      setProfileImg(URL.createObjectURL(img));
    }
  };

  const userSignUp = async (userInfo: IUserInfo) => {
    const { email, password, nickname, profileImg, bio } = userInfo;

    if (email && password && nickname && profile && profileImg && bio) {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const storageRef = ref(
        storage,
        `profile_images/${nickname}/${profile.name}`
      );
      await uploadBytes(storageRef, profile);
      const downloadImg = await getDownloadURL(storageRef);

      /* 회원가입 유저 정보 db에 저장 */
      await addDoc(collection(db, "users"), {
        id: user.uid,
        email,
        nickname,
        password,
        profileImg: downloadImg,
        bio,
        follower,
        following,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  };

  const SubmitSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!profileImg || !email || !password || !nickname || !bio) {
      notify("error", "모든 항목은 필수입니다.");
      return;
    }

    const emailValid = query(
      collection(db, "users"),
      where("email", "==", email)
    );
    const emailQuery = await getDocs(emailValid);

    const nicknameValid = query(
      collection(db, "users"),
      where("nickname", "==", nickname)
    );
    const nicknameQuery = await getDocs(nicknameValid);

    if (!emailQuery.empty && !nicknameQuery.empty) {
      notify("error", "이미 사용중인 이메일입니다.");
      return;
    }

    if (!emailQuery.empty) {
      notify("error", "이미 사용중인 이메일입니다.");
      return;
    }

    if (!nicknameQuery.empty) {
      notify("error", "이미 사용중인 닉네임입니다.");
      return;
    }

    const userInfo = { email, password, nickname, profileImg, bio };
    await userSignUp(userInfo);
    notify("success", `${nickname}님, 환영합니다!`);
    setProfileImg(null);
    setProfile(null);
    setEmail("");
    setPassword("");
    setNickname("");
    setBio("");

    router.push("/");
  };

  return (
    <div className="h-screen bg-primary flex justify-center items-center text-white">
      <form
        className="min-w-[377px] border rounded-xl flex flex-col p-12"
        onSubmit={SubmitSignUp}
      >
        <label htmlFor="profile-img" className="flex justify-center">
          {profileImg ? (
            <Image
              src={profileImg}
              alt="프로필 이미지"
              width={60}
              height={60}
              className="hover:cursor-pointer rounded-[50%]"
            />
          ) : (
            <Image
              src="/assets/icons/base_profile_img.png"
              alt="기본 프로필 이미지"
              width={60}
              height={60}
              className="hover:cursor-pointer rounded-[50%]"
            />
          )}
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            id="profile-img"
            onChange={profileImgChange}
          />
        </label>
        <div className="mb-10 flex justify-center">
          <span className="text-red-600 text-[12px]">*</span>
          프로필 사진
        </div>
        <div className="flex flex-col gap-7">
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            id="input-email"
            className="w-[377px] h-[55px] py-[16px] px-3 bg-secondary text-white"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            id="input-password"
            className="w-[377px] h-[55px] py-[16px] px-3 bg-secondary text-white"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="text"
            placeholder="닉네임"
            value={nickname}
            id="input-nickname"
            maxLength={12}
            className="w-[377px] h-[55px] py-[16px] px-3 bg-secondary text-white"
            required
            onChange={(e) => setNickname(e.target.value)}
          />
          <Textarea
            placeholder="소개글"
            className="h-[170px] bg-secondary text-white"
            required
            value={bio}
            id="input-bio"
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="flex justify-between mt-10">
          <Link href="/" className="w-[45%] text-center border rounded-md py-1">
            돌아가기
          </Link>
          <Button
            type="submit"
            className="w-[45%] text-center border rounded-md py-1"
            id="signup-btn"
          >
            가입하기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
