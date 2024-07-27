import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { App } from "./App";
import { Interview } from "./pages/Interview";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "about",
    Component: Interview,
  },
]);
