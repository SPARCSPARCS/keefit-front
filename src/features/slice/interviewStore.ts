import { create } from "zustand";

export const useInterviewStore = create((set) => ({
  recruitment: "",
  questions: [],
  answers: [],

  setRecruitment: (content: string) =>
    set((state) => ({ recruitment: content })),

  setQuestions: (questionsArray: string[]) =>
    set((state) => ({ questions: questionsArray })),

  setAnswers: (answer: string) =>
    set((state) => ({ answers: [...state.answers, answer] })),
}));
