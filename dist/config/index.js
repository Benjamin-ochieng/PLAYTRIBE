"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = require("lodash");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _dev = _interopRequireDefault(require("./dev"));

var _test = _interopRequireDefault(require("./test"));

_dotenv["default"].config();

var env = process.env.NODE_ENV || 'development';
var baseConfig = {
  env: env,
  isDev: env === 'development',
  isTest: env === 'test',
  port: 3000,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '7d'
  }
};
var envConfig = {};

switch (env) {
  case 'dev':
  case 'development':
    envConfig = _dev["default"];
    break;

  case 'test':
  case 'testing':
    envConfig = _test["default"];
    break;

  default:
    envConfig = _dev["default"];
}

var _default = (0, _lodash.merge)(baseConfig, envConfig);

exports["default"] = _default;