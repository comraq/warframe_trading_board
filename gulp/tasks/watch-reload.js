var browserSync = require("browser-sync"),
    assert = require("assert");

module.exports = function(gulp, plugins, BIN_PATH) {
  var host = plugins.util.env.host || false,
      port = plugins.util.env.port || false;

  assert(host, "Must specify server host!");
  assert(port, "Must specify server port!");

  return function() {
    var options = {};
    options.proxy = host + ":" + port;
   
    var instance = browserSync.create();
    instance.init(options);

    return gulp.watch(BIN_PATH + "/**/*").on("change", instance.reload);
  };
};
