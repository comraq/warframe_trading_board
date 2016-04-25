var passport = require("passport");

module.exports = function setupAuth(wagner) {
  wagner.factory("passport", function() {
    return passport;
  });

  // High level serialize/de-serialize configuration for passport
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  wagner.invoke(function(User) {
    passport.deserializeUser(function(id, done) {
      User.
        findOne({ _id : id }).
        exec(done);
    });
  });

  wagner.invoke(function(app, Config) {
    // Express middlewares
    app.use(require("express-session")({
      secret: "this is a secret",
      resave: true,
      saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
  });

  passport.use(require("./facebookStrategy")(wagner));
  passport.use(require("./steamStrategy")(wagner));
}
