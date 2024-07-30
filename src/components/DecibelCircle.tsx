import { css } from "@emotion/react";

export function DecibelCircle({ decibel }: { decibel?: number }) {
  return (
    <div
      style={{
        width: decibel / 1,
        height: decibel / 1,
        backgroundColor: "#fff",
        borderRadius: 500,
      }}
    ></div>
  );
}
