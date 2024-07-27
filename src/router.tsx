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

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainPage,
  },
  {
    path: "interview",
    Component: InterviewPage,
  },
]);
