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
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  };

  const SubmitSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!profileImg) {
      alert("프로필 사진은 필수입니다.");
      return;
    }

    if (!email || !password || !nickname || !bio) {
      alert("모든 항목 입력은 필수입니다.");
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
      alert("중복된 이메일과 닉네임이 존재합니다.");
      return;
    }

    if (!emailQuery.empty) {
      alert("중복된 이메일이 존재합니다.");
      return;
    }

    if (!nicknameQuery.empty) {
      alert("중복된 닉네임이 존재합니다.");
      return;
    }

    const userInfo = { email, password, nickname, profileImg, bio };
    await userSignUp(userInfo);
    alert("가입을 축하합니다.");
    setProfileImg(null);
    setProfile(null);
    setEmail("");
    setPassword("");
    setNickname("");
    setBio("");

    router.push("/");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        className="max-w-[760px] min-w-[437px] h-[760px] border flex flex-col p-12"
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
          <input
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
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="text"
            placeholder="닉네임"
            value={nickname}
            required
            onChange={(e) => setNickname(e.target.value)}
          />
          <textarea
            placeholder="소개글"
            maxLength={200}
            className="h-[170px] border p-2 rounded-md resize-none focus:outline-none"
            required
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="flex justify-between mt-10">
          <Link href="/" className="w-[45%] text-center border rounded-md py-1">
            돌아가기
          </Link>
          <button
            type="submit"
            className="w-[45%] text-center border rounded-md py-1"
          >
            가입하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
