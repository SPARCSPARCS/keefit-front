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
          left: "0",
          padding: "1rem",
        }}
      >
        <h2>
          입력한 정보가 맞다면 <br />
          아래의 확인 버튼을 눌러주세요
        </h2>
      </div>
      {recruitment}
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
