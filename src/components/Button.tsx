import { css } from "@emotion/react";
import { LoaderCircle } from "lucide";
import { Loading } from "./Loading";

interface ButtonPropsType
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const buttonStyle = css({
  display: "flex",
  outline: "none",
  border: "none",
  borderRadius: "8px",
  padding: "1.125rem 3rem",
  backgroundColor: "#66AD6A",
  color: "#fff",
  width: "100%",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
  transition: "0.2s",
  fontSize: "1rem",
  fontWeight: "700",
  flexDirection: "row",
  gap: "0.5rem",
  ":hover": {
    backgroundColor: "#539156",
    transform: "translateX(4px)",
  },
});

const grayButtonStyle = css({
  display: "flex",
  outline: "none",
  border: "none",
  borderRadius: "8px",
  padding: "1.125rem 3rem",
  backgroundColor: "#D7D7D7",
  color: "#7E7E7E",
  width: "100%",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
  transition: "0.2s",
  fontSize: "1rem",
  fontWeight: "700",
  flexDirection: "row",
  gap: "0.5rem",
  ":hover": {
    backgroundColor: "#D7D7D7",
  },
});

export function Button(props: ButtonPropsType) {
  const { children, isLoading = false } = props;
  return (
    <button css={buttonStyle} {...props}>
      {isLoading && <Loading />}
      <b>{children}</b>
    </button>
  );
}

export function GrayButton(props: ButtonPropsType) {
  const { children, isLoading = false } = props;
  return (
    <button css={grayButtonStyle} {...props}>
      {isLoading && <Loading />}
      <b>{children}</b>
    </button>
  );
}
