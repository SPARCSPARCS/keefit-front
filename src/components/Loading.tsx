import { css, keyframes } from "@emotion/react";
import { LoaderCircle } from "lucide-react";

const rotate = keyframes`
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
`;

export function Loading() {
  return (
    <div
      css={css({
        lineHeight: "2.25rem",
        animation: `${rotate} 0.9s ease infinite`,
        width: "24px",
        height: "24px",
      })}
    >
      <LoaderCircle />
    </div>
  );
}
