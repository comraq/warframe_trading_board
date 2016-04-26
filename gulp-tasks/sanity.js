module.exports = function(gulp, plugins, ALL_SRC_JS) {
  return function() {
    gulp.watch(ALL_SRC_JS, [ "tests" ]);
  };
};

