var mongoose = require('mongoose');

module.exports = function(wagner) {
  wagner.factory('db', function(Config) {
    var dbConfig = Config.warframeDB;
    var hostname = dbConfig.hostname || "localhost",
        port = dbConfig.port || 27017,
        user = dbConfig.user || undefined,
        password = dbConfig.password || undefined,
        dbName = dbConfig.dbName || "testDB";

    var userInfo = (user)? (user + ":" + password + "@") : "";
    var uri = "mongodb://" + userInfo
              + hostname + ":" + port + "/" + dbName;

    mongoose.connect(uri);

    var models = {};
    return models;
  });

/*
  var Category =
    mongoose.model('Category', require('./category'), 'categories');
  var User =
    mongoose.model('User', require('./user'), 'users');

  var models = {
    Category: Category,
    User: User
  };

  // To ensure DRY-ness, register factories in a loop
  _.each(models, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });

  wagner.factory('Product', require('./product'));

  return models;
};
*/
