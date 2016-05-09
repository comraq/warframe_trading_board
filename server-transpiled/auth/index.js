"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _facebookStrategy = require("./facebookStrategy");

var _facebookStrategy2 = _interopRequireDefault(_facebookStrategy);

var _steamStrategy = require("./steamStrategy");

var _steamStrategy2 = _interopRequireDefault(_steamStrategy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (wagner) {
  wagner.invoke(require("./passportConfig"), { passport: _passport2.default });

  _passport2.default.use(wagner.invoke(_facebookStrategy2.default, {
    passport: _passport2.default
  }));
  _passport2.default.use(wagner.invoke(_steamStrategy2.default, {
    passport: _passport2.default
  }));
};