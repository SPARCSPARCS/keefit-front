import { css } from "@emotion/react";
import { InputHTMLAttributes } from "react";

interface InputPropsType extends React.InputHTMLAttributes<HTMLInputElement> {}

const inputStyle = css({
  outline: "none",
  border: "none",
  borderBottom: "0.1rem solid #759475",
  padding: "0.5rem 0.25rem",
  fontSize: "1.5rem",
  transition: "0.2s",
  ":hover": {
    backgroundColor: "#f7f7f7",
  },
});

export function Input(props: InputPropsType) {
  return <input css={inputStyle} {...props} />;
}
