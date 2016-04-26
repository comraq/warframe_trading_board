var bodyparser = require("body-parser"),
    httpStatus = require("http-status"),
    express = require("express");

module.exports = function(wagner) {
  var api = express.Router();

  // CORS Support
  api.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    next();
  });

  api.use(bodyparser.json());

  api.get("/me", function(req, res) {
    if (!req.user) {
      return res.status(httpStatus.UNAUTHORIZED)
                .json({ error: "Not logged in" });
    }

    res.json({ user: req.user });
  });

  api.get("/logOut", function(req, res) {
    req.logout();
    res.json({ user: null });

    // An alternative logout method if the above fails
/*
    req.session.destroy(function(err) {
      res.json({ user: null });
    })
*/
  });

  api.use("/item", wagner.invoke(require("./itemApi")));
  return api;
};
