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

export function ProcessingResult({ onNext }: { onNext?: any }) {
  const [value, setValue] = useState("");
  const [showLoad, setShowLoad] = useState(false);

  const recruitment = useInterviewStore((state: any) => state.recruitment);
  const setRecruitment = useInterviewStore(
    (state: any) => state.setRecruitment
  );

  const handleClickNext = async () => {
    setShowLoad(true);
    const url = isLocal()
      ? `${DEV_SERVER_PYTHON_API}/test/url`
      : `${PROD_SERVER_PYTHON_API}/test/url`;

    try {
      //   const response = await axios.get(url, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //     params: {
      //       url: value,
      //     },
      //   });

      //   setRecruitment(response.data.content);
      onNext();
    } catch (error) {}
  };

  useEffect(() => {
    setTimeout(() => {
      onNext();
    }, 1000);
  }, []);

  return (
    <div>
      <TopTitleBody>
        <Title animationDelay="0">결과를 분석하고 있어요</Title>
      </TopTitleBody>
    </div>
  );
}
