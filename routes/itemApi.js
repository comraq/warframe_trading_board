var express = require("express"),
    httpStatus = require("http-status"),
    api = express.Router();

module.exports = function itemApi(Item, ItemCategory) {
  api.post("/new", function newItem(req, res) {
    // TODO: Need to add proper/meaningful api response for this route
    if (process.env.npm_package_config_debug == "true") {
      console.log("itemApi: newItem");
      console.log(JSON.stringify(req.body, null, 2));
    }

    var item = new Item(req.body);
    item.save().then(function success(result) {
      if (process.env.npm_package_config_debug == "true") {
        console.log("\nsuccess!");
        console.log(JSON.stringify(result, null, 2));
      }
      res.end();

    }, function error(err) {
      console.log("\nerror!");
      console.log(err);

      res.status(httpStatus.BAD_REQUEST).end();
    });
  });

  return api;
};
