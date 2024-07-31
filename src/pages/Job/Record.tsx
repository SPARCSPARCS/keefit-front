import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button";
import { css } from "@emotion/react";
import { useAudio } from "../../hooks/useAudio";
import { useFile } from "../../hooks/useFile";
import { Modal } from "../../components/Modal";
import { useInterviewStore } from "../../features/store";
import { Funnel } from "../../components/Funnel";
import { useNavigate } from "react-router-dom";
import { Progress } from "../../components/Progress";
import { DecibelCircle } from "../../components/DecibelCircle";
import * as vision from "@mediapipe/tasks-vision";
import { Title } from "../../components/Title";
import { TopTitleBody } from "../../components/TopTitleBody";
import { TopNav } from "../../components/Nav";
import { GetNews } from "../Job/GetNews";

export function JobRecord({ onNext }: any) {
  const navigate = useNavigate();

  const { decibel, audioBlob, audioUrl, isStart, stopRecord, startRecord } =
    useAudio();
  const { uploadFile } = useFile();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [activePage, setActivePage] = useState("InputUrl");
  const [nowPageIndex, setNowPageIndex] = useState(0);
  const [nowQuestionIndex, setNowQuestionIndex] = useState(-1);
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [faceResult, setFaceResult] = useState<any>();
  const [faceLandmarker, setFaceLandmarker] = useState<any>();
  const [faceDeg, setFaceDeg] = useState(0);

  const recruitment = useInterviewStore((state: any) => state.recruitment);
  const questions2 = useInterviewStore((state: any) => state.questions2);

  const lastVideoTime = useRef(0);
  const videoRef = useRef(null);

  const totalQuestionCount = 2;

  const setRecruitment = useInterviewStore(
    (state: any) => state.setRecruitment
  );

  const record = async () => {
    if (nowQuestionIndex == -1) {
      enableCam();
    }

    if (!isStart) {
      setNowQuestionIndex((index) => index + 1);
      if (nowQuestionIndex >= questions2.length - 1) {
        navigate("/job/result");

        return false;
      }

      await startRecord();
    } else {
      if (nowQuestionIndex >= questions2.length - 1) {
        navigate("/job/result");

        return false;
      }
      await stopRecord(nowQuestionIndex);
    }
  };

  const createFaceLandmarker = async () => {
    const filesetResolver = await vision.FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
    );
    const faceLandmarkerTemp = await vision.FaceLandmarker.createFromOptions(
      filesetResolver,
      {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
          delegate: "GPU",
        },
        outputFaceBlendshapes: true,
        runningMode: "VIDEO",
        numFaces: 1,
        minTrackingConfidence: 0.2,
      }
    );

    setFaceLandmarker(faceLandmarkerTemp);

    console.log(faceLandmarkerTemp);
  };

  function enableCam() {
    if (webcamRunning === true) {
      setWebcamRunning(false);
    } else {
      setWebcamRunning(true);
    }
    const constraints = {
      video: true,
    };

    const videoElement: any = document.getElementById("inputVideo");
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      videoElement.srcObject = stream;
      videoElement.play();

      videoElement.addEventListener("loadeddata", predictWebcam);
    });
  }

  async function predictWebcam() {
    window.requestAnimationFrame(predictWebcam);

    try {
      let startTimeMs = performance.now();
      let lm;

      const videoElement: any = document.getElementById("inputVideo");

      if (lastVideoTime.current !== videoElement.currentTime) {
        lastVideoTime.current = videoElement.currentTime;
        lm = faceLandmarker.detectForVideo(videoElement, startTimeMs);
      }

      if (lm.faceLandmarks) {
        for (const landmarks of lm.faceLandmarks) {
          var rad = Math.atan2(
            landmarks[454].x - landmarks[234].x,
            landmarks[454].z - landmarks[234].z
          );
          let l = (rad * 180) / Math.PI;
          setFaceDeg(l - 90);
        }
      }
    } catch (error) {}
  }

  useEffect(() => {
    createFaceLandmarker();
  }, []);

  return (
    <>
      {isStart && (
        <TopTitleBody>
          <Title color="#fff" animationDelay="0">
            {questions2.length > 0 && <>{questions2[nowQuestionIndex]}</>}
          </Title>
        </TopTitleBody>
      )}

      {nowQuestionIndex == -1 && (
        <TopTitleBody>
          <Title color="#fff" animationDelay="0">
            예상 면접을 불러왔어요
          </Title>
          <Title color="#fff" animationDelay="0.25">
            인터뷰 시작을 눌러 시작해 보세요
          </Title>
        </TopTitleBody>
      )}

      <audio
        style={{
          display: "none",
        }}
        src={audioUrl}
        controls
      ></audio>

      <div
        css={css({
          display: "flex",
          position: "relative",
          flexDirection: "column",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
          height: "260px",
          marginBottom: "2rem",
        })}
      >
        <video
          id="inputVideo"
          style={{
            position: "absolute",
            width: "380px",
            height: "260px",
            borderRadius: "2rem",
          }}
          ref={videoRef}
        ></video>

        <p
          css={css({
            color: "#fff",
            position: "absolute",
            bottom: "1rem",
            width: "320px",
            textAlign: "center",
          })}
        >
          {Math.abs(faceDeg) > 10 ? "정면울 보세요" : ""}
        </p>
      </div>
      <DecibelCircle decibel={decibel} />

      <div
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
        }}
      >
        <Button onClick={record}>{isStart ? "제출하기" : "인터뷰 시작"}</Button>
      </div>
    </>
  );
}
