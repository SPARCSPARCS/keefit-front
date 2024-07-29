import { useState } from "react";
import { Button } from "../../components/Button";
import { css } from "@emotion/react";
import { useAudio } from "../../hooks/useAudio";
import { useFile } from "../../hooks/useFile";
import { Modal } from "../../components/Modal";

export function InterviewPage() {
  const { audioBlob, audioUrl, isStart, stopRecord, startRecord } = useAudio();
  const { uploadFile } = useFile();
  const [isOpenModal, setIsOpenModal] = useState(false);

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

  return (
    <>
      <div
        css={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        })}
      >
        <Button onClick={record}>{isStart ? "중단" : "인터뷰 시작"}</Button>

        <audio src={audioUrl} controls></audio>

        {audioUrl != "" && <Button onClick={upload}>업로드</Button>}

        <Button onClick={() => setIsOpenModal(true)}>modal</Button>
      </div>

      <Modal onClose={() => setIsOpenModal(false)} isOpen={isOpenModal}>
        <p>sdfsd</p>
      </Modal>
    </>
  );
}
