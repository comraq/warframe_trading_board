import express from "express";
import httpStatus from "http-status";

export default (Item, ItemCategory) => {
  const api = express.Router();

  api.post("/new", (req, res) => {
    // TODO: Need to add proper/meaningful api response for this route
    if (process.env.npm_package_config_debug == "true") {
      console.log("itemApi: newItem");
      console.log(JSON.stringify(req.body, null, 2));
    }

    let item = new Item(req.body);
    item.save().then(result => {
      if (process.env.npm_package_config_debug == "true") {
        console.log("\nsuccess!");
        console.log(JSON.stringify(result, null, 2));
      }
      res.end();

    }, err => {
      console.log("\nerror!");
      console.log(err);

      res.status(httpStatus.BAD_REQUEST).end();
    });
  });

  return api;
};
