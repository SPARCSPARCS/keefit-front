import { create } from "zustand";

export const useInterviewStore = create((set) => ({
  recruitment: "",
  questions: [],
  answers: [...Array.from({ length: 5 }, () => "")],

  setRecruitment: (content: string) =>
    set((state) => ({ recruitment: content })),

  setQuestions: (questionsArray: string[]) =>
    set((state) => ({ questions: questionsArray })),

  setAnswers: (index: number, answer: string) =>
    set((state) => {
      state.answers[index] = answer;
      return [...state.answers];
    }),
}));
