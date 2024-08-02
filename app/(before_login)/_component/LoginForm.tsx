"use client";

import useLoginStore from "@/store/login";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { auth } from "@/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent } from "react";
import SocialLogin from "./SocialLogin";
import { notify } from "@/components/UI/Toast";

const LoginForm = () => {
  const { email, password, setEmail, setPassword } = useLoginStore();

  const userLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      notify("error", "이메일과 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <form
        className="min-w-[377px] flex flex-col items-center gap-2"
        onSubmit={userLoginSubmit}
      >
        <Input
          type="email"
          placeholder="이메일"
          className="w-[377px] h-[55px] py-[16px] px-3 bg-secondary text-white"
          value={email}
          id="login-email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          className="w-[377px] h-[55px] py-[16px] px-3 bg-secondary text-white"
          value={password}
          id="login-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="login_btn" id="login_btn">
          로그인
        </Button>
      </form>
      <div className="w-full flex items-center justify-between my-[2rem]">
        <hr className="w-2/5 h-[0.5px] border-tertiary" />
        <div className="w-1/5 flex justify-center text-tertiary">또는</div>
        <hr className="w-2/5 h-[0.5px] border-tertiary" />
      </div>
      <SocialLogin />
    </div>
  );
};

export default LoginForm;
