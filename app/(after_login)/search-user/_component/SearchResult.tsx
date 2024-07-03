"use client";

import { ResultProps } from "./types";
import { MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { PiSpinnerGapBold } from "react-icons/pi";

const SearchResult = ({ searchResult, loading, keyword }: ResultProps) => {
  return (
    <>
      {!loading && searchResult.length > 0 && (
        <ul className="absolute top-full w-full bg-white rounded shadow-lg">
          {searchResult.map((user) => (
            <Link href={`/users/${user.id}`} key={user.id}>
              <li className="p-[10px_15px] border-t border-gray-200 flex justify-between items-center hover:bg-slate-200">
                <div className="flex items-center gap-3">
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
                </div>
                <div>
                  <MdKeyboardArrowRight className="text-[26px]" />
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}
      {loading && (
        <div className="w-full absolute top-full">
          <div className="border p-[10px_15px] flex justify-center items-center text-2xl">
            <PiSpinnerGapBold className="animate-spinner" />
          </div>
        </div>
      )}
      {!loading && searchResult.length === 0 && keyword.length > 0 && (
        <div className="w-full absolute top-full">
          <div className="border p-[10px_15px] flex justify-center items-center text-2xl">
            검색 결과가 없습니다.
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResult;
