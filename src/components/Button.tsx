import { css } from "@emotion/react";

interface ButtonPropsType
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const buttonStyle = css({
  outline: "none",
  border: "none",
  borderRadius: "8px",
  padding: "1.25rem 3rem",
  backgroundColor: "#000",
  color: "#fff",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
  transition: "0.2s",
  fontSize: "1rem",
  ":hover": {
    backgroundColor: "#262629",
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
