module.exports = function(wagner) {
  // Client JS Paths
  wagner.constant("BIN_PATH", "./client/bin");
  wagner.constant("JS_SRC", "./client/ng/app.js");
  wagner.constant("JS_SRC_GLOB", [
                    "./client/ng/**/*.js"
                  ]);
  wagner.constant("JS_DEST", "scripts.min.js");
  
  wagner.constant("JS_VEND_SRC", "./client/vendors/scripts.js");
  wagner.constant("JS_VEND_DEST", "vendors.min.js");

  // Client CSS Paths
  wagner.constant("CSS_SRC_GLOB", [
                    "./client/assets/css/*.css",
                    "./client/ng/**/*.css"
                  ]);
  wagner.constant("CSS_DEST", "styles.min.css");
  
  wagner.constant("CSS_VEND_SRC_GLOB", [
                    // Bootstrap
                    "./node_modules/bootstrap/dist/**/*.css",
                    // Other Angular Libraries
                    "./client/vendors/**/*.css"
                  ]);
  wagner.constant("CSS_VEND_DEST", "vendors.min.css");

  // Client HTML Paths
  wagner.constant("HTML_SRC_GLOB", "./client/**/*.html");

  // Server JS Paths
  wagner.constant("SERV_BASE_PATH", "./server-transpiled");
  wagner.constant("SERV_JS_SRC_GLOB", [
                    "./server/**/*.js",
                    "!./server-transpiled/**/*.js"
                  ]);

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
