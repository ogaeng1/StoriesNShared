import Link from "next/link";
import { IoIosSearch } from "react-icons/io";

const SearchIcon = () => {
  return (
    <Link
      href="/search-user"
      className="w-[60px] h-[60px] rounded-md flex justify-center items-center hover:shadow-[inset_0_0_10px_rgba(128,128,128,0.5)]"
      aria-label="search"
    >
      <IoIosSearch className="w-[32px] h-[32px]" />
    </Link>
  );
};

export default SearchIcon;
