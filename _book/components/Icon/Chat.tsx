import { BsChatDots } from "react-icons/bs";
import Link from "next/link";

const ChatIcon = () => {
  return (
    <Link
      href="/chat"
      className="w-[60px] h-[60px] rounded-md flex justify-center items-center hover:shadow-[inset_0_0_10px_rgba(128,128,128,0.5)]"
    >
      <BsChatDots className="text-[32px]" />
    </Link>
  );
};

export default ChatIcon;