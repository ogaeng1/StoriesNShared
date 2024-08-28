import { create } from "zustand";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

interface User {
  id: string;
  nickname: string;
  email: string;
  profileImg: string;
  follower: string[];
  following: string[];
  bio: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface UserStore {
  curUser: User | null;
  setUser: (user: User | null) => void;
  fetchUser: (userId: string) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  curUser: null,
  setUser: (user: User | null) => set({ curUser: user }),

  fetchUser: async (userId: string) => {
    const q = query(collection(db, "users"), where("id", "==", userId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        set({
          curUser: {
            id: data.id,
            nickname: data.nickname,
            email: data.email,
            profileImg: data.profileImg,
            bio: data.bio,
            following: data.following,
            follower: data.follower,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          },
        });
      });
    } else {
      set({ curUser: null });
    }
  },
}));
