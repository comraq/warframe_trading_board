var gulp = require("gulp"),
    gutil = require("gulp-util"),
    rename = require("gulp-rename"),
    browserify = require("browserify"),
    source = require("vinyl-source-stream");

gulp.task("browserify_app", function() {
  return browserify("./public/ng/app.js")
    .bundle()
    .on("error", function(err) {
      gutil.log(err);
    })
    .pipe(source("bundle.js"))
    .pipe(rename("app.js"))
    .pipe(gulp.dest("./public/bin"));
});

gulp.task("watch_app", function() {
  gulp.watch(["./public/**/*.js"], ["browserify_app"]);
});
