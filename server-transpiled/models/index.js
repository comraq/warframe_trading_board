"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _item = require("./item");

var _item2 = _interopRequireDefault(_item);

var _user = require("./user");

var _user2 = _interopRequireDefault(_user);

var _itemCategory = require("./itemCategory");

var _itemCategory2 = _interopRequireDefault(_itemCategory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_itemCategory2.default.hierarchy = _itemCategory.hierarchy;

exports.default = function (wagner) {
  wagner.invoke(function (Config) {
    var dbConfig = Config.warframeDB;
    var hostname = dbConfig.hostname || "localhost",
        port = dbConfig.port || 27017,
        user = dbConfig.user || undefined,
        password = dbConfig.password || undefined,
        dbName = dbConfig.dbName || "testDB";

    var userInfo = user ? user + ":" + password + "@" : "";
    var uri = "mongodb://" + userInfo + hostname + ":" + port + "/" + dbName;

    _mongoose2.default.connect(uri, function (err) {
      if (err) throw new Error(err);
    });
  });

  wagner.factory("db", function (Config) {
    return _mongoose2.default;
  });

  /*
   * TODO: Define mongoose schema models in separate .js files and
   *       require them as necessary inside models
   *
   *       Then, loop through each one and add them to wagner as a service
   */
  var models = {
    ItemCategory: _itemCategory2.default,
    Item: _item2.default,
    User: _user2.default
  };

  // DRY, register factories/servies in a loop
  for (var modelName in models) {
    // Wagner Factory calls the functions asynchronously,
    // must use IIFE and closures to retain reference to the correct
    // modelName through each iteration of the loop
    wagner.factory(modelName, function (name) {
      return function () {
        return models[name];
      };
    }(modelName));
  };

  return models;
};