var CategoryModel = require("./category"),
    ItemModel = require("./item"),
    mongoose = require("mongoose");

var postObject = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  category: CategoryModel.schema,
  items: [ItemModel.schema]
};

var schema = new mongoose.Schema(postObject);
module.exports = mongoose.model("Post", schema, "posts");
