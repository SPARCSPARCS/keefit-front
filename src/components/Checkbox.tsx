/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { RefreshCcw } from "lucide-react";
import React, { useState } from "react";

type OptionsType = {
  label: string;
  description?: string;
};

const styles = {
  option: (selected) => ({
    padding: "1rem 2rem",
    borderRadius: "12px",
    margin: "1rem",
    cursor: "pointer",
    backgroundColor: selected ? "#3B813E" : "white",
    color: selected ? "white" : "black",
    transition: "0.2s",
    outline: selected ? "none" : "0.1rem solid #D9D9D9",
    ":hover": {
      backgroundColor: selected ? "#3B813E" : "#fff",
    },
  }),
  checkMark: {
    float: "right",
  },
  description: (selected) => ({
    fontSize: "0.8em",
    color: selected ? "white" : "#555",
  }),
};

function Checkbox({
  options,
  onRefresh,
}: {
  options: OptionsType[];
  onRefresh?: any;
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <div
        css={css({
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        })}
      >
        <p
          css={css({
            display: "flex",
            cursor: "pointer",
            marginRight: "1rem",
            color: "#6B6B6B",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
          })}
          onClick={onRefresh}
        >
          <RefreshCcw style={{ width: "16px" }} /> <b>새로고침</b>
        </p>
      </div>
      <div
        css={css({
          display: "inline-block",
          borderRadius: "4px",
          width: "100%",
          textAlign: "left",
        })}
      >
        {options.map((option) => (
          <div
            css={styles.option(selectedOption === option)}
            onClick={() => handleSelect(option)}
          >
            <div>{option.label}</div>
            <div css={styles.description(selectedOption === option)}>
              {option.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Checkbox;
