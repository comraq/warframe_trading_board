module.exports = function(wagner) {
  wagner.factory("plugins", function() {
    return require("gulp-load-plugins")({
      rename: { "gulp-clean-css": "cleanCSS" }
    });
  });

  wagner.factory("getTask", function() {
    return getTask;
  });

  // Flags
  wagner.constant("production",
                  require("gulp-util").env.production || false);

  // Get task utility function
  var gulpTasksDir = "./tasks/";
  function getTask(task) {
    return wagner.invoke(require(gulpTasksDir + task));
  }
};
