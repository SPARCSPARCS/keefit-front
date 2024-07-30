import { useState } from "react";
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

export function InterviewPage() {
  const navigate = useNavigate();

  const { decibel, audioBlob, audioUrl, isStart, stopRecord, startRecord } =
    useAudio();
  const { uploadFile } = useFile();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [activePage, setActivePage] = useState("InputUrl");
  const [nowPageIndex, setNowPageIndex] = useState(0);
  const [nowQuestionIndex, setNowQuestionIndex] = useState(-1);

  const pages = ["InputUrl", "ShowRecruitment", "CreateQuestion", "Record"];

  const recruitment = useInterviewStore((state: any) => state.recruitment);
  const questions = useInterviewStore((state: any) => state.questions);

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

          <audio
            style={{
              display: "none",
            }}
            src={audioUrl}
            controls
          ></audio>

          {/* {audioUrl != "" && <Button onClick={upload}>업로드</Button>} */}

          <DecibelCircle decibel={decibel} />

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
