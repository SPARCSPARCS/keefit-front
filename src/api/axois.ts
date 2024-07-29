import axios from "axios";

const isLocal = () => {
  const whitelist = ["localhost"];
  if (whitelist.includes(location.hostname)) {
    return true;
  }
  return false;
};

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