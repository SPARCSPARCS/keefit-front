import { create } from "zustand";

export const useInterviewStore = create((set) => ({
  recruitment: "",
  setRecruitment: (content: string) =>
    set((state) => ({ recruitment: content })),
}));
