module.exports = function(wagner) {
  // Build Paths
  wagner.constant("BIN_PATH", "./public/bin");
  wagner.constant("JS_SRC", "./public/ng/app.js");
  wagner.constant("JS_SRC_GLOB", [
                    "./public/ng/**/*.js"
                  ]);
  wagner.constant("JS_DEST", "scripts.min.js");
  
  wagner.constant("CSS_SRC_GLOB", [
                    "./public/assets/css/*.css",
                    "./public/ng/**/*.css"
                  ]);
  wagner.constant("CSS_DEST", "styles.min.css");
  
  wagner.constant("CSS_VEND_SRC_GLOB", [
                    // Bootstrap
                    "./node_modules/bootstrap/dist/**/*.css",
                    // Other Angular Libraries
                    "./public/lib/**/*.css"
                  ]);
  wagner.constant("CSS_VEND_DEST", "vendors.min.css");

  // Test Paths
  wagner.constant("TESTS_PATH", "./test/*.js");
  wagner.constant("TESTS_SRC_JS", [
    "./**/*.js",
    "!./node_modules/**/*.js",
    "!./gulpfile.js",
    "!./gulp/**/*.js",
    "!./test/**/*.js"
  ]);
};
