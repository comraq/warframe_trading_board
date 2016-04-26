module.exports = function(gulp, plugins, BIN_PATH, production) {
  return function() {
    var colour = (production)?
                   plugins.util.colors.bgGreen
                 :
                   plugins.util.colors.bgYellow;
  
    plugins.util.log("Production", colour(production));
    gulp.watch([
                 "./public/**/*.js",
                 "!" + BIN_PATH + "/**/*.js",
                 "!./public/lib/**/*.js"
               ],
               [ "minify-js" ]);
    gulp.watch([
                 "./public/**/*.css",
                 "!" + BIN_PATH + "/**/*.css",
                 "!./public/lib/**/*.css"
               ],
               [ "minify-css" ]);
  };
};

