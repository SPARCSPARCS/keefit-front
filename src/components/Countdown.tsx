import React, { useState, useEffect } from "react";

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  return (
    <div style={{ textAlign: "center", fontSize: "24px", marginTop: "20px" }}>
      <div>{timeLeft > 0 ? `${timeLeft}s` : ""}</div>
    </div>
  );
}
