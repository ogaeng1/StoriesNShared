import { BsChatDots } from "react-icons/bs";
import Link from "next/link";

const ChatIcon = () => {
  return (
    <Link
      href="/chat"
      className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] rounded-md flex justify-center items-center hover:shadow-[inset_0_0_10px_rgba(128,128,128,0.5)]"
      aria-label="chatting"
    >
      <BsChatDots className="text-[20px] sm:text-[25px] md:text-[32px]" />
    </Link>
  );
};

export default ChatIcon;
