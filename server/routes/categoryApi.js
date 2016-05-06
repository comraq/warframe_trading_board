var express = require("express"),
    httpStatus = require("http-status"),
    api = express.Router();

module.exports = function categoryApi(ItemCategory) {
  /*
   * For debugging, this ensures that the hierarchy array exported in
   * models/itemCategory.js are present in the db by dropping all
   * documents and re-insert all
   */
  api.get("/ensure_categories", function ensureCategories(req, res) {
    ItemCategory.remove({}, function(results) {
      if (process.env.npm_package_config_debug == "true") {
        console.log("ensure_categories dropped all documents!");
        console.log(JSON.stringify(results, null, 2));
      }
      
      ItemCategory.insertMany(ItemCategory.hierarchy)
        .then(function success(results) {
          if (process.env.npm_package_config_debug == "true") {
            console.log("category/ensure_categories success!");
            console.log(JSON.stringify(results, null, 2));
          }
          res.json(results);
  
        }, function error(results) {
          console.log("category/ensure_categories error!");
          console.log(JSON.stringify(results, null, 2));
  
          res.status(httpStatus.INTERNAL_SERVER_ERROR).json(null);
        });
    });
  });

  // Returns an array children of categories defined by the url path
  api.get("/children/*", function getChildren(req, res) {
    var ancestors = req.params[0].replace(/(^\/|\/$)/g, "").split("/");
    var parent = ancestors.slice(-1);

    ItemCategory.find({
      parent: parent, 
      ancestors: { $all: ancestors }
    }, {
      _id: 0,
      name: 1,
    }).exec().then(function success(results) {
      if (process.env.npm_package_config_debug == "true") {
        console.log("categoryApi: getChildren success!");
        console.log(JSON.stringify(results, null, 2));
      }
      res.json({ children: results });

    }, function error(results) {
      console.log("categoryApi: getChildren error!");
      console.log(JSON.stringify(results, null, 2));

      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(null);
    });

  });

  // Returns the category object defined by the url path
  api.get("*", function getCategory(req, res) {
    var ancestors = req.params[0].replace(/(^\/|\/$)/g, "").split("/");
    var current = ancestors.pop()

    ItemCategory.findOne({
      name: current, 
      ancestors: { $all: ancestors }
    }, {
      _id: 0,
      name: 1,
      parent: 1,
      ancestors: 1
    }).exec().then(function success(results) {
      if (process.env.npm_package_config_debug == "true") {
        console.log("categoryApi: getCategory success!");
        console.log(JSON.stringify(results, null, 2));
      }
      res.json({ category: results });

    }, function error(results) {
      console.log("categoryApi: getCategory error!");
      console.log(JSON.stringify(results, null, 2));

      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(null);
    });

  });

  return api;
};
