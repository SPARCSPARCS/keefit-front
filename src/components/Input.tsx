import { css } from "@emotion/react";
import { InputHTMLAttributes } from "react";

interface InputPropsType extends React.InputHTMLAttributes<HTMLInputElement> {}

const inputStyle = css({
  outline: "none",
  border: "none",
  borderBottom: "0.1rem solid #000",
  padding: "0.25rem 0.1rem",
  fontSize: "1.5rem",
});

export function Input(props: InputPropsType) {
  return <input css={inputStyle} {...props} />;
}
