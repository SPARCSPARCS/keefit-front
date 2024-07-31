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
import { Title } from "../../components/Title";
import { TopTitleBody } from "../../components/TopTitleBody";
import { TopNav } from "../../components/Nav";
import { GetNews } from "../Job/GetNews";
import { CreateJob } from "./CreateJob";

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

  const pages = [
    "InputUrl",
    "CreateJob",
    "ShowRecruitment",
    "CreateQuestion",
    "Record",
  ];

  const recruitment = useInterviewStore((state: any) => state.recruitment);
  const questions = useInterviewStore((state: any) => state.questions);

  const lastVideoTime = useRef(0);
  const videoRef = useRef(null);

  const setRecruitment = useInterviewStore(
    (state: any) => state.setRecruitment
  );

  const handleClickNextButton = () => {
    if (nowPageIndex >= pages.length - 1) {
      navigate("/interview/result");
    }

    const index = pages.findIndex((item) => {
      return item == activePage;
    });

    setActivePage(pages[index + 1]);
    setNowPageIndex((index) => index + 1);
  };

  const handleClickPrevButton = () => {
    if (nowPageIndex == 0) {
      navigate("/user/major");
    }

    const index = pages.findIndex((item) => {
      return item == activePage;
    });

    setActivePage(pages[index - 1]);
    setNowPageIndex((index) => index - 1);
  };

  const record = async () => {
    if (nowQuestionIndex == -1) {
      enableCam();
    }

    if (!isStart) {
      setNowQuestionIndex((index) => index + 1);
      if (nowQuestionIndex >= 1) {
        navigate("/interview/result");

        return false;
      }

      // var lang = "ko-KR";
      // var Speecha = new SpeechSynthesisUtterance(questions[nowQuestionIndex]);

      // Speecha.lang = lang;
      // Speecha.pitch = 1;
      // Speecha.rate = 1;

      // window.speechSynthesis.speak(Speecha);

      await startRecord();
    } else {
      if (nowQuestionIndex >= 1) {
        navigate("/interview/result");

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
      {activePage != "Record" && <TopNav onPrev={handleClickPrevButton} />}

      <Progress progress={(nowPageIndex / pages.length) * 100}></Progress>
      <div
        css={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          backgroundColor: activePage == "Record" ? "#000" : "#fff",
          transition: "0.7s",
        })}
      >
        <Funnel isOpen={activePage == "GetNews"}>
          <GetNews onNext={handleClickNextButton}></GetNews>
        </Funnel>

        <Funnel isOpen={activePage == "CreateJob"}>
          <CreateJob onNext={handleClickNextButton}></CreateJob>
        </Funnel>

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
          {isStart && (
            <TopTitleBody>
              <Title color="#fff" animationDelay="0">
                {questions.length > 0 && <>{questions[nowQuestionIndex]}</>}
              </Title>
            </TopTitleBody>
          )}

          {nowQuestionIndex == -1 && (
            <TopTitleBody>
              <Title color="#fff" animationDelay="0">
                예상면접을 성공적으로 불러왔어요
              </Title>
              <Title color="#fff" animationDelay="0.25">
                면접 시작, 할 수 있어요!
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
                outline: `${decibel - 125}px solid #fff`,
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
          {/* <DecibelCircle decibel={decibel} /> */}

          {/* {audioUrl != "" && <Button onClick={upload}>업로드</Button>} */}

          <div
            style={{
              position: "fixed",
              bottom: "1rem",
              right: "1rem",
            }}
          >
            <Button onClick={record}>
              {isStart ? "제출하기" : "다음 질문"}
            </Button>
          </div>
        </Funnel>
      </div>

      <Modal onClose={() => setIsOpenModal(false)} isOpen={isOpenModal}>
        <p>sdfsd</p>
      </Modal>
    </>
  );
}
