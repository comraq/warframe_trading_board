module.exports = function(gulp, getTask) {
  gulp.task("watch-css", getTask("watch-css"));
  gulp.task("watchify-js", getTask("watchify-js"));
  gulp.task("minify-css", getTask("minify-css"));
  gulp.task("minify-vendor-css", getTask("minify-vendor-css"));
};
