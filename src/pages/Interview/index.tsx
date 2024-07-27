import { useState } from "react";
import { Button } from "../../components/Button";
import { css } from "@emotion/react";

export function InterviewPage() {
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
        <Button onClick={() => console.log("SF")}>테스트</Button>
      </div>
    </>
  );
}
