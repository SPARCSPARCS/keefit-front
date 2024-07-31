import { useEffect, useState } from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import axios from "axios";
import { useInterviewStore, useUserStore } from "../../features/store";
import { css, keyframes } from "@emotion/react";
import { Title } from "../../components/Title";
import { TopTitleBody } from "../../components/TopTitleBody";
import { isLocal } from "../../utils/isLocal";
import { DEV_SERVER_PYTHON_API, PROD_SERVER_PYTHON_API } from "../../api/axois";
import Checkbox from "../../components/Checkbox";

export function GetNews({ onNext }: { onNext?: any }) {
  const userMajor = useUserStore((state: any) => state.userMajor);

  const [list, setList] = useState([]);

  const getList = async () => {
    const url = isLocal()
      ? `${DEV_SERVER_PYTHON_API}/news`
      : `${PROD_SERVER_PYTHON_API}/news`;

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          query: userMajor,
        },
      });

      setList([
        ...response.data.response.map((item) => {
          return {
            label: item.title,
            description: item.description,
          };
        }),
      ]);
    } catch (error) {}
  };

  const handleClickNext = async () => {
    const url = isLocal()
      ? `${DEV_SERVER_PYTHON_API}/news`
      : `${PROD_SERVER_PYTHON_API}/news`;

    try {
      onNext();
    } catch (error) {}
  };

  useEffect(() => {
    getList();
  }, []);
  return (
    <div>
      <TopTitleBody>
        <Title animationDelay="0">연습하고 싶은 주제를 선택해 주세요</Title>
      </TopTitleBody>

      <div
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          zIndex: 999,
        }}
      >
        <Button onClick={handleClickNext}>다음</Button>
      </div>

      <div
        style={{
          position: "absolute",
          top: "5rem",
          left: 0,
        }}
      >
        <Checkbox onRefresh={getList} options={list} />
      </div>

      {list.map((item) => (
        <p>{item.title}</p>
      ))}
    </div>
  );
}
