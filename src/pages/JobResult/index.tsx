import { useEffect, useState } from "react";
import { Button, GrayButton } from "../../components/Button";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useInterviewStore, useUserStore } from "../../features/store";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { BACK_SERVER_API } from "../../api/axois";
import { TopTitleBody } from "../../components/TopTitleBody";
import { BounceTitle } from "../../components/Title";

export function JobResultPage() {
  const navigate = useNavigate();
  const questions = useInterviewStore((state: any) => state.questions);
  const answers = useInterviewStore((state: any) => state.answers);
  const userName = useUserStore((state: any) => state.userName);
  const userMajor = useUserStore((state: any) => state.userMajor);
  const companyName = useInterviewStore((state: any) => state.companyName);
  const [score, setScore] = useState("0");
  const [isLoad, setIsLoad] = useState(true);

  const getResult = async (id) => {
    try {
      const response = await axios.get(
        `${BACK_SERVER_API}/interview/admin/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsLoad(false);
      setScore(response.data.jobInterview.totalScore);

      // jobInterview
    } catch (error) {}
  };

  const sendResult = async () => {
    try {
      const response = await axios.post(
        `${BACK_SERVER_API}/interview/admin`,
        {
          companyName: companyName,
          field: userMajor,
          questions: questions,
          answers: answers,
          attitudeScore: 4,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      getResult(response.data.interviewID);
    } catch (error) {}
  };

  useEffect(() => {
    sendResult();
  }, []);

  if (isLoad) {
    return (
      <div>
        <TopTitleBody>
          <BounceTitle>기업 Fit</BounceTitle>
          <BounceTitle>결과를 추합하고 있어요</BounceTitle>
        </TopTitleBody>
      </div>
    );
  }

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
            flexDirection: "column",
            backgroundColor: "#ebf5ec",
            borderRadius: "12px",
          })}
        >
          <h2
            css={css({
              fontSize: "5rem",
              color: "#274029",
              margin: "0.75rem",
            })}
          >
            {score}%
          </h2>
        </div>
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
            홈으로
          </Button>
        </div>
      </div>
    </>
  );
}
