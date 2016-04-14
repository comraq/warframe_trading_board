var SteamStrategy = require("passport-steam").Strategy;

module.exports = function(wagner) {
  var strategy;
  wagner.invoke(function(User, Config, app, passport) {
    strategy = new SteamStrategy({
      returnURL: Config.server.host + Config.steamAuth.callbackUrl,
      realm: Config.server.host,
      apiKey: Config.steamAuth.apiKey
    },
    function(identifier, profile, done) {
      if (!profile.displayName || !profile.displayName.length)
        return done("No name associated with this account!");

      if (process.env.npm_package_config_debug == "true") {
        console.log("\nsteam profile:");
        console.log(profile);
        console.log("\n");
      }

      User.findOneAndUpdate(
        { "data.oauth": profile.id },
        {
          $set: {
            "profile.name": profile.displayName,
            "profile.picture": profile.photos[2].value
          }
        },
        { "new": true, upsert: true, runValidators: true },
        function(error, user) {
          done(error, user);
        });
    });

    // Express routes for auth
    app.get(Config.steamAuth.url,
      passport.authenticate("steam"));
  
    app.get(Config.steamAuth.callbackUrl,
      passport.authenticate("steam", {
        successRedirect: "/",
        failureRedirect: "/auth/fail"
      }));
  });

  return strategy;
};
