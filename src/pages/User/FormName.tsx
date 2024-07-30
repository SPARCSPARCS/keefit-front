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

export function FormNamePage() {
  const navigate = useNavigate();

  const [showLoad, setShowLoad] = useState(false);

  const setUserName = useUserStore((state: any) => state.setUserName);
  const userName = useUserStore((state: any) => state.userName);

  const handleClickSendName = () => {
    navigate("/user/major");
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
      <TopNav onPrev={() => navigate("/")} />
      <TopTitleBody>
        <Title animationDelay="0">이름을 입력해주세요</Title>
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
          onClick={handleClickSendName}
        >
          다음
        </Button>
      </div>

      <Input
        placeholder="김네이버"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      ></Input>
    </div>
  );
}
