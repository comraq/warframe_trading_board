var express = require("express"),
    api = express.Router();

module.exports = function itemApi(wagner) {
  var Item = wagner.get("Item"),
      ItemCategory = wagner.get("ItemCategory");

  api.post("/new", function(req, res) {
    if (process.env.npm_package_config_debug == "true") {
      console.log("posting newItem:");
      console.log(JSON.stringify(req.body, null, 2));
    }

    var item = new Item(req.body);
    item.save(function(err, result) {
      if (err) {
        console.log("mongoose error:");
        console.log(err);
      }

      if (process.env.npm_package_config_debug == "true") {
        console.log("\nmongoose result:");
        console.log(JSON.stringify(result, null, 2));
      }
    });

    res.end();
  });

  api.get("/category", function(req, res) {
    res.json(wagner.get("ItemCategory").hierarchy);
  });

  return api;
};