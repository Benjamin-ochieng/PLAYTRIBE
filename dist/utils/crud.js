"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crudControllers = exports.updateOne = exports.getOne = exports.getMany = exports.makeOne = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* eslint-disable no-underscore-dangle */

/* eslint-disable import/prefer-default-export */
var makeOne = function makeOne(model) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var body, data;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              body = req.body; // const createdBy = req.user._id

              if (!body) {
                res.status(400).end();
              }

              _context.prev = 2;
              _context.next = 5;
              return model.create(_objectSpread({}, body));

            case 5:
              data = _context.sent;
              res.status(201).json({
                data: data
              });
              _context.next = 13;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](2);
              console.error(_context.t0);
              res.status(400).end();

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 9]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports.makeOne = makeOne;

var getMany = function getMany(model) {
  return /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var data;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return model.find({}).lean().exec();

            case 3:
              data = _context2.sent;
              res.status(200).json({
                data: data
              });
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              console.error(_context2.t0);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 7]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();
};

exports.getMany = getMany;

var getOne = function getOne(model) {
  return /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var data;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return model.findOne({
                _id: req.params.id
              }).lean().exec();

            case 3:
              data = _context3.sent;
              if (!data) res.status(404).end('Not found');
              res.status(200).json({
                data: data
              });
              _context3.next = 12;
              break;

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              console.error(_context3.t0);
              res.status(400).end('Not found');

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 8]]);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();
};

exports.getOne = getOne;

var updateOne = function updateOne(model) {
  return /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var body, data;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              body = req.body; // const createdBy = req.user._id

              if (!body) {
                res.status(400).end();
              }

              _context4.prev = 2;
              _context4.next = 5;
              return model.findOneAndUpdate({
                _id: req.params.id
              }, _objectSpread({}, body), {
                "new": true
              }).lean().exec();

            case 5:
              data = _context4.sent;
              res.status(200).json({
                data: data
              });
              _context4.next = 13;
              break;

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](2);
              console.error(_context4.t0);
              res.status(400).end();

            case 13:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[2, 9]]);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();
};

exports.updateOne = updateOne;

var deleteOne = function deleteOne(model) {
  return /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var deletedData;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return model.deleteOne({
                _id: req.params.id
              });

            case 3:
              deletedData = _context5.sent;
              res.status(200).send({
                message: 'Deleted'
              });
              _context5.next = 11;
              break;

            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](0);
              console.error(_context5.t0);
              res.status(400).end();

            case 11:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 7]]);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();
};

var crudControllers = function crudControllers(model) {
  return {
    makeOne: makeOne(model),
    getMany: getMany(model),
    getOne: getOne(model),
    updateOne: updateOne(model),
    deleteOne: deleteOne(model)
  };
};

exports.crudControllers = crudControllers;