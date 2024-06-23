import { AiFillHome } from "react-icons/ai";
import Link from "next/link";

const HomeIcon = () => {
  return (
    <Link
      href="/"
      className="w-[32px] h-[32px] flex justify-center items-center"
    >
      <AiFillHome className="text-[32px]" />
    </Link>
  );
};

export default HomeIcon;
