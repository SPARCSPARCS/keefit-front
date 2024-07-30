import { useRef, useState } from "react";
import { instanceAi } from "../api/axois";
import axios from "axios";
import { useInterviewStore } from "../features/store";

export function useAnalysisStt() {
  const setAnswers = useInterviewStore((state: any) => state.setAnswers);

  const analysisStt = async (fileUrl: string) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/stt", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          url: fileUrl,
        },
      });

      setAnswers(response.data.response);
    } catch (error) {}
  };

  return {
    analysisStt,
  };
}
