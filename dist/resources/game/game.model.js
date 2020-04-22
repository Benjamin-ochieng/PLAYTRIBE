"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var gameSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  studio: String,
  releaseDate: Date,
  rating: Number
}, {
  timestamps: true
}); // eslint-disable-next-line import/prefer-default-export

var Game = _mongoose["default"].model('Game', gameSchema);

exports.Game = Game;