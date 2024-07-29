import { css } from "@emotion/react";

export function Progress({ progress }: { progress?: number }) {
  const progressStyle = css({
    position: "fixed",
    width: `${progress}%`,
    left: "0",
    height: "6px",
    transition: "0.3s",
    backgroundColor: "#058bf2",
  });

  return <div css={progressStyle}></div>;
}
