import { useRef, useState } from "react";
import {
  DEV_SERVER_PYTHON_API,
  PROD_SERVER_PYTHON_API,
  instanceAi,
} from "../api/axois";
import axios from "axios";
import { useAnalysisStt } from "./useAnalysisStt";
import { isLocal } from "../utils/isLocal";

export function useFile() {
  const { analysisStt } = useAnalysisStt();
  const uploadFile = async (blob: Blob, recordNumber: number) => {
    try {
      const formdata = new FormData();
      formdata.append("file", blob, "upload.wav");

      const url = isLocal()
        ? `${DEV_SERVER_PYTHON_API}/upload`
        : `${PROD_SERVER_PYTHON_API}/upload`;

      const response = await axios.post(url, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setTimeout(() => {
        analysisStt(response.data.filename, recordNumber);
      }, 500);
    } catch (error) {}
  };

  return {
    uploadFile,
  };
}
