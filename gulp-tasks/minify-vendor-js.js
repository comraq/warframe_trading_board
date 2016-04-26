var browserify = require("browserify"),
    buffer = require("vinyl-buffer"),
    source = require("vinyl-source-stream"),
    fs = require("fs");

module.exports = function(gulp, plugins, BIN_PATH) {
  return function() {
    var srcPath = "./public/lib/vendors.js",
        outfileName = "vendors.min.js";
  
    return browserify(srcPath)
      .bundle()
      .on("error", function(err) {
        plugins.util.log(err);
        this.emit("end");
      })
      .pipe(source("bundle.js"))
      .pipe(buffer())
      .pipe(plugins.tap(function(file, t) {
        // Manually tack on the .stat property for
        // the dynamically created vinyl file
        file.stat = fs.statSync(srcPath);
       }))
      .pipe(plugins.newer(BIN_PATH + "/" + outfileName))
      .pipe(plugins.uglify())
      .pipe(plugins.rename(outfileName))
      .pipe(gulp.dest(BIN_PATH));
  };
};
