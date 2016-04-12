var mongoose = require("mongoose"),
    CategoryModel = require("./category"),
    PostModel = require("./post_alternate"),
    UserModel = require("./user");

module.exports = function(wagner) {
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
    Category: CategoryModel,
    Post: PostModel,
    User: UserModel
  };

  // DRY, register factories/servies in a loop
  for (var modelName in models) {
    wagner.factory(modelName, function() {
      return models[modelName];
    });
  };

  return models;
};