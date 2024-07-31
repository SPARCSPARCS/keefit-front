import { useEffect, useState } from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import axios from "axios";
import { useInterviewStore } from "../../features/store";
import { css, keyframes } from "@emotion/react";
import { Title } from "../../components/Title";
import { TopTitleBody } from "../../components/TopTitleBody";
import { isLocal } from "../../utils/isLocal";
import { DEV_SERVER_PYTHON_API, PROD_SERVER_PYTHON_API } from "../../api/axois";

export function ConfirmJob({ onNext }: { onNext?: any }) {
  const [value, setValue] = useState("");
  const [showLoad, setShowLoad] = useState(false);

  const recruitment = useInterviewStore((state: any) => state.recruitment);
  const jobNews = useInterviewStore((state: any) => state.jobNews);
  const [keywordArray, setKeywordArray] = useState([]);

  const setRecruitment = useInterviewStore(
    (state: any) => state.setRecruitment
  );

  const handleClickNext = async () => {
    setShowLoad(false);
    onNext();
  };

  const getKey = async () => {
    const url = isLocal()
      ? `${DEV_SERVER_PYTHON_API}/real_keyword`
      : `${PROD_SERVER_PYTHON_API}/real_keyword`;

    try {
      const getKeyword = await axios.post(
        url,
        {
          content: jobNews,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setKeywordArray([...getKeyword.data.result]);
    } catch (error) {}
  };

  useEffect(() => {
    getKey();
  }, []);

  return (
    <div>
      <TopTitleBody>
        <Title animationDelay="0">2단계</Title>
        <Title animationDelay="0.15">기업 Fit을 찾아볼까요</Title>
      </TopTitleBody>

      <p>주요 키워드를 바탕으로 질문이 생성돼요</p>
      {keywordArray.map((item) => (
        <b style={{ color: "#000" }}>{item}, </b>
      ))}

      <div
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
        }}
      >
        <Button
          disabled={showLoad}
          isLoading={showLoad}
          onClick={handleClickNext}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
