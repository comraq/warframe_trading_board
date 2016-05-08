"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userObject = {
  profile: {
    name: {
      type: String,
      required: true
    },
    picture: {
      type: String,
      required: true,
      match: /^https?:\/\//i
    }
  },
  data: {
    oauth: { type: String, required: true }
  }
};

var schema = new _mongoose2.default.Schema(userObject);
exports.default = _mongoose2.default.model("User", schema, "users");