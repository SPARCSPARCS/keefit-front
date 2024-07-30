import { create } from "zustand";

export const useInterviewStore = create((set) => ({
  recruitment: "",
  questions: [],

  setRecruitment: (content: string) =>
    set((state) => ({ recruitment: content })),

  setQuestions: (questionsArray: string[]) =>
    set((state) => ({ questions: questionsArray })),
}));
