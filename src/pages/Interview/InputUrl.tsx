import { useState } from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import axios from "axios";
import { useInterviewStore } from "../../features/store";
import { css, keyframes } from "@emotion/react";
import { Title } from "../../components/Title";
import { TopTitleBody } from "../../components/TopTitleBody";

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
      <TopTitleBody>
        <Title animationDelay="0">연습하고 싶은 채용공고의</Title>
        <Title animationDelay="0.15">링크를 입력해주세요</Title>
      </TopTitleBody>

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
