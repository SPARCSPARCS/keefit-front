import { useEffect, useState } from "react";
import { Button, GrayButton } from "../../components/Button";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useInterviewStore } from "../../features/store";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export function FinalPage() {
  const navigate = useNavigate();
  const questions = useInterviewStore((state: any) => state.questions);
  const answers = useInterviewStore((state: any) => state.answers);

  const sendResult = async () => {
    try {
      const response = await axios.post(
        `http://svr/interview`,
        {
          companyName: "toss",
          field: "직무",
          questions: questions,
          answers: answers,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {}
  };

  useEffect(() => {
    sendResult();
  }, []);

  return (
    <>
      <div
        css={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
          padding: "1rem",
        })}
      >
        <h2
          css={css({
            fontSize: "1.5rem",
          })}
        >
          최종 키핏이에요.
        </h2>
      </div>

      <div
        css={css({
          position: "fixed",
          bottom: "0.5rem",
          display: "flex",
          width: "100%",
        })}
      >
        <div
          css={css({
            display: "flex",
            width: "100%",

            padding: "1rem",
            gap: "1rem",
          })}
        >
          <Button style={{ width: "100%" }} onClick={() => navigate("/")}>
            완료
          </Button>
        </div>
      </div>
    </>
  );
}
