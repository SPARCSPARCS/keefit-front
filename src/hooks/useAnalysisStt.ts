import { useRef, useState } from "react";
import {
  DEV_SERVER_PYTHON_API,
  PROD_SERVER_PYTHON_API,
  instanceAi,
} from "../api/axois";
import axios from "axios";
import { useInterviewStore } from "../features/store";
import { isLocal } from "../utils/isLocal";

export function useAnalysisStt() {
  const setAnswers = useInterviewStore((state: any) => state.setAnswers);

  const analysisStt = async (fileUrl: string, recordNumber: number) => {
    const url = isLocal()
      ? `${DEV_SERVER_PYTHON_API}/stt`
      : `${PROD_SERVER_PYTHON_API}/stt`;

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          url: fileUrl,
        },
      });

      setAnswers(recordNumber, response.data.response);
    } catch (error) {}
  };

  return {
    analysisStt,
  };
}
