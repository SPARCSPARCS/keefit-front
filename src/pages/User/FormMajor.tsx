import { useState } from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import axios from "axios";
import { useInterviewStore, useUserStore } from "../../features/store";
import { css, keyframes } from "@emotion/react";
import { Title } from "../../components/Title";
import { TopTitleBody } from "../../components/TopTitleBody";
import { useNavigate } from "react-router-dom";
import { TopNav } from "../../components/Nav";

export function FormMajorPage() {
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [showLoad, setShowLoad] = useState(false);

  const setUserMajor = useUserStore((state: any) => state.setUserMajor);
  const userMajor = useUserStore((state: any) => state.userMajor);

  const handleClickSend = () => {
    navigate("/interview");
  };

  const handleKeyDown = (e) => {
    console.log(e.code == "Enter");
    if (e.code == "Enter") {
      navigate("/interview");
    }
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
      <TopNav onPrev={() => navigate("/user/name")} />
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
        placeholder="프론트엔드"
        value={userMajor}
        onKeyDown={handleKeyDown}
        onChange={(e) => setUserMajor(e.target.value)}
      ></Input>
    </div>
  );
}
