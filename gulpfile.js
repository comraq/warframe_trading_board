var gulp = require("gulp"),
    mocha = require("gulp-mocha"),
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

gulp.task("tests", function() {
  var error = false,
      testSuite = process.argv[3] || "sanity";

  gulp.src("./test/*.js") 
      .pipe(mocha({ grep: testSuite }))
      .on("error", function(err) {
        gutil.log(err);
        console.log("Tests in " + testSuite + " failed!");
        error = true;
      })
      .on("end", function() {
        if (!error)
          console.log("Tests in " + testSuite + " passed!");
      });
});

gulp.task("watch_test", function() {
  gulp.watch(["./**/*.js"], ["tests"]);
});
