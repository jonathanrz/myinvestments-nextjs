"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInvestments = undefined;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _secrets = require("./secrets.json");

var _secrets2 = _interopRequireDefault(_secrets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = _axios2.default.create({
  baseURL: _secrets2.default.server_url,
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