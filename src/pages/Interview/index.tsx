import { useState } from "react";
import { Button } from "../../components/Button";
import { css } from "@emotion/react";
import { useAudio } from "../../hooks/useAudio";

export function InterviewPage() {
  const { audioUrl, isStart, stopRecord, startRecord } = useAudio();

  const record = async () => {
    if (!isStart) {
      await startRecord();
    } else {
      await stopRecord();
    }
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
      </div>
    </>
  );
}
