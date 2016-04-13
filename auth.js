function setupAuth(User, app, Config) {

  var passport = require("passport");
  var FacebookStrategy = require("passport-facebook").Strategy;

  // High level serialize/de-serialize configuration for passport
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.
      findOne({ _id : id }).
      exec(done);
  });

  // Facebook-specific
  passport.use(new FacebookStrategy(
    {
      clientID: Config.facebookAuth.clientId,
      clientSecret: Config.facebookAuth.clientSecret,
      callbackURL: Config.server.host + Config.facebookAuth.callbackUrl,
      // Necessary for new version of Facebook graph API
      profileFields: ["id", "emails", "name"]
    },
    function(accessToken, refreshToken, profile, done) {
      if (!profile.emails || !profile.emails.length) {
        return done("No emails associated with this account!");
      }

      User.findOneAndUpdate(
        { "data.oauth": profile.id },
        {
          $set: {
            "name.first": profile.name.givenName,
            "name.last": profile.name.familyName,
            "profile.email": profile.emails[0].value,
            "profile.picture": "http://graph.facebook.com/" +
              profile.id.toString() + "/picture?type=large"
          }
        },
        { "new": true, upsert: true, runValidators: true },
        function(error, user) {
          done(error, user);
        });
    }));

  // Express middlewares
  app.use(require("express-session")({
    secret: "this is a secret",
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // Express routes for auth
  app.get(Config.facebookAuth.url,
    passport.authenticate("facebook", { scope: ["email"] }));

  app.get(Config.facebookAuth.callbackUrl,
    passport.authenticate("facebook", {
      successRedirect: "/",
      failureRedirect: "/auth/fail"
    }));
}

module.exports = setupAuth;
