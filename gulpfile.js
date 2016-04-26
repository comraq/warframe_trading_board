var gulp = require("gulp"),
    wagner = require("wagner-core");

var gulpTasksDir = "./gulp-tasks/";

wagner.factory("gulp", function() {
  return gulp;
});

wagner.factory("plugins", function() {
  return require("gulp-load-plugins")({
    rename: { "gulp-clean-css": "cleanCSS" }
  });
});

wagner.constant("BIN_PATH", "./public/bin");
wagner.constant("production", require("gulp-util").env.production || false);
wagner.constant("ALL_SRC_JS", [
  "./**/*.js",
  "!./gulpfile.js",
  "!./gulp-tasks/**/*.js",
  "!./test/**/*.js"
]);

gulp.task("watch", getTask("watch"));
gulp.task("minify-vendor-js", getTask("minify-vendor-js"));
gulp.task("minify-vendor-css", getTask("minify-vendor-css"));
gulp.task("minify-js", getTask("minify-js"));
gulp.task("minify-css", getTask("minify-css"));

gulp.task("default", getTask("default"));
gulp.task("tests", getTask("tests"));
gulp.task("sanity", getTask("sanity"));

function getTask(task) {
  return wagner.invoke(require(gulpTasksDir + task));
}
