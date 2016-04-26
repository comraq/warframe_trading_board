module.exports = function(gulp, plugins, BIN_PATH, production) {
  return function() {
    return gulp.src([
                      "./public/**/*.css",
                      "!" + BIN_PATH + "**/*.css",
                      "!./public/lib/**/*.css"
                    ])
      .pipe((!production)?
             plugins.sourcemaps.init() : plugins.util.noop())
        .pipe(plugins.cleanCSS())
        .pipe(plugins.concat("styles.min.css"))
      .pipe((!production)?
             plugins.sourcemaps.write() : plugins.util.noop())
      .pipe(gulp.dest(BIN_PATH));
  };
};
