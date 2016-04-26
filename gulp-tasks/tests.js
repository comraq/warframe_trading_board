module.exports = function(gulp, plugins) {
  // TODO: Hardcode testSuite as "sanity" for now
  var testSuite = "sanity";

  return function() {
    var error = false;
    return gulp
      .src("./test/*.js") 
      .pipe(plugins.mocha({ grep: testSuite }))
      .on("error", function(err) {
        plugins.util.log(err);
        console.log("Tests in " + testSuite + " failed!");
        error = true;
      })
      .on("end", function() {
        if (!error)
          console.log("Tests in " + testSuite + " passed!");
      });
  };
};
