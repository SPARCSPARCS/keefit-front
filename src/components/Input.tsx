import { css, keyframes } from "@emotion/react";
import { InputHTMLAttributes } from "react";

interface InputPropsType extends React.InputHTMLAttributes<HTMLInputElement> {}

const bounce = keyframes`
  0% {
    transform: translate3d(0,15px,0);
    opacity: 0;
  }  
  100% {
    transform: translate3d(0,0,0);
    opacity: 1;
  }
`;

const inputStyle = css({
  outline: "none",
  border: "none",
  borderBottom: "0.1rem solid #759475",
  padding: "0.5rem 0.25rem",
  fontSize: "1.5rem",
  transition: "0.2s",
  animation: `${bounce} 0.5s ease`,
  animationFillMode: "forwards",
  animationDelay: `0.25s`,
  opacity: 0,
  ":hover": {
    backgroundColor: "#f7f7f7",
    padding: "0.75rem 0.5rem",
  },
});

export function Input(props: InputPropsType) {
  return <input css={inputStyle} {...props} />;
}
