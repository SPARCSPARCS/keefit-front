import { css } from "@emotion/react";
import { InputHTMLAttributes } from "react";

interface InputPropsType extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputPropsType) {
  return <input {...props} />;
}
