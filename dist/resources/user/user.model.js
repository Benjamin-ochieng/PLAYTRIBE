"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

/* eslint-disable import/prefer-default-export */

/* eslint-disable consistent-return */
var userSchema = new _mongoose["default"].Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
userSchema.pre('save', function createHash(next) {
  var _this = this;

  if (!this.isModified('password')) return next();

  _bcrypt["default"].hash(this.password, 8, function (err, hash) {
    if (err) return next(err);
    _this.password = hash;
    next();
  });
});

userSchema.methods.checkPassword = function checkPassword(password) {
  var hashedPassword = this.password;
  return new Promise(function (resolve, reject) {
    _bcrypt["default"].compare(password, hashedPassword, function (err, result) {
      if (err) {
        return reject(err);
      }

      resolve(result);
    });
  });
};

var User = _mongoose["default"].model('User', userSchema);

exports.User = User;