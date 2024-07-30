import { useEffect } from "react";
import { Button } from "../../components/Button";
import { useInterviewStore } from "../../features/store";
import axios from "axios";
import { TopTitleBody } from "../../components/TopTitleBody";
import { BounceTitle } from "../../components/Title";

export function CreateQuestion({ onNext }: { onNext?: any }) {
  const recruitment = useInterviewStore((state: any) => state.recruitment);
  const setQuestions = useInterviewStore((state: any) => state.setQuestions);

  const loadQuestions = async () => {
    try {
      const getQuestions = await axios.post(
        "http://127.0.0.1:8000/questions",
        {
          content: recruitment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setQuestions([...getQuestions.data.result]);
      onNext();
    } catch (error) {}
  };

  useEffect(() => {
    if (recruitment != "") {
      loadQuestions();
    }
  }, [recruitment]);

  return (
    <div>
      <TopTitleBody>
        <BounceTitle>질문을 생성하고 있어요</BounceTitle>
      </TopTitleBody>
    </div>
  );
}
