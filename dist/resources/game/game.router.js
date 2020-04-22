"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _game = require("./game.controller");

var router = (0, _express.Router)(); // eslint-disable-next-line prettier/prettier

router.route('/').get(_game.gameController.getMany).post(_game.gameController.makeOne);
router.route('/:id').get(_game.gameController.getOne).put(_game.gameController.updateOne)["delete"](_game.gameController.deleteOne);
var _default = router;
exports["default"] = _default;