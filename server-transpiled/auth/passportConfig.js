"use strict";

module.exports = function passportConfig(Config, User, app, passport) {
  // High level serialize/de-serialize configuration for passport
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findOne({ _id: id }).exec(done);
  });

  // Express middlewares
  app.use(require("express-session")({
    secret: "this is a secret",
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
};