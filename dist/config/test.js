"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var testConfig = {
  secrets: {
    jwt: process.env.JWT
  },
  dbUrl: process.env.TEST_DBURL
};
var _default = testConfig;
exports["default"] = _default;