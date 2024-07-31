import axios from "axios";
import { isLocal } from "../utils/isLocal";

export const PROD_SERVER_PYTHON_API = "https://sparcs.cartesiancs.com";
export const DEV_SERVER_PYTHON_API = "http://127.0.0.1:8000";

const instance = axios.create({
  baseURL: isLocal() ? "http://localhost:8000/api/" : "https://prod",
  // headers: { 'X-Custom-Header': 'foobar' }
});

const instanceAuth = axios.create({
  baseURL: isLocal() ? "http://localhost:8000/api/" : "https://prod",
  headers: { "x-access-token": "getToken()" },
});

const instanceAi = axios.create({
  baseURL: isLocal() ? "http://127.0.0.1:8000/" : "https://prod",
});

export { instance, instanceAuth, instanceAi };
