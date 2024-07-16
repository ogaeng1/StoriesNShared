"use client";

import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Input from "@/components/UI/Input";
import useSearch from "@/store/search";
import { useQuery } from "@tanstack/react-query";
import { getUserSearch } from "@/utils/userQueries";
import { User } from "../../search-user/_component/types";
import SearchResult from "./SearchResult";

const Search = () => {
  const { keyword, setKeyword, reset } = useSearch();
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const { data } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUserSearch,
    staleTime: 0,
    gcTime: 0,
  });

  useEffect(() => {
    if (keyword.length > 0) {
      setLoading(true);
      const timer = setTimeout(() => {
        if (data) {
          const filtered = data.filter((user) =>
            user.nickname?.includes(keyword)
          );
          setSearchResult(filtered);
        } else {
          setSearchResult([]);
        }
        setLoading(false);
      }, 700);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setSearchResult([]);
      setLoading(false);
    }
  }, [keyword, data]);

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
          placeholder="대화 상대를 검색하세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className={`w-full h-[60px] pl-12 pr-4 box-border placeholder-gray-400 ${
            keyword ? "rounded-b-none" : ""
          }`}
        />
        <SearchResult
          searchResult={searchResult}
          loading={loading}
          keyword={keyword}
        />
      </div>
    </div>
  );
};

export default Search;
