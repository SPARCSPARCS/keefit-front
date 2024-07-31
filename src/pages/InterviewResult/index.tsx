import { useEffect, useState } from "react";
import { Button, GrayButton } from "../../components/Button";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useInterviewStore, useUserStore } from "../../features/store";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { BACK_SERVER_API } from "../../api/axois";

export function ResultPage() {
  const navigate = useNavigate();
  const questions = useInterviewStore((state: any) => state.questions);
  const answers = useInterviewStore((state: any) => state.answers);
  const userMajor = useUserStore((state: any) => state.userMajor);
  const companyName = useInterviewStore((state: any) => state.companyName);

  const getResult = async (id) => {
    try {
      const response = await axios.post(
        `${BACK_SERVER_API}/interview/1/${id}`,
        {
          companyName: companyName,
          field: userMajor,
          questions: questions,
          answers: answers,
          attitudeScore: 4,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {}
  };

  const sendResult = async () => {
    try {
      const response = await axios.post(
        `${BACK_SERVER_API}/interview/1`,
        {
          companyName: companyName,
          field: userMajor,
          questions: questions,
          answers: answers,
          attitudeScore: 4,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      getResult(response.data.interviewID);
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
          형준님의 프론트엔드 직업 적합도는?
        </h2>

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
          <GrayButton onClick={() => navigate("/")}>그만두기</GrayButton>
          <Button style={{ width: "100%" }} onClick={() => navigate("/job")}>
            기업 Fit 넘어가기
          </Button>
        </div>
      </div>
    </>
  );
}
