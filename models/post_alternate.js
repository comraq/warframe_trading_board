var CategoryModel = require("./category"),
    ItemModel = require("./item"),
    mongoose = require("mongoose");

var postObject = {
  user: { type: String, required: true },
  category: CategoryModel.schema,
  items: [ItemModel.schema]
};

var schema = new mongoose.Schema(postObject);
module.exports = mongoose.model("Post", schema, "posts");
