import Link from "next/link";
import { IoIosSearch } from "react-icons/io";

const SearchIcon = () => {
  return (
    <Link
      href="/search-user"
      className="w-[64px] h-[64px] rounded-md flex justify-center items-center hover:shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]"
    >
      <IoIosSearch className="w-[32px] h-[32px]" />
    </Link>
  );
};

export default SearchIcon;
