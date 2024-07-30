import { useEffect } from "react";
import { Button } from "../../components/Button";
import { useInterviewStore } from "../../features/store";
import axios from "axios";

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
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          padding: "1rem",
        }}
      >
        <h2>질문을 생성하고 있어요</h2>
      </div>
    </div>
  );
}
