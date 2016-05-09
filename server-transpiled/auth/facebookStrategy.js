"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passportFacebook = require("passport-facebook");

exports.default = function (User, Config, app, passport) {
  var strategy = new _passportFacebook.Strategy({
    clientID: Config.facebookAuth.clientId,
    clientSecret: Config.facebookAuth.clientSecret,
    callbackURL: Config.server.authority + Config.facebookAuth.callbackUrl,
    // Necessary for new version of Facebook graph API
    profileFields: ["id", "name"]
  }, function (accessToken, refreshToken, profile, done) {
    var name = void 0;
    if ((!profile.name.givenName || !profile.name.givenName.length) && (!profile.name.familyName || !profile.name.familyName.length)) return done("No name associated with this account!");else if (!profile.name.givenName || !profile.name.givenName.length) name = profile.name.familyName;else if (!profile.name.familyName || !profile.name.familyName.length) name = profile.name.givenName;else name = profile.name.givenName + " " + profile.name.familyName;

    if (process.env.npm_package_config_debug == "true") {
      console.log("\nfacebook profile:");
      console.log(profile);
      console.log("\n");
    }

    User.findOneAndUpdate({ "data.oauth": profile.id }, {
      $set: {
        "profile.name": name,
        "profile.picture": "http://graph.facebook.com/" + profile.id.toString() + "/picture?type=large"
      }
    }, { "new": true, upsert: true, runValidators: true }, function (error, user) {
      return done(error, user);
    });
  });

  // Express routes for auth
  app.get(Config.facebookAuth.url, passport.authenticate("facebook"));

  app.get(Config.facebookAuth.callbackUrl, passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/auth/fail"
  }));

  return strategy;
};