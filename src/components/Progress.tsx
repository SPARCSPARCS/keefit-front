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

export function ResultProgress({ progress }: { progress?: number }) {
  const progressStyle = css({
    width: `${progress}%`,
    height: "24px",
    transition: "0.3s",
    backgroundColor: "#66AD6A",
    borderRadius: "8px",
  });

  return (
    <div
      css={css({
        width: "100%",
        backgroundColor: "#edf2ef",
        borderRadius: "8px",
      })}
    >
      <div css={progressStyle}></div>
    </div>
  );
}
