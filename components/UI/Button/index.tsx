import { ButtonHTMLAttributes } from "react";

type ButtonVariants = "primary" | "login_btn" | "google_login";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariants;
}

const variants = {
  primary: "",
  login_btn:
    "w-[320px] h-[42px] flex justify-center items-center rounded-md text-base bg-[#1D9BF0] text-white",
  google_login:
    "w-[320px] h-[42px] flex justify-center items-center gap-3 rounded-md border text-base",
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
