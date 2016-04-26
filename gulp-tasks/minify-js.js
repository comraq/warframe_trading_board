var browserify = require("browserify"),
    buffer = require("vinyl-buffer"),
    source = require("vinyl-source-stream");

module.exports = function(gulp, plugins, BIN_PATH, production) {
  return function() {
    return browserify("./public/ng/app.js")
      .bundle()
      .on("error", function(err) {
        plugins.util.log(err);
        this.emit("end");
      })
      .pipe(source("bundle.js"))
      .pipe(buffer())
      .pipe(plugins.rename("scripts.min.js"))
      .pipe((!production)?
              plugins.sourcemaps.init() : plugins.util.noop())
        .pipe(plugins.uglify())
      .pipe((!production)?
              plugins.sourcemaps.write("./scripts") : plugins.util.noop())
      .pipe(gulp.dest(BIN_PATH));
  };
};
