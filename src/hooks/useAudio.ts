import { useRef, useState } from "react";
import { useFile } from "./useFile";

export function useAudio() {
  const { uploadFile } = useFile();

  const [isStart, setIsStart] = useState(false);
  const [stream, setStream] = useState(null);
  const [chunks, setchunks] = useState([]);
  const [audioUrl, setAudioUrl] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob>();
  const [decibel, setDecibel] = useState(0);

  //   const [analyser, setAnalyser] = useState<AnalyserNode>();
  //   const [dataArray, setDataArray] = useState<Uint8Array>();
  const [source, setSource] = useState<MediaStreamAudioSourceNode>();

  const mediaRecorder = useRef(null);
  const analyser = useRef(null);
  const dataArray = useRef<Uint8Array>(null);
  const requestAnimation = useRef(null);
  //   const decibel = useRef(0);

  const startRecord = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    setStream(stream);

    const audioContext = new window.AudioContext();
    const getSource = audioContext.createMediaStreamSource(stream);
    analyser.current = audioContext.createAnalyser();

    analyser.current.fftSize = 128;
    const bufferLength = analyser.current.fftSize;
    dataArray.current = new Uint8Array(bufferLength);

    getSource.connect(analyser.current);

    setSource(getSource);

    mediaRecorder.current.ondataavailable = (e) => {
      chunks.push(e.data);
      setchunks([...chunks]);
    };

    mediaRecorder.current.start();
    setIsStart(true);
    draw();
  };

  const draw = () => {
    requestAnimation.current = requestAnimationFrame(draw.bind(this));
    analyser.current.getByteTimeDomainData(dataArray.current);

    setDecibel(
      dataArray.current.reduce((a, b) => a + b, 0) / dataArray.current.length
    );
  };

  const stopRecord = async (recordNumber: number) => {
    mediaRecorder.current.stop();
    source.disconnect();
    cancelAnimationFrame(requestAnimation.current);

    mediaRecorder.current.onstop = () => {
      const getAudioBlob = new Blob(chunks, { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(getAudioBlob);
      console.log("AAA", getAudioBlob);

      uploadFile(getAudioBlob, recordNumber);

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
    decibel,
    startRecord,
    stopRecord,
  };
}
