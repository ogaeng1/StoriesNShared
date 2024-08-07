import { AiFillHome } from "react-icons/ai";
import Link from "next/link";

const HomeIcon = () => {
  return (
    <Link
      href="/"
      className="w-[60px] h-[60px] rounded-md flex justify-center items-center hover:shadow-[inset_0_0_10px_rgba(128,128,128,0.5)]"
      aria-label="home"
    >
      <AiFillHome className="text-[32px]" />
    </Link>
  );
};

export default HomeIcon;
