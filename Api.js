import axios from "axios";
import secrets from "./secrets.json";

const baseUrl = secrets.server_url;

var headers = new Headers({
  Accept: "application/json",
  "Content-Type": "application/json",
  "auth-token": secrets.api_key
});

var init = {
  method: "GET",
  headers: headers,
  mode: "cors",
  cache: "default"
};

const server = axios.create({
  baseURL: secrets.server_url,
  timeout: 60000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "auth-token": secrets.api_key
  }
});

export const getInvestments = () => server.get("/investments");
