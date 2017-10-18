import axios from "axios";

const server = axios.create({
  baseURL: "https://jonathanzanella-myinvestments.herokuapp.com/api",
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
