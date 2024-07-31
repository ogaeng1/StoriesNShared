import { create } from "zustand";

interface ILoginState {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

const useLoginStore = create<ILoginState>((set) => ({
  email: "",
  password: "",

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
}));

export default useLoginStore;
