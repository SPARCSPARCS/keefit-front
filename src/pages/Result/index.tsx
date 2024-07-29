import { useState } from "react";
import { Button } from "../../components/Button";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

export function ResultPage() {
  const navigate = useNavigate();

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
        <h2>결과</h2>
        <Button onClick={() => navigate("/")}>홈</Button>
      </div>
    </>
  );
}
