import { create } from "zustand";

interface ISignUpState {
  profileImg: string | null;
  email: string;
  password: string;
  nickname: string;
  bio: string;
  setProfileImg: (img: string | null) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setNickname: (nickname: string) => void;
  setBio: (bio: string) => void;
}

const useSignUpStore = create<ISignUpState>((set) => ({
  profileImg: null,
  email: "",
  password: "",
  nickname: "",
  bio: "",
  setProfileImg: (img) => set({ profileImg: img }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setNickname: (nickname) => set({ nickname }),
  setBio: (bio) => set({ bio }),
}));

export default useSignUpStore;
