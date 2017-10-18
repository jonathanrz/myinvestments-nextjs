"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInvestments = undefined;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = _axios2.default.create({
  baseURL: "https://jonathanzanella-myinvestments.herokuapp.com/api",
  timeout: 60000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

var getInvestments = exports.getInvestments = function getInvestments(token) {
  server.defaults.headers.common["auth-token"] = token;
  return server.get("/investments");
};