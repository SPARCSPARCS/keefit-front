import { useRef, useState } from "react";
import { instanceAi } from "../api/axois";
import axios from "axios";

export function useFile() {
  const uploadFile = (blob: Blob) => {
    const formdata = new FormData();
    formdata.append("file", blob, "upload.wav");

    console.log("FILE", blob);

    axios.post("http://127.0.0.1:8000/upload", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return {
    uploadFile,
  };
}
