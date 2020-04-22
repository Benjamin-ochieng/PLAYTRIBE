"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protect = exports.signIn = exports.signUp = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _user = require("../resources/user/user.model");

var createToken = function createToken(user) {
  return _jsonwebtoken["default"].sign({
    id: user.id
  }, _config["default"].secrets.jwt, {
    expiresIn: _config["default"].secrets.jwtExp
  });
};

var verifyToken = function verifyToken(token) {
  return new Promise(function (resolve, reject) {
    // eslint-disable-next-line consistent-return
    _jsonwebtoken["default"].verify(token, _config["default"].secrets.jwt, function (err, payload) {
      if (err) return reject(err);
      resolve(payload);
    });
  });
};

var setCookies = function setCookies(res, token) {
  // const cookies = []
  var _token$split = token.split('.'),
      _token$split2 = (0, _slicedToArray2["default"])(_token$split, 3),
      header = _token$split2[0],
      payload = _token$split2[1],
      signature = _token$split2[2];

  res.cookie('signedToken', "".concat(header, ".").concat(signature), {
    // domain: "",
    secure: true,
    httpOnly: true,
    sameSite: true
  });
  res.cookie('token', "".concat(payload), {
    // domain: "",
    secure: true,
    httpOnly: true,
    sameSite: true
  });
};

var signUp = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, email, password, user, token;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            if (!email || !password) res.status(400).send({
              message: 'email and password are required'
            });
            _context.prev = 2;
            _context.next = 5;
            return _user.User.create({
              email: email,
              password: password
            });

          case 5:
            user = _context.sent;
            token = createToken(user);
            setCookies(res, token);
            res.status(200).send({
              message: 'You are signed up!'
            });
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](2);
            res.status(409).send({
              Error: 'Email address already in use'
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 11]]);
  }));

  return function signUp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signUp = signUp;

var signIn = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body2, email, password, user, authorizedUser, token;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
            if (!email || !password) res.status(400).end({
              message: 'email and password are required'
            });
            _context2.prev = 2;
            _context2.next = 5;
            return _user.User.findOne({
              email: email
            });

          case 5:
            user = _context2.sent;
            if (!user) res.status(401).send({
              message: 'Invalid username or password'
            });
            _context2.next = 9;
            return user.checkPassword(password);

          case 9:
            authorizedUser = _context2.sent;

            if (!authorizedUser) {
              res.status(401).send({
                message: 'Invalid username or password'
              });
            } else {
              token = createToken(user);
              setCookies(res, token);
              res.status(200).send({
                message: 'Signed In'
              });
            }

            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](2);
            console.error(_context2.t0);
            res.status(400).end();

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 13]]);
  }));

  return function signIn(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signIn = signIn;

var protect = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var header, token, payload, user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            header = req.headers.authorization;

            if (header) {
              _context3.next = 5;
              break;
            }

            res.status(401).send({
              message: 'email and password are required'
            });
            _context3.next = 22;
            break;

          case 5:
            _context3.prev = 5;
            token = header.split(' ')[1];
            console.log(token);
            _context3.next = 10;
            return verifyToken(token);

          case 10:
            payload = _context3.sent;
            _context3.next = 13;
            return _user.User.findOne({
              _id: payload.id
            }).select('-password').lean().exec();

          case 13:
            user = _context3.sent;
            req.user = user;
            next();
            _context3.next = 22;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](5);
            console.error(_context3.t0);
            res.status(500).send({
              message: "you don't have permission.  Please log in or sign up"
            });

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[5, 18]]);
  }));

  return function protect(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

exports.protect = protect;