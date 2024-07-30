import { css } from "@emotion/react";
import { Button } from "../../components/Button";
import { useInterviewStore } from "../../features/store";
import { TopTitleBody } from "../../components/TopTitleBody";
import { Title } from "../../components/Title";

export function ShowRecruitment({ onNext }: { onNext?: any }) {
  const recruitment = useInterviewStore((state: any) => state.recruitment);
  const setRecruitment = useInterviewStore(
    (state: any) => state.setRecruitment
  );

  return (
    <div>
      <TopTitleBody>
        <Title animationDelay="0">준비되셨나요?</Title>
        <Title animationDelay="0.15">면접 시작, 할 수 있어요!</Title>
      </TopTitleBody>
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
