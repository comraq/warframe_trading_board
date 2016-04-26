module.exports = function(gulp, plugins, BIN_PATH) {
  return function() {
    var srcPaths = [
                     "./node_modules/bootstrap/dist/**/*.css",
                     "./public/lib/**/*.css"
                   ],
        outfileName = "vendors.min.css";
  
    return gulp.src(srcPaths)
      .pipe(plugins.newer(BIN_PATH + "/" + outfileName))
      .pipe(plugins.cleanCSS())
      .pipe(plugins.concat(outfileName))
      .pipe(gulp.dest(BIN_PATH));
  };
};
