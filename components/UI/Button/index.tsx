import { ButtonHTMLAttributes } from "react";

type ButtonVariants =
  | "primary"
  | "login_btn"
  | "google_login"
  | "github_login"
  | "selectImgDel"
  | "followButton"
  | "messageButton";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariants;
}

const variants = {
  primary: "",
  login_btn:
    "w-[377px] h-[55px] flex justify-center items-center rounded-xl text-base bg-white",
  google_login:
    "w-[377px] h-[67px] flex justify-between items-center gap-3 rounded-xl px-3 border border-tertiary text-white",
  github_login:
    "w-[377px] h-[67px] flex justify-between items-center gap-3 rounded-xl px-3 border border-tertiary text-white",
  selectImgDel:
    "absolute flex justify-center items-center text-[20px] -top-[0.3rem] -right-[0.3rem] text-slate-600 hover:scale-125 duration-200",
  followButton:
    "w-full h-[42px] flex justify-center items-center rounded-md border text-base bg-[#1D9BF0] hover:bg-[#e3e4e6]",
  messageButton:
    "w-full h-[42px] flex justify-center items-center rounded-md border text-base bg-[#1D9BF0] hover:bg-[#e3e4e6]",
};

export default function Button({
  children,
  type,
  variant = "primary",
  className,
  disabled,
  id,
  onClick,
}: IButton) {
  return (
    <button
      type={type}
      className={`${variants[variant]} ${className}`}
      disabled={disabled}
      id={id}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
