import { BsChatDots } from "react-icons/bs";
import Link from "next/link";

const ChatIcon = () => {
  return (
    <Link
      href="/chat"
      className="w-[64px] h-[64px] rounded-md flex justify-center items-center hover:shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]"
    >
      <BsChatDots className="text-[32px]" />
    </Link>
  );
};

export default ChatIcon;
