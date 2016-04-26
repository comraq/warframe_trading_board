module.exports = function(gulp, plugins, ALL_SRC_JS) {
  return function() {
    return gulp.watch(ALL_SRC_JS, [ "tests" ]);
  };
};
