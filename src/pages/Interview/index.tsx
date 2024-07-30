import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button";
import { css } from "@emotion/react";
import { useAudio } from "../../hooks/useAudio";
import { useFile } from "../../hooks/useFile";
import { Modal } from "../../components/Modal";
import { useInterviewStore } from "../../features/store";
import { InputUrl } from "./InputUrl";
import { ShowRecruitment } from "./ShowRecruitment";
import { Funnel } from "../../components/Funnel";
import { useNavigate } from "react-router-dom";
import { Progress } from "../../components/Progress";
import { DecibelCircle } from "../../components/DecibelCircle";
import { CreateQuestion } from "./CreateQuestion";
import * as vision from "@mediapipe/tasks-vision";

export function InterviewPage() {
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

  const pages = ["InputUrl", "ShowRecruitment", "CreateQuestion", "Record"];

  const recruitment = useInterviewStore((state: any) => state.recruitment);
  const questions = useInterviewStore((state: any) => state.questions);

  const lastVideoTime = useRef(0);
  const videoRef = useRef(null);

  const setRecruitment = useInterviewStore(
    (state: any) => state.setRecruitment
  );

  const handleClickNextButton = () => {
    if (nowPageIndex >= pages.length - 1) {
      navigate("/result");
    }

    const index = pages.findIndex((item) => {
      return item == activePage;
    });

    setActivePage(pages[index + 1]);
    setNowPageIndex((index) => index + 1);
  };

  const record = async () => {
    if (nowQuestionIndex == -1) {
      enableCam();
    }
    if (!isStart) {
      setNowQuestionIndex((index) => index + 1);
      if (nowQuestionIndex >= 4) {
        navigate("/result");

        return false;
      }

      await startRecord();
    } else {
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
      <Progress progress={(nowPageIndex / pages.length) * 100}></Progress>
      <div
        css={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        })}
      >
        <Funnel isOpen={activePage == "InputUrl"}>
          <InputUrl onNext={handleClickNextButton}></InputUrl>
        </Funnel>

        <Funnel isOpen={activePage == "ShowRecruitment"}>
          <ShowRecruitment onNext={handleClickNextButton}></ShowRecruitment>
        </Funnel>

        <Funnel isOpen={activePage == "CreateQuestion"}>
          <CreateQuestion onNext={handleClickNextButton}></CreateQuestion>
        </Funnel>

        <Funnel isOpen={activePage == "Record"}>
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              padding: "1rem",
            }}
          >
            {isStart && (
              <h2>
                {questions.length > 0 && <>{questions[nowQuestionIndex]}</>}
              </h2>
            )}
          </div>

          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              padding: "1rem",
            }}
          >
            {nowQuestionIndex == -1 && (
              <h2
                css={css({
                  lineHeight: "2.25rem",
                })}
              >
                예상면접을 성공적으로 불러왔어요 <br />
                면접 시작, 할 수 있어요!
              </h2>
            )}
          </div>

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
              flexDirection: "column",
              gap: "1rem",
              justifyContent: "center",
              alignItems: "center",
            })}
          >
            <video
              id="inputVideo"
              style={{
                width: "380px",
                borderRadius: "2rem",
              }}
              ref={videoRef}
            ></video>

            <p>{Math.abs(faceDeg) > 10 ? "정면울 바라봐주세요" : ""}</p>

            <DecibelCircle decibel={decibel} />
          </div>

          {/* {audioUrl != "" && <Button onClick={upload}>업로드</Button>} */}

          <div
            style={{
              position: "fixed",
              bottom: "1rem",
              right: "1rem",
            }}
          >
            <Button onClick={record}>{isStart ? "중단" : "인터뷰 시작"}</Button>
          </div>
        </Funnel>
      </div>

      <Modal onClose={() => setIsOpenModal(false)} isOpen={isOpenModal}>
        <p>sdfsd</p>
      </Modal>
    </>
  );
}
