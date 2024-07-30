import { css } from "@emotion/react";

interface ButtonPropsType
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const buttonStyle = css({
  outline: "none",
  border: "none",
  borderRadius: "8px",
  padding: "1.125rem 3rem",
  backgroundColor: "#261B23",
  color: "#fff",
  width: "100%",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
  transition: "0.2s",
  fontSize: "1rem",
  fontWeight: "700",
  ":hover": {
    backgroundColor: "#30252d",
  },
});

export function Button(props: ButtonPropsType) {
  const { children } = props;
  return (
    <button css={buttonStyle} {...props}>
      {children}
    </button>
  );
}
