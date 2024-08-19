import { create } from "zustand";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";

interface AuthState {
  nickname: string;
  curProfile: string;
  fetchUserData: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  nickname: "",
  curProfile: "",
  fetchUserData: () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          set({
            nickname: userDoc.data().nickname || "",
            curProfile: userDoc.data().profileImg || "",
          });
        }
      }
    });
    return () => unsubscribe();
  },
}));

export default useAuthStore;
