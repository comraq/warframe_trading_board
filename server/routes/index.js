import bodyparser from "body-parser";
import httpStatus from "http-status";
import express from "express";

import setupItemApi from "./itemApi";
import setupCategoryApi from "./categoryApi";

export default wagner => {
  const api = express.Router();

  // CORS Support
  api.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    next();
  });

  api.use(bodyparser.json());

  api.get("/me", (req, res) => {
    if (!req.user) {
      return res.status(httpStatus.UNAUTHORIZED)
                .json({ error: "Not logged in" });
    }

    res.json({ user: req.user });
  });

  api.get("/logOut", (req, res) => {
    req.logout();
    res.json({ user: null });

    // An alternative logout method if the above fails
    // req.session.destroy(err => res.json({ user: null }))
  });

  api.use("/item", wagner.invoke(setupItemApi));
  api.use("/category", wagner.invoke(setupCategoryApi));
  return api;
};
