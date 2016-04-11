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

    /*
     * TODO: Define mongoose schema models in separate .js files and
     *       require them as necessary inside models
     *
     *       Then, loop through each one and add them to wagner as a service
     */
    var models = {};
    return models;
  });
};
