import passport from "passport";
import facebookStrategy from "./facebookStrategy";
import steamStrategy from "./steamStrategy";

export default wagner => {
  wagner.invoke(require("./passportConfig"), { passport: passport });

  passport.use(wagner.invoke(facebookStrategy, {
                 passport: passport
               }));
  passport.use(wagner.invoke(steamStrategy, {
                 passport: passport
               }));
};
