var gulp = require("gulp"),
    mocha = require("gulp-mocha"),
    util = require("gulp-util"),
    newer = require("gulp-newer"),
    rename = require("gulp-rename"),
    browserify = require("browserify"),
    uglify = require("gulp-uglify"),
    cleanCSS = require("gulp-clean-css"),
    concat = require("gulp-concat"),
    sourcemaps = require("gulp-sourcemaps"),
    tap = require("gulp-tap"),
    buffer = require("vinyl-buffer"),
    source = require("vinyl-source-stream"),
    fs = require("fs");

var BIN_PATH = "./public/bin",
    production = util.env.production || false;

gulp.task("browserify_js", function() {
  return browserify("./public/ng/app.js")
    .bundle()
    .on("error", function(err) {
      util.log(err);
      this.emit("end");
    })
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(rename("scripts.min.js"))
    .pipe((!production)? sourcemaps.init() : util.noop())
      .pipe(uglify())
    .pipe((!production)? sourcemaps.write("./scripts") : util.noop())
    .pipe(gulp.dest(BIN_PATH));
});

gulp.task("concat_css", function() {
  return gulp.src([
                    "./public/**/*.css",
                    "!" + BIN_PATH + "**/*.css",
                    "!./public/lib/**/*.css"
                  ])
    .pipe((!production)? sourcemaps.init() : util.noop())
      .pipe(cleanCSS())
      .pipe(concat("styles.min.css"))
    .pipe((!production)? sourcemaps.write() : util.noop())
    .pipe(gulp.dest(BIN_PATH));
});

gulp.task("watch_app", function() {
  var colour = (production)? util.colors.bgGreen : util.colors.bgYellow;

  util.log("Production", colour(production));
  gulp.watch([
               "./public/**/*.js",
               "!" + BIN_PATH + "/**/*.js",
               "!./public/lib/**/*.js"
             ],
             [ "browserify_js" ]);
  gulp.watch([
               "./public/**/*.css",
               "!" + BIN_PATH + "/**/*.css",
               "!./public/lib/**/*.css"
             ],
             [ "concat_css" ]);
});

gulp.task("concat_vendor_stylesheets", function() {
  var srcPaths = [
                   "./node_modules/bootstrap/dist/**/*.css",
                   "./public/lib/**/*.css"
                 ],
      outfileName = "vendors.min.css";

  return gulp.src(srcPaths)
    .pipe(newer(BIN_PATH + "/" + outfileName))
    .pipe(cleanCSS())
    .pipe(concat(outfileName))
    .pipe(gulp.dest(BIN_PATH));
});

gulp.task("browserify_vendor_scripts", function() {
  var srcPath = "./public/lib/vendors.js",
      outfileName = "vendors.min.js";

  return browserify(srcPath)
    .bundle()
    .on("error", function(err) {
      util.log(err);
      this.emit("end");
    })
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(tap(function(file, t) {
      // Manually tack on the .stat property for
      // the dynamically created vinyl file
      file.stat = fs.statSync(srcPath);
     }))
    .pipe(newer(BIN_PATH + "/" + outfileName))
    .pipe(uglify())
    .pipe(rename(outfileName))
    .pipe(gulp.dest(BIN_PATH));
});

// Gulp tasks for tests
var ALL_JS_SRC_FILES = [
                         "./**/*.js",
                         "!./gulpfile.js",
                         "!./test/**/*.js"
                       ],
    testSuite = "sanity";

gulp.task("tests", function() {
  var error = false;
  return gulp
    .src("./test/*.js") 
    .pipe(mocha({ grep: testSuite }))
    .on("error", function(err) {
      util.log(err);
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
