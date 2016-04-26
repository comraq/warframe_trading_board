var mongoose = require("mongoose"),
    ItemCategoryModel = require("./itemCategory"),
    ItemModel = require("./item"),
    UserModel = require("./user");

module.exports = function modelsIndex(wagner) {
  wagner.invoke(function(Config) {
    var dbConfig = Config.warframeDB;
    var hostname = dbConfig.hostname || "localhost",
        port = dbConfig.port || 27017,
        user = dbConfig.user || undefined,
        password = dbConfig.password || undefined,
        dbName = dbConfig.dbName || "testDB";

    var userInfo = (user)? (user + ":" + password + "@") : "";
    var uri = "mongodb://" + userInfo
              + hostname + ":" + port + "/" + dbName;

    mongoose.connect(uri, function(err) {
      if (err)
        throw new Error(err);
    });
  })

  wagner.factory('db', function(Config) {
    return mongoose;
  });

/*
 * TODO: Define mongoose schema models in separate .js files and
 *       require them as necessary inside models
 *
 *       Then, loop through each one and add them to wagner as a service
 */
  var models = {
    ItemCategory: ItemCategoryModel,
    Item: ItemModel,
    User: UserModel
  };

  // DRY, register factories/servies in a loop
  for (var modelName in models) {
    // Wagner Factory calls the functions asynchronously,
    // must use IIFE and closures to retain reference to the correct
    // modelName through each iteration of the loop
    wagner.factory(modelName, (function(name) {
      return function() {
        return models[name];
      };
    })(modelName));
  };

  return models;
};
