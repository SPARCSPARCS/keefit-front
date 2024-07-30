import { useState } from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import axios from "axios";
import { useInterviewStore, useUserStore } from "../../features/store";
import { css, keyframes } from "@emotion/react";
import { Title } from "../../components/Title";
import { TopTitleBody } from "../../components/TopTitleBody";
import { useNavigate } from "react-router-dom";

export function FormMajorPage() {
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [showLoad, setShowLoad] = useState(false);

  const setUserMajor = useUserStore((state: any) => state.setUserMajor);

  const handleClickSend = () => {
    setUserMajor(value);
    navigate("/interview");
  };

  return (
    <div
      css={css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      })}
    >
      <TopTitleBody>
        <Title animationDelay="0">전공을 입력해주세요</Title>
      </TopTitleBody>

      <div
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
        }}
      >
        <Button
          disabled={showLoad}
          isLoading={showLoad}
          onClick={handleClickSend}
        >
          다음
        </Button>
      </div>

      <Input
        placeholder="산업디자인학과"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></Input>
    </div>
  );
}