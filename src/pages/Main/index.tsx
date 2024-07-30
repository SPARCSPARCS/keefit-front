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
      ></div>

      <div
        css={css({
          position: "fixed",
          bottom: "0.5rem",
          display: "flex",
          width: "100%",
        })}
      >
        <div
          css={css({
            display: "flex",
            width: "100%",

            padding: "1rem",
          })}
        >
          <Button
            style={{ width: "100%" }}
            onClick={() => navigate("/interview")}
          >
            시작하기
          </Button>
        </div>
      </div>
    </>
  );
}
