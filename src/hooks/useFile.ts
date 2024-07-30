import { useRef, useState } from "react";
import { instanceAi } from "../api/axois";
import axios from "axios";
import { useAnalysisStt } from "./useAnalysisStt";

export function useFile() {
  const { analysisStt } = useAnalysisStt();
  const uploadFile = async (blob: Blob) => {
    try {
      const formdata = new FormData();
      formdata.append("file", blob, "upload.wav");

      console.log("FILE", blob);

      const response = await axios.post(
        "http://127.0.0.1:8000/upload",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTimeout(() => {
        analysisStt(response.data.filename);
      }, 500);
    } catch (error) {}
  };

  return {
    uploadFile,
  };
}
