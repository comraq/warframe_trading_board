var mongoose = require("mongoose");

var postCategoryObject = {
  _id: { type: String, required: true },
  parent: {
    type: String,
    ref: "PostCategory"
  },
  ancestors: [{
    type: String,
    ref: "PostCategory"
  }]
};

var schema = new mongoose.Schema(postCategoryObject);
module.exports = mongoose.model("PostCategory", schema, "post-categories");
