var gulp = require("gulp"),
    mocha = require("gulp-mocha"),
    gutil = require("gulp-util"),
    rename = require("gulp-rename"),
    browserify = require("browserify"),
    source = require("vinyl-source-stream");

var ALL_JS_SRC_FILES = ["./**/*.js", "!./gulpfile.js", "!./test/*.js"],
    testSuite = "sanity";

gulp.task("browserify_app", function() {
  return browserify("./public/ng/app.js")
    .bundle()
    .on("error", function(err) {
      gutil.log(err);
      this.emit("end");
    })
    .pipe(source("bundle.js"))
    .pipe(rename("app.js"))
    .pipe(gulp.dest("./public/bin"));
});

gulp.task("watch_app", function() {
  return gulp.watch(["./public/**/*.js"], ["browserify_app"]);
});

gulp.task("tests", function() {
  var error = false;
  return gulp
    .src("./test/*.js") 
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

gulp.task("default", function() {
  console.log(JSON.stringify(gulp, null, 2));

  return gulp.watch(ALL_JS_SRC_FILES, ["tests"]);
});

gulp.task("sanity", function() {
  testSuite = "sanity";
  return gulp.watch(ALL_JS_SRC_FILES, ["tests"]);
});
