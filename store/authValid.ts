import { create } from "zustand";
interface IIsLogin {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;

  userExist: boolean;
  setUserExist: (userExist: boolean) => void;

  curUser: boolean;
  setCurUSer: (curUser: boolean) => void;
}

const useAuthValid = create<IIsLogin>((set) => ({
  isLogin: false,
  setIsLogin: (isLogin: boolean) => set({ isLogin }),

  userExist: false,
  setUserExist: (userExist: boolean) => set({ userExist }),

  curUser: false,
  setCurUSer: (curUser: boolean) => set({ curUser }),
}));

export default useAuthValid;
