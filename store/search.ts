import { create } from "zustand";

interface SearchState {
  keyword: string;
  setKeyword: (keyword: string) => void;
  reset: () => void;
}

const useSearch = create<SearchState>((set) => ({
  keyword: "",
  setKeyword: (keyword) => set({ keyword }),
  reset: () => set({ keyword: "" }),
}));

export default useSearch;
