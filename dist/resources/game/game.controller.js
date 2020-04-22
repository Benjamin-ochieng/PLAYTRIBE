"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameController = void 0;

var _crud = require("../../utils/crud");

var _game = require("./game.model");

// eslint-disable-next-line import/prefer-default-export
var gameController = (0, _crud.crudControllers)(_game.Game);
exports.gameController = gameController;