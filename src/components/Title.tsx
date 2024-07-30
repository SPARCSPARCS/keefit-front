import { css, keyframes } from "@emotion/react";

const bounce = keyframes`
  0% {
    transform: translate3d(0,30px,0);
    opacity: 0;
  }  
  100% {
    transform: translate3d(0,0,0);
    opacity: 1;
  }
`;

const bounceBounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`;

export function Title({ children, animationDelay, color = "#000" }: any) {
  return (
    <h2
      css={css({
        lineHeight: "2.25rem",
        animation: `${bounce} 0.9s ease`,
        animationFillMode: "forwards",
        animationDelay: `${animationDelay}s`,
        opacity: 0,
        margin: 0,
        color: color,
      })}
    >
      {children}
    </h2>
  );
}

export function BounceTitle({ children }: any) {
  return (
    <h2
      css={css({
        lineHeight: "2.25rem",
        animation: `${bounceBounce} 0.9s ease infinite`,
      })}
    >
      {children}
    </h2>
  );
}
