"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var devConfig = {
  secrets: {
    jwt: process.env.JWT
  },
  dbUrl: process.env.DEV_DBURL
};
var _default = devConfig;
exports["default"] = _default;