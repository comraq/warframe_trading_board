module.exports = function(gulp, plugins, TESTS_SRC_JS) {
  return function() {
    return gulp.watch(TESTS_SRC_JS, [ "tests" ]);
  };
};
