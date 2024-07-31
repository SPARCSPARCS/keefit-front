import { useEffect, useState } from "react";
import { Button, GrayButton } from "../../components/Button";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useInterviewStore, useUserStore } from "../../features/store";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export function JobResultPage() {
  const navigate = useNavigate();
  const questions = useInterviewStore((state: any) => state.questions);
  const answers = useInterviewStore((state: any) => state.answers);
  const userName = useUserStore((state: any) => state.userName);
  const userMajor = useUserStore((state: any) => state.userMajor);
  const companyName = useInterviewStore((state: any) => state.companyName);
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
          기업 Fit이 도착했어요. <br />
          {userName}님의 기업 적합도는?
        </h2>

        <p
          css={css({
            color: "#3B813E",
          })}
        >
          {companyName} {userMajor}
        </p>

        <div
          css={css({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          })}
        >
          <h2
            css={css({
              fontSize: "5rem",
              color: "#261B23",
              margin: "1rem",
            })}
          >
            👍
          </h2>
        </div>

        <div
          css={css({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          })}
        >
          <h2
            css={css({
              fontSize: "5rem",
              color: "#261B23",
              marginTop: "0.5rem",
            })}
          >
            92%
          </h2>
        </div>

        {questions.map((item, index) => (
          <p>
            {index}: {item}
          </p>
        ))}

        {answers.map((item, index) => (
          <p>
            answers{index}: {item}
          </p>
        ))}
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
          <Button style={{ width: "100%" }} onClick={() => navigate("/final")}>
            최종 키핏 확인하기
          </Button>
        </div>
      </div>
    </>
  );
}
