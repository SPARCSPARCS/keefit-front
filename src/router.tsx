import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { InterviewPage } from "./pages/Interview";
import { MainPage } from "./pages/Main";
import { ResultPage } from "./pages/Result";
import { FormNamePage } from "./pages/User/FormName";
import { FormMajorPage } from "./pages/User/FormMajor";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainPage,
  },
  {
    path: "interview",
    Component: InterviewPage,
  },
  {
    path: "result",
    Component: ResultPage,
  },
  {
    path: "user/name",
    Component: FormNamePage,
  },
  {
    path: "user/major",
    Component: FormMajorPage,
  },
]);
