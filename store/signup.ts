import { create } from "zustand";

interface ISignUpState {
  profileImg: string | null;
  email: string;
  password: string;
  nickname: string;
  bio: string;
  follower: string[];
  following: string[];
  setProfileImg: (img: string | null) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setNickname: (nickname: string) => void;
  setBio: (bio: string) => void;
  setFollower: (follower: string[]) => void;
  setFollowing: (following: string[]) => void;
}

const useSignUpStore = create<ISignUpState>((set) => ({
  profileImg: null,
  email: "",
  password: "",
  nickname: "",
  bio: "",
  follower: [],
  following: [],
  setProfileImg: (img) => set({ profileImg: img }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setNickname: (nickname) => set({ nickname }),
  setBio: (bio) => set({ bio }),
  setFollower: (follower) => set({ follower }),
  setFollowing: (following) => set({ following }),
}));

export default useSignUpStore;
