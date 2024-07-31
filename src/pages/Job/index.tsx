import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button";
import { css } from "@emotion/react";
import { useAudio } from "../../hooks/useAudio";
import { useFile } from "../../hooks/useFile";
import { Modal } from "../../components/Modal";
import { useInterviewStore } from "../../features/store";
import { Funnel } from "../../components/Funnel";
import { useNavigate } from "react-router-dom";
import { Progress } from "../../components/Progress";
import { DecibelCircle } from "../../components/DecibelCircle";
import * as vision from "@mediapipe/tasks-vision";
import { Title } from "../../components/Title";
import { TopTitleBody } from "../../components/TopTitleBody";
import { TopNav } from "../../components/Nav";
import { GetNews } from "./GetNews";
import { ConfirmJob } from "./ConfirmJob";
import { CreateCompanyJobp } from "./CreateJob";
import { JobRecord } from "./Record";

export function JobPage() {
  const navigate = useNavigate();

  const { decibel, audioBlob, audioUrl, isStart, stopRecord, startRecord } =
    useAudio();
  const [activePage, setActivePage] = useState("GetNews");
  const [nowPageIndex, setNowPageIndex] = useState(0);

  const pages = ["GetNews", "ConfirmJob", "CreateCompanyJobp", "Record"];

  const handleClickNextButton = () => {
    if (nowPageIndex >= pages.length - 1) {
      navigate("/result");
    }

    const index = pages.findIndex((item) => {
      return item == activePage;
    });

    setActivePage(pages[index + 1]);
    setNowPageIndex((index) => index + 1);
  };

  return (
    <>
      <div
        css={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          backgroundColor: activePage == "Record" ? "#000" : "#fff",
          transition: "0.7s",
        })}
      >
        <Funnel isOpen={activePage == "GetNews"}>
          <GetNews onNext={handleClickNextButton}></GetNews>
        </Funnel>

        <Funnel isOpen={activePage == "ConfirmJob"}>
          <ConfirmJob onNext={handleClickNextButton}></ConfirmJob>
        </Funnel>

        <Funnel isOpen={activePage == "CreateCompanyJobp"}>
          <CreateCompanyJobp onNext={handleClickNextButton}></CreateCompanyJobp>
        </Funnel>

        <Funnel isOpen={activePage == "Record"}>
          <JobRecord onNext={handleClickNextButton}></JobRecord>
        </Funnel>
      </div>
    </>
  );
}
