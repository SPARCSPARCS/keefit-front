import { useEffect } from "react";
import { Button } from "../../components/Button";
import { useInterviewStore } from "../../features/store";
import axios from "axios";
import { TopTitleBody } from "../../components/TopTitleBody";
import { BounceTitle } from "../../components/Title";
import { DEV_SERVER_PYTHON_API, PROD_SERVER_PYTHON_API } from "../../api/axois";
import { isLocal } from "../../utils/isLocal";

export function CreateCompanyJobp({ onNext }: { onNext?: any }) {
  const recruitment = useInterviewStore((state: any) => state.recruitment);
  const jobNews = useInterviewStore((state: any) => state.jobNews);
  const setQuestions2 = useInterviewStore((state: any) => state.setQuestions2);

  const loadQuestions = async () => {
    const url = isLocal()
      ? `${DEV_SERVER_PYTHON_API}/keyword`
      : `${PROD_SERVER_PYTHON_API}/keyword`;

    try {
      const getKeyword = await axios.post(
        url,
        {
          content1: jobNews,
          content2: recruitment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setQuestions2([...getKeyword.data.result]);

      onNext();
    } catch (error) {}
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  return (
    <div>
      <TopTitleBody>
        <BounceTitle>기업 Fit</BounceTitle>
        <BounceTitle>질문을 생성하고 있어요</BounceTitle>
      </TopTitleBody>
    </div>
  );
}
