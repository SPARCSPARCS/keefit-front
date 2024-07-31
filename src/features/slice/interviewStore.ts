import { create } from "zustand";

export const useInterviewStore = create((set) => ({
  recruitment: "",
  companyName: "",

  questions: [],
  answers: [...Array.from({ length: 5 }, () => "")],

  setRecruitment: (content: string) =>
    set((state) => ({ recruitment: content })),

  setCompanyName: (companyName: string) =>
    set((state) => ({ companyName: companyName })),

  setQuestions: (questionsArray: string[]) =>
    set((state) => ({ questions: questionsArray })),

  setAnswers: (index: number, answer: string) =>
    set((state) => {
      state.answers[index] = answer;
      return [...state.answers];
    }),
}));
