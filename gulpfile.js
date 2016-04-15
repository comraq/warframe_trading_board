var gulp = require("gulp"),
    mocha = require("gulp-mocha"),
    gutil = require("gulp-util"),
    rename = require("gulp-rename"),
    browserify = require("browserify"),
    uglify = require("gulp-uglify"),
    cleanCSS = require("gulp-clean-css"),
    concat = require("gulp-concat"),
    buffer = require("vinyl-buffer"),
    source = require("vinyl-source-stream");

var ALL_JS_SRC_FILES = [
                         "./**/*.js",
                         "!./gulpfile.js",
                         "!./test/**/*.js"
                       ],
    testSuite = "sanity";

gulp.task("browserify_js", function() {
  return browserify("./public/ng/app.js")
    .bundle()
    .on("error", function(err) {
      gutil.log(err);
      this.emit("end");
    })
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename("scripts.min.js"))
    .pipe(gulp.dest("./public/bin"));
});

gulp.task("concat_css", function() {
  return gulp.src([
                    "./public/**/*.css",
                    "!./public/bin/**/*.css",
                    "!./public/lib/**/*.css"
                  ])
    .pipe(cleanCSS())
    .pipe(concat("styles.min.css"))
    .pipe(gulp.dest("./public/bin"));
});

gulp.task("watch_app", function() {
  gulp.watch([
               "./public/**/*.js",
               "!./public/bin/**/*.js",
               "!./public/lib/**/*.js"
             ],
             [ "browserify_js" ]);
  gulp.watch([
               "./public/**/*.css",
               "!./public/bin/**/*.css",
               "!./public/lib/**/*.css"
             ],
             [ "concat_css" ]);
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
  return gulp.watch(ALL_JS_SRC_FILES, [ "tests" ]);
});

gulp.task("sanity", function() {
  testSuite = "sanity";
  return gulp.watch(ALL_JS_SRC_FILES, [ "tests" ]);
});
