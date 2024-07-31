import { useEffect } from "react";
import { Button } from "../../components/Button";
import { useInterviewStore } from "../../features/store";
import axios from "axios";
import { TopTitleBody } from "../../components/TopTitleBody";
import { BounceTitle } from "../../components/Title";
import { DEV_SERVER_PYTHON_API, PROD_SERVER_PYTHON_API } from "../../api/axois";
import { isLocal } from "../../utils/isLocal";

export function CreateJob({ onNext }: { onNext?: any }) {
  const recruitment = useInterviewStore((state: any) => state.recruitment);
  const setQuestions = useInterviewStore((state: any) => state.setQuestions);

  const loadQuestions = async () => {
    try {
      onNext();
    } catch (error) {}
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  return (
    <div>
      <TopTitleBody>
        <BounceTitle>직무 Fit</BounceTitle>
        <BounceTitle>질문을 생성하고 있어요</BounceTitle>
      </TopTitleBody>
    </div>
  );
}
