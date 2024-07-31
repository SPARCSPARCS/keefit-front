import { create } from "zustand";

export const useUserStore = create((set) => ({
  userId: String(Math.random()),
  userName: "",
  userMajor: "",

  setUserName: (userName: string) => set((state) => ({ userName: userName })),
  setUserMajor: (userMajor: string) =>
    set((state) => ({ userMajor: userMajor })),
}));
