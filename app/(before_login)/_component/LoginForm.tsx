"use client";

import Link from "next/link";
import useLoginStore from "@/store/login";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { auth } from "@/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent } from "react";
import SocialLogin from "./SocialLogin";

const LoginForm = () => {
  const { email, password, setEmail, setPassword } = useLoginStore();

  const userLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("로그인 성공");
    } catch (err) {
      alert("이메일과 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="flex flex-col justify-center gap-10">
      <div className="border py-10 px-5">
        <div className="flex justify-center text-lg font-bold">SNS</div>
        <form
          className="max-h-[430px] flex flex-col items-center gap-7"
          onSubmit={userLoginSubmit}
        >
          <Input
            type="email"
            placeholder="이메일"
            className="w-[320px]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            className="w-[320px]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="login_btn">
            로그인
          </Button>
        </form>
        <div className="w-full flex items-center justify-between my-[2rem]">
          <hr className="w-2/5 border-[0.5px] border-gray-300" />
          <div className="w-1/5 flex justify-center">또는</div>
          <hr className="w-2/5 border-[0.5px] border-gray-300" />
        </div>
        <SocialLogin />
        <div className="flex justify-center mt-10">
          <span>아직 회원이 아니신가요?</span>
          <Link className="pl-2 text-blue-500 font-bold" href="/signup">
            가입하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
