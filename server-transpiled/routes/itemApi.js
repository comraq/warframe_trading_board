"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _httpStatus = require("http-status");

var _httpStatus2 = _interopRequireDefault(_httpStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (Item, ItemCategory) {
  var api = _express2.default.Router();

  api.post("/new", function (req, res) {
    // TODO: Need to add proper/meaningful api response for this route
    if (process.env.npm_package_config_debug == "true") {
      console.log("itemApi: newItem");
      console.log(JSON.stringify(req.body, null, 2));
    }

    var item = new Item(req.body);
    item.save().then(function (result) {
      if (process.env.npm_package_config_debug == "true") {
        console.log("\nsuccess!");
        console.log(JSON.stringify(result, null, 2));
      }
      res.end();
    }, function (err) {
      console.log("\nerror!");
      console.log(err);

      res.status(_httpStatus2.default.BAD_REQUEST).end();
    });
  });

  return api;
};