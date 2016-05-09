"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _httpStatus = require("http-status");

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _itemApi = require("./itemApi");

var _itemApi2 = _interopRequireDefault(_itemApi);

var _categoryApi = require("./categoryApi");

var _categoryApi2 = _interopRequireDefault(_categoryApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (wagner) {
  var api = _express2.default.Router();

  // CORS Support
  api.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    next();
  });

  api.use(_bodyParser2.default.json());

  api.get("/me", function (req, res) {
    if (!req.user) {
      return res.status(_httpStatus2.default.UNAUTHORIZED).json({ error: "Not logged in" });
    }

    res.json({ user: req.user });
  });

  api.get("/logOut", function (req, res) {
    req.logout();
    res.json({ user: null });

    // An alternative logout method if the above fails
    // req.session.destroy(err => res.json({ user: null }))
  });

  api.use("/item", wagner.invoke(_itemApi2.default));
  api.use("/category", wagner.invoke(_categoryApi2.default));
  return api;
};