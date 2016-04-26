var passport = require("passport");

module.exports = function authIndex(wagner) {
  wagner.invoke(require("./passportConfig"), { passport: passport });

  passport.use(wagner.invoke(require("./facebookStrategy"), {
                 passport: passport
               }));
  passport.use(wagner.invoke(require("./steamStrategy"), {
                 passport: passport
               }));
};
