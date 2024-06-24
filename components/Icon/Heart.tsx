import { GoHeart } from "react-icons/go";
import Link from "next/link";

const HeartIcon = () => {
  return (
    <Link
      href="/"
      className="w-[64px] h-[64px] rounded-md flex justify-center items-center hover:shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]"
    >
      <GoHeart className="text-[32px]" />
    </Link>
  );
};

export default HeartIcon;
