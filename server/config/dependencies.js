var fs = require("fs");

module.exports = function(wagner, port) {
  wagner.factory("Config", function() {
    var conf = JSON.parse(
                 fs.readFileSync(__dirname + "/config.json")
                   .toString()
               );
    conf.server.port = port;
    conf.server.authority = conf.server.host + ":" + port;
    return conf;
  });
};
