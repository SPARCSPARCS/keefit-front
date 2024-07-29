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

export function InterviewPage() {
  const navigate = useNavigate();

  const { decibel, audioBlob, audioUrl, isStart, stopRecord, startRecord } =
    useAudio();
  const { uploadFile } = useFile();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [activePage, setActivePage] = useState("InputUrl");
  const [nowPageIndex, setNowPageIndex] = useState(0);

  const pages = ["InputUrl", "ShowRecruitment", "Record"];

  const recruitment = useInterviewStore((state: any) => state.recruitment);
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
      await startRecord();
    } else {
      await stopRecord();
    }
  };

  const upload = async () => {
    // let response = await fetch(audioUrl);
    // let data = await response.blob();
    // console.log(data);
    uploadFile(audioBlob);
  };

  const onSaveRecruitment = () => {
    setRecruitment("sdfsdf" + Math.random());
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
          <InputUrl></InputUrl>
        </Funnel>

        <Funnel isOpen={activePage == "ShowRecruitment"}>
          <ShowRecruitment></ShowRecruitment>
        </Funnel>

        <Funnel isOpen={activePage == "Record"}>
          <Button onClick={record}>{isStart ? "중단" : "인터뷰 시작"}</Button>

          <audio
            style={{
              display: "none",
            }}
            src={audioUrl}
            controls
          ></audio>

          {audioUrl != "" && <Button onClick={upload}>업로드</Button>}

          <div
            style={{
              width: decibel / 1,
              height: decibel / 1,
              backgroundColor: "#000",
              borderRadius: 500,
            }}
          ></div>
        </Funnel>
      </div>

      <div
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
        }}
      >
        <Button onClick={handleClickNextButton}>다음</Button>
      </div>

      <Modal onClose={() => setIsOpenModal(false)} isOpen={isOpenModal}>
        <p>sdfsd</p>
      </Modal>
    </>
  );
}
