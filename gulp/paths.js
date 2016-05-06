module.exports = function(wagner) {
  // Build Paths
  wagner.constant("BIN_PATH", "./client/bin");
  wagner.constant("JS_SRC", "./client/ng/app.js");
  wagner.constant("JS_SRC_GLOB", [
                    "./client/ng/**/*.js"
                  ]);
  wagner.constant("JS_DEST", "scripts.min.js");
  
  wagner.constant("CSS_SRC_GLOB", [
                    "./client/assets/css/*.css",
                    "./client/ng/**/*.css"
                  ]);
  wagner.constant("CSS_DEST", "styles.min.css");
  
  wagner.constant("CSS_VEND_SRC_GLOB", [
                    // Bootstrap
                    "./node_modules/bootstrap/dist/**/*.css",
                    // Other Angular Libraries
                    "./client/lib/**/*.css"
                  ]);
  wagner.constant("CSS_VEND_DEST", "vendors.min.css");

  // Server JS Paths
  wagner.constant("SERV_BASE_PATH", "./server");
  wagner.constant("SERV_JS_SRC", "./server/index.js");
  wagner.constant("SERV_JS_SRC_GLOB", [
                    "./server/**/*.js",
                    "!./server/server-transpiled.js"
                  ]);
  wagner.constant("SERV_JS_DEST", "server-transpiled.js");

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
