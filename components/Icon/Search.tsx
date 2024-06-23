import Link from "next/link";
import { IoIosSearch } from "react-icons/io";

const SearchIcon = () => {
  return (
    <Link
      href="/search-user"
      className="w-[32px] h-[32px] flex justify-center items-center"
    >
      <IoIosSearch className="w-[32px] h-[32px]" />
    </Link>
  );
};

export default SearchIcon;
