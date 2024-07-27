import { css } from "@emotion/react";

interface ButtonPropsType
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const buttonStyle = css({});

export function Button(props: ButtonPropsType) {
  const { children } = props;
  return (
    <button css={buttonStyle} {...props}>
      {children}
    </button>
  );
}
