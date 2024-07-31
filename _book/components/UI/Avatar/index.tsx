import { HTMLAttributes } from "react";

type AvatarVariant = "profile";

interface IAvatar extends HTMLAttributes<HTMLDivElement> {
  variant: AvatarVariant;
}

const variants = {
  profile: "w-[64px] h-[64px] rounded-[50%] flex justify-center items-center",
};

const Avatar = ({ children, className, variant = "profile" }: IAvatar) => {
  return <div className={`${variants[variant]} ${className}`}>{children}</div>;
};

export default Avatar;
