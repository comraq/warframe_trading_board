var PostCategoryModel = require("./postCategory"),
    ItemModel = require("./item"),
    mongoose = require("mongoose");

var postObject = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  category: PostCategoryModel.schema,
  items: [ItemModel.schema]
};

var schema = new mongoose.Schema(postObject);
module.exports = mongoose.model("Post", schema, "posts");
