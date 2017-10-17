import axios from "axios";
import secrets from "./secrets.json";

const server = axios.create({
  baseURL: secrets.server_url,
  timeout: 60000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export const getInvestments = token => {
  server.defaults.headers.common["auth-token"] = token;
  return server.get("/investments");
};
