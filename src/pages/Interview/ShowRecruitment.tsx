import { css } from "@emotion/react";
import { Button } from "../../components/Button";
import { useInterviewStore } from "../../features/store";

export function ShowRecruitment({ onNext }: { onNext?: any }) {
  const recruitment = useInterviewStore((state: any) => state.recruitment);
  const setRecruitment = useInterviewStore(
    (state: any) => state.setRecruitment
  );

  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0.5rem",
          padding: "1rem",
        }}
      >
        <h2>
          준비되셨나요? <br />
          면접 시작, 할 수 있어요!
        </h2>
      </div>
      <p
        css={css({
          color: "#ededf0",
          lineHeight: "2rem",
        })}
      >
        {recruitment}
      </p>

      <div
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
        }}
      >
        <Button onClick={onNext}>확인</Button>
      </div>
    </div>
  );
}
