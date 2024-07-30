import { css } from "@emotion/react";
import { ChevronLeft } from "lucide-react";

export function TopNav({ onPrev }: { onPrev?: any }) {
  const navStyle = css({
    position: "fixed",
    top: "0",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 900,
  });

  return (
    <div css={navStyle}>
      <BackwardButton onClick={onPrev} />
    </div>
  );
}

function BackwardButton({ onClick }: any) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "1rem",
        cursor: "pointer",
        width: "1rem",
      }}
    >
      <ChevronLeft />
    </div>
  );
}
