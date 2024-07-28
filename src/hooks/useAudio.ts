import { useRef, useState } from "react";

export function useAudio() {
  const [isStart, setIsStart] = useState(false);
  const [stream, setStream] = useState(null);
  const [chunks, setchunks] = useState([]);
  const [audioUrl, setAudioUrl] = useState("");

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
      const audioBlob = new Blob(chunks, { type: "audio/mp3" });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
      setchunks([]);
      setIsStart(false);
    };
  };

  return {
    isStart,
    audioUrl,
    startRecord,
    stopRecord,
  };
}
