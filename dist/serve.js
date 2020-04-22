"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = require("body-parser");

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _db = require("./utils/db");

var _config = _interopRequireDefault(require("./config"));

var _game = _interopRequireDefault(require("./resources/game/game.router"));

var _auth = require("./utils/auth");

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use((0, _morgan["default"])('dev'));
app.use((0, _bodyParser.json)());
app.use((0, _bodyParser.urlencoded)({
  extended: true
}));
app.use('/signup', _auth.signUp);
app.use('/api', _auth.protect);
app.use('/signin', _auth.signIn);
app.use('/api/games', _game["default"]); // eslint-disable-next-line import/prefer-default-export

var main = function main() {
  try {
    (0, _db.connectDb)();
    app.listen(_config["default"].port, function () {
      console.log("Server started on port ".concat(_config["default"].port));
    });
  } catch (err) {
    console.error(err);
  }
};

exports.main = main;