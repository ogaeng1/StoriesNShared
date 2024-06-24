"use client";

import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Input from "@/components/UI/Input";
import useSearch from "@/store/search";
import { useQuery } from "@tanstack/react-query";
import { getUserSearch } from "@/utils/userQueries";
import Image from "next/image";
import Link from "next/link";

interface User {
  id: string;
  nickname: string;
  bio: string;
  profileImg: string;
}

const SearchBar = () => {
  const { keyword, setKeyword, reset } = useSearch();
  const [searchResult, setSearchResult] = useState<User[]>([]);

  const { data: users = [] } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUserSearch,
    staleTime: 0,
    gcTime: 0,
  });

  useEffect(() => {
    if (users && keyword.length > 0) {
      const filtered = users.filter((user) => user.nickname?.includes(keyword));
      setSearchResult(filtered);
    } else {
      setSearchResult([]);
    }
  }, [keyword, users]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <div className="flex justify-center items-center mt-4">
      <div className="relative w-full">
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full h-[60px] pl-12 pr-4 box-border placeholder-gray-400 rounded-full"
        />
        <ul className="absolute top-full mt-2 w-full bg-white rounded shadow-lg">
          {searchResult.map((user) => (
            <Link href={`/users/${user.id}`} key={user.id}>
              <li className="p-[10px_15px] border-b border-gray-200 flex items-center gap-3 hover:bg-slate-200">
                <div className="w-[45px] h-[45px] rounded-[50%] border">
                  <Image
                    src={user.profileImg}
                    alt="프로필 이미지"
                    width={45}
                    height={45}
                    className="rounded-[50%]"
                  />
                </div>
                <div>
                  <div className="font-bold">{user.nickname}</div>
                  <div className="w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {user.bio}
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
