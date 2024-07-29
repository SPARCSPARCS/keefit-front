import { useRef, useState } from "react";

export function useAudio() {
  const [isStart, setIsStart] = useState(false);
  const [stream, setStream] = useState(null);
  const [chunks, setchunks] = useState([]);
  const [audioUrl, setAudioUrl] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob>();

  const mediaRecorder = useRef(null);

  const startRecord = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    setStream(stream);

    mediaRecorder.current.ondataavailable = (e) => {
      chunks.push(e.data);
      setchunks([...chunks]);
    };

    mediaRecorder.current.start();
    setIsStart(true);
  };

  const stopRecord = async () => {
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const getAudioBlob = new Blob(chunks, { type: "audio/webm" });
      const audioUrl = URL.createObjectURL(getAudioBlob);
      console.log("AAA", getAudioBlob);
      setAudioBlob(getAudioBlob);
      setAudioUrl(audioUrl);
      setchunks([]);
      setIsStart(false);
    };
  };

  return {
    isStart,
    audioUrl,
    audioBlob,
    startRecord,
    stopRecord,
  };
}
