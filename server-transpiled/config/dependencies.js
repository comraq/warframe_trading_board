"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (wagner, port) {
  wagner.factory("Config", function () {
    var conf = JSON.parse(_fs2.default.readFileSync(__dirname + "/../../config.json").toString());
    conf.server.port = port;
    conf.server.authority = conf.server.host + ":" + port;
    return conf;
  });
};