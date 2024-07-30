import { useState } from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import axios from "axios";
import { useInterviewStore } from "../../features/store";
import { css } from "@emotion/react";

export function InputUrl({ onNext }: { onNext?: any }) {
  const [value, setValue] = useState("");

  const recruitment = useInterviewStore((state: any) => state.recruitment);
  const setRecruitment = useInterviewStore(
    (state: any) => state.setRecruitment
  );

  const handleClickNext = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/test/url", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          url: value,
        },
      });

      setRecruitment(response.data.content);
      onNext();
    } catch (error) {}
  };

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
        <h2
          css={css({
            lineHeight: "2.25rem",
          })}
        >
          연습하고 싶은 채용공고의 <br />
          링크를 입력해주세요
        </h2>
      </div>

      <div
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
        }}
      >
        <Button onClick={handleClickNext}>다음</Button>
      </div>

      <Input
        placeholder="https://naver.com/..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></Input>
    </div>
  );
}
