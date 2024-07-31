import { useEffect, useState } from "react";
import { Button, GrayButton } from "../../components/Button";
import { css, keyframes } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useInterviewStore, useUserStore } from "../../features/store";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { BACK_SERVER_API } from "../../api/axois";
import { TopTitleBody } from "../../components/TopTitleBody";
import { BounceTitle } from "../../components/Title";
import { Progress, ResultProgress } from "../../components/Progress";

const rotate = keyframes`
  0% {
    transform: rotateZ(10deg);
  }
  50% {
    transform: rotateZ(-20deg) scale(1.3);
  }  100% {
    transform: rotateZ(10deg);
  }
`;

export function ResultPage() {
  const navigate = useNavigate();
  const questions = useInterviewStore((state: any) => state.questions);
  const answers = useInterviewStore((state: any) => state.answers);
  const userMajor = useUserStore((state: any) => state.userMajor);
  const companyName = useInterviewStore((state: any) => state.companyName);
  const userName = useUserStore((state: any) => state.userName);

  const [score, setScore] = useState("0");
  const [scoreList, setScoreList] = useState([0, 0]);

  const [isLoad, setIsLoad] = useState(true);

  const listTitle = ["업무수행능력", "지식중요도"];

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
      if (response.data.jobInterview.score.length > 1) {
        setScoreList([...response.data.jobInterview.score]);
      }

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
          <BounceTitle>직무 Fit</BounceTitle>
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
          {userName}님의 {userMajor} 직업 적합도는?
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
              animation: `${rotate} 0.9s ease infinite`,
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
            flexDirection: "column",
            backgroundColor: "#ebf5ec",
            borderRadius: "12px",
            marginBottom: "2rem",
          })}
        >
          <h2
            css={css({
              fontSize: "4rem",
              color: "#274029",
              margin: "0.75rem",
            })}
          >
            {score}%
          </h2>
        </div>

        {scoreList.map((item, idx) => (
          <div
            css={css({
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              marginBottom: "0.5rem",
            })}
          >
            <div
              css={css({
                flex: 2,
              })}
            >
              <b style={{ color: "#66AD6A" }}>{listTitle[idx]}</b>
            </div>

            <div
              css={css({
                flex: 5,
                width: "100%",
              })}
            >
              <ResultProgress progress={item}></ResultProgress>
            </div>
          </div>
        ))}

        {/* {questions.map((item, index) => (
          <p>
            {index}: {item}
          </p>
        ))}

        {answers.map((item, index) => (
          <p>
            answers{index}: {item}
          </p>
        ))} */}
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
