import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import axios from "axios";
import { BACK_SERVER_API } from "../../api/axois";
import { useUserStore } from "../../features/store";

export function MainPage() {
  const navigate = useNavigate();

  const userId = useUserStore((state: any) => state.userId);

  const signup = async () => {
    try {
      const response = await axios.post(
        `${BACK_SERVER_API}/signup`,
        {
          memberId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {}
  };

  const login = async () => {
    try {
      const response = await axios.post(
        `${BACK_SERVER_API}/login`,
        {
          memberId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {}
  };

  const getList = async () => {
    try {
      const response = await axios.get(`${BACK_SERVER_API}/interview/1/list`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    signup();
    getList();
  }, []);

  return (
    <>
      <div
        css={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        })}
      >
        <img src="/logo.png" width={"200px"} alt="" />
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
          })}
        >
          <Button
            style={{ width: "100%" }}
            onClick={() => navigate("/user/name")}
          >
            시작하기
          </Button>
        </div>
      </div>
    </>
  );
}
