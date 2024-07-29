import { css } from "@emotion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";

export function MainPage() {
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
        <Button onClick={() => navigate("/interview")}>인터뷰</Button>
      </div>
    </>
  );
}
