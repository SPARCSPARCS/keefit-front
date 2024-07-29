import { useState } from "react";
import { Button } from "../../components/Button";
import { css } from "@emotion/react";

export function ResultPage() {
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
      </div>
    </>
  );
}
