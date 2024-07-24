"use client";

import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Input from "@/components/UI/Input";
import useSearch from "@/store/search";
import { useQuery } from "@tanstack/react-query";
import { getUserSearch } from "@/utils/userQueries";
import { User } from "./types";
import SearchResult from "./SearchResult";
import Navbar from "@/components/Navbar";
import Container from "../../_component/Container";
import ModalType from "../../_component/ModalType";
import useModal from "@/store/modal";

const Search = () => {
  const { isOpen } = useModal();
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
  }, [keyword]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <>
      <div className="flex justify-center min-w-[437px] min-h-[100vh] h-full">
        <div className="flex-col flex items-center justify-center">
          <Navbar />
          <Container>
            <div className="flex justify-center items-center mt-4">
              <div className="relative w-full">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
                <Input
                  type="text"
                  placeholder="검색"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className={`w-full h-[60px] pl-12 pr-4 box-border bg-secondary text-white ${
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
          </Container>
        </div>
      </div>
      <div id="modal" />
      {isOpen && <ModalType />}
    </>
  );
};

export default Search;
